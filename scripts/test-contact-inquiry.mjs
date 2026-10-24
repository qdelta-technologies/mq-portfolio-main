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
  service: 'Website',
  message: 'I need a responsive website with a project gallery and a clear contact page.',
};
const prepare = values => prepareInquiry(values, 'qais@qdelta.in', 'https://wa.me/917815895689');

test('an empty inquiry identifies every required field', () => {
  assert.deepEqual(Object.keys(validateInquiry(EMPTY_INQUIRY)).sort(), ['email', 'message', 'name', 'service']);
});

test('a complete inquiry does not require optional company or timeline', () => {
  assert.deepEqual(validateInquiry(valid), {});
});

test('invalid emails, project types and timeline values are rejected', () => {
  const errors = validateInquiry({ ...valid, email: 'not-an-email', service: 'Unsupported service', timeline: 'Invalid value' });
  assert.ok(errors.email);
  assert.ok(errors.service);
  assert.ok(errors.timeline);
});

test('empty or whitespace-only names and briefs are rejected', () => {
  const errors = validateInquiry({ ...valid, name: '  ', message: '\n  ' });
  assert.ok(errors.name);
  assert.ok(errors.message);
});

test('briefs accept the stated 20–2000 character range', () => {
  assert.ok(validateInquiry({ ...valid, message: 'x'.repeat(19) }).message);
  assert.equal(validateInquiry({ ...valid, message: 'x'.repeat(20) }).message, undefined);
  assert.equal(validateInquiry({ ...valid, message: 'x'.repeat(2000) }).message, undefined);
  assert.ok(validateInquiry({ ...valid, message: 'x'.repeat(2001) }).message);
});

test('oversized optional and personal fields are rejected', () => {
  const errors = validateInquiry({ ...valid, name: 'x'.repeat(101), email: `${'x'.repeat(250)}@example.com`, business: 'x'.repeat(121) });
  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.business);
});

test('WhatsApp and email receive the exact same reviewed brief', () => {
  const inquiry = prepare({ ...valid, business: 'Orbit & Co.', timeline: 'Within a month' });
  const whatsapp = new URL(inquiry.whatsappUrl);
  const email = new URL(inquiry.emailUrl);
  assert.equal(whatsapp.origin, 'https://wa.me');
  assert.equal(whatsapp.pathname, '/917815895689');
  assert.equal(whatsapp.searchParams.get('text'), inquiry.message);
  assert.equal(email.pathname, 'qais@qdelta.in');
  assert.equal(email.searchParams.get('body'), inquiry.message);
  assert.ok(inquiry.message.includes('Business / brand: Orbit & Co.'));
  assert.ok(inquiry.message.includes('Timeline: Within a month'));
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
