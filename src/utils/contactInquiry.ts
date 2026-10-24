export const PROJECT_TYPES = ['Website', 'UI/UX design', 'AI & automation', 'Content & social', 'Something else'] as const;
export const PROJECT_TIMELINES = ['As soon as possible', 'Within a month', 'In 1–3 months', 'Just exploring'] as const;

export interface InquiryValues {
  name: string;
  email: string;
  business: string;
  service: string;
  timeline: string;
  message: string;
}

export type InquiryField = keyof InquiryValues;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const EMPTY_INQUIRY: InquiryValues = { name: '', email: '', business: '', service: '', timeline: '', message: '' };

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length > 100) errors.name = 'Please keep your name under 100 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254) errors.email = 'Enter a valid email address, such as name@example.com.';
  if (values.business.length > 120) errors.business = 'Please keep the business name under 120 characters.';
  if (!PROJECT_TYPES.some(type => type === values.service)) errors.service = 'Choose the type of project you have in mind.';
  if (values.timeline && !PROJECT_TIMELINES.some(timeline => timeline === values.timeline)) errors.timeline = 'Choose a timeline from the list.';
  if (values.message.trim().length < 20) errors.message = 'Tell me a little more—at least 20 characters.';
  else if (values.message.length > 2000) errors.message = 'Please keep your message under 2,000 characters.';
  return errors;
}

const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

/** Prepare links only. No messages are submitted or stored by this website. */
export function prepareInquiry(values: InquiryValues, email: string, whatsapp: string) {
  const message = [
    'Hi Qais, I would like to discuss a project.',
    '',
    `Name: ${singleLine(values.name)}`,
    `Email: ${singleLine(values.email)}`,
    ...(values.business.trim() ? [`Business / brand: ${singleLine(values.business)}`] : []),
    `Project: ${values.service}`,
    ...(values.timeline ? [`Timeline: ${values.timeline}`] : []),
    '',
    'Project brief:',
    values.message.trim(),
  ].join('\n');
  const whatsappUrl = new URL(whatsapp);
  whatsappUrl.searchParams.set('text', message);
  return {
    message,
    whatsappUrl: whatsappUrl.href,
    emailUrl: `mailto:${email}?subject=${encodeURIComponent(`Project inquiry: ${values.service} — ${singleLine(values.name)}`)}&body=${encodeURIComponent(message)}`,
  };
}
