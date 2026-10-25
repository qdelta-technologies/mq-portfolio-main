import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/utils/contactInquiry.ts', import.meta.url), 'utf8');
const javascript = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText;
const { EMPTY_INQUIRY, validateInquiry, prepareInquiry } = await import(
  `data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`
);

const valid = {
  ...EMPTY_INQUIRY,
  name: 'Avery Example',
  email: 'avery+portfolio@example.com',
  message: 'I need a responsive website with a project gallery and a clear contact page.',
};
const prepare = values => prepareInquiry(values, 'qais@qdelta.in', 'https://wa.me/917815895689');

test('an empty inquiry identifies every required field', () => {
  assert.deepEqual(Object.keys(validateInquiry(EMPTY_INQUIRY)).sort(), ['email', 'message', 'name']);
});

test('only name, email and query are needed', () => {
  assert.deepEqual(Object.keys(EMPTY_INQUIRY).sort(), ['email', 'message', 'name']);
  assert.deepEqual(validateInquiry(valid), {});
});

test('invalid emails are rejected', () => {
  for (const email of ['not-an-email', 'a@', 'a b@example.com', '@example.com']) {
    assert.ok(validateInquiry({ ...valid, email }).email);
  }
});

test('empty or whitespace-only names and briefs are rejected', () => {
  const errors = validateInquiry({ ...valid, name: '  ', message: '\n  ' });
  assert.ok(errors.name);
  assert.ok(errors.message);
});

test('queries accept short questions and enforce the 2000 character limit', () => {
  assert.equal(validateInquiry({ ...valid, message: 'Are you available?' }).message, undefined);
  assert.equal(validateInquiry({ ...valid, message: 'x' }).message, undefined);
  assert.equal(validateInquiry({ ...valid, message: 'x'.repeat(2000) }).message, undefined);
  assert.ok(validateInquiry({ ...valid, message: 'x'.repeat(2001) }).message);
});

test('oversized personal fields are rejected', () => {
  const errors = validateInquiry({ ...valid, name: 'x'.repeat(101), email: `${'x'.repeat(250)}@example.com` });
  assert.ok(errors.name);
  assert.ok(errors.email);
});

test('contact drafts include only the essential details', () => {
  const inquiry = prepare(valid);
  const whatsapp = new URL(inquiry.whatsappUrl);
  const email = new URL(inquiry.emailUrl);
  assert.equal(whatsapp.origin, 'https://wa.me');
  assert.equal(whatsapp.pathname, '/917815895689');
  assert.equal(whatsapp.searchParams.get('text'), inquiry.message);
  assert.equal(email.pathname, 'qais@qdelta.in');
  assert.equal(email.searchParams.get('body'), inquiry.message);
  assert.ok(inquiry.message.includes(`Name: ${valid.name}`));
  assert.ok(inquiry.message.includes(`Email: ${valid.email}`));
  assert.ok(inquiry.message.includes(`Query:\n${valid.message}`));
  assert.ok(!/Business|Timeline|Project:/.test(inquiry.message));
});

test('Unicode, plus signs, ampersands and line breaks survive URL encoding', () => {
  const message = 'A café website & portfolio.\nA second line with symbols + and an idea 💡.';
  const inquiry = prepare({ ...valid, message });
  assert.ok(new URL(inquiry.whatsappUrl).searchParams.get('text').includes(message));
  assert.ok(new URL(inquiry.emailUrl).searchParams.get('body').includes(valid.email));
});

test('user text cannot add mail headers or URL parameters', () => {
  const inquiry = prepare({ ...valid, name: 'Avery\r\n&bcc=other@example.com' });
  const mail = new URL(inquiry.emailUrl);
  assert.deepEqual(Array.from(mail.searchParams.keys()), ['subject', 'body']);
  assert.ok(!/[\r\n]/.test(mail.searchParams.get('subject')));
  assert.equal(new URL(inquiry.whatsappUrl).searchParams.get('text'), inquiry.message);
});
