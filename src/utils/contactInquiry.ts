export interface InquiryValues {
  name: string;
  email: string;
  message: string;
}

export type InquiryField = keyof InquiryValues;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const EMPTY_INQUIRY: InquiryValues = { name: '', email: '', message: '' };

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length > 100) errors.name = 'Please keep your name under 100 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254) errors.email = 'Enter a valid email address, such as name@example.com.';
  if (!values.message.trim()) errors.message = 'Please enter your query.';
  else if (values.message.length > 2000) errors.message = 'Please keep your message under 2,000 characters.';
  return errors;
}

const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

/** Prepare links only. No messages are submitted or stored by this website. */
export function prepareInquiry(values: InquiryValues, email: string, whatsapp: string) {
  const message = [
    'Hi Qais,',
    '',
    `Name: ${singleLine(values.name)}`,
    `Email: ${singleLine(values.email)}`,
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
