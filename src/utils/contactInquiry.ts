export interface InquiryValues {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
}

export type InquiryField = keyof InquiryValues;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const EMPTY_INQUIRY: InquiryValues = { name: '', email: '', whatsapp: '', message: '' };

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length > 100) errors.name = 'Please keep your name under 100 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254) errors.email = 'Enter a valid email address, such as name@example.com.';
  const phone = values.whatsapp.trim();
  const digitCount = phone.replace(/\D/g, '').length;
  if (!phone) errors.whatsapp = 'Please enter your WhatsApp number.';
  else if (!/^\+?[\d\s().-]+$/.test(phone) || digitCount < 7 || digitCount > 15 || phone.length > 32) {
    errors.whatsapp = 'Enter a valid WhatsApp number with 7–15 digits, including your country code.';
  }
  if (!values.message.trim()) errors.message = 'Please enter your query.';
  else if (values.message.length > 2000) errors.message = 'Please keep your message under 2,000 characters.';
  return errors;
}

const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

/** Submit directly to FormSubmit; a successful response confirms acceptance, not delivery. */
export async function submitInquiry(values: InquiryValues, fetcher: typeof fetch = fetch): Promise<void> {
  if (Object.keys(validateInquiry(values)).length) throw new Error('Invalid inquiry.');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetcher('https://formsubmit.co/ajax/qais@qdelta.in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        name: singleLine(values.name),
        email: singleLine(values.email),
        whatsapp: singleLine(values.whatsapp),
        message: values.message.trim(),
        _subject: 'New portfolio contact inquiry',
        _template: 'table',
      }),
    });
    if (!response.ok) throw new Error('Submission rejected.');
    const result: unknown = await response.json();
    if (!result || typeof result !== 'object' || !('success' in result)
      || (result.success !== true && result.success !== 'true')) {
      throw new Error('Submission was not confirmed.');
    }
  } finally {
    clearTimeout(timeout);
  }
}

/** Prepare links only. No messages are submitted or stored by this website. */
export function prepareInquiry(values: InquiryValues, email: string, whatsapp: string) {
  const message = [
    'Hi Qais,',
    '',
    `Name: ${singleLine(values.name)}`,
    `Email: ${singleLine(values.email)}`,
    `WhatsApp: ${singleLine(values.whatsapp)}`,
    '',
    'Query:',
    values.message.trim(),
  ].join('\n');
  const whatsappUrl = new URL(whatsapp);
  whatsappUrl.searchParams.set('text', message);
  return {
    message,
    whatsappUrl: whatsappUrl.href,
    emailUrl: `mailto:${email}?subject=${encodeURIComponent(`Portfolio inquiry — ${singleLine(values.name)}`)}&body=${encodeURIComponent(message)}`,
  };
}
