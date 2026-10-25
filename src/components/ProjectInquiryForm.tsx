import React, { useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { CONTACT_SECTION_DATA } from '../data/portfolioData';
import { EMPTY_INQUIRY, prepareInquiry, validateInquiry, type InquiryErrors, type InquiryField, type InquiryValues } from '../utils/contactInquiry';

const FIELD_IDS: Record<InquiryField, string> = {
  name: 'inquiry-name', email: 'inquiry-email', message: 'inquiry-message',
};
const FIELD_LABELS: Record<InquiryField, string> = { name: 'Name', email: 'Email', message: 'Query' };

export const ProjectInquiryForm: React.FC = () => {
  const [values, setValues] = useState<InquiryValues>({ ...EMPTY_INQUIRY });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [draftOpened, setDraftOpened] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const errorEntries = Object.entries(errors) as [InquiryField, string][];

  const update = (field: InquiryField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    setDraftOpened(false);
    if (submitted || errors[field]) setErrors(validateInquiry(next));
  };
  const validateField = (field: InquiryField) => {
    setErrors(previous => {
      const next = { ...previous };
      const error = validateInquiry(values)[field];
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };
  const fieldState = (field: InquiryField) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${FIELD_IDS[field]}-error` : undefined,
  });
  const fieldError = (field: InquiryField) => errors[field] && (
    <p id={`${FIELD_IDS[field]}-error`} className="inquiry-error">
      <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 mt-0.5 shrink-0" />{errors[field]}
    </p>
  );
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const inquiry = prepareInquiry(values, CONTACT_SECTION_DATA.email, CONTACT_SECTION_DATA.whatsapp);
    window.location.href = inquiry.emailUrl;
    setDraftOpened(true);
  };

  return (
    <div className="inquiry-card">
      <h3 id="inquiry-title" className="text-xl sm:text-2xl font-display font-bold tracking-tight text-slate-950">Leave me a message</h3>
      <p className="text-xs text-copy-secondary mt-2 mb-6">All three fields are required.</p>
      <form aria-labelledby="inquiry-title" noValidate onSubmit={submit} className="space-y-5">
        {submitted && errorEntries.length > 0 && (
          <div ref={summaryRef} role="alert" tabIndex={-1} aria-labelledby="inquiry-error-title" className="inquiry-error-summary">
            <h4 id="inquiry-error-title" className="font-bold mb-1">Please check these details.</h4>
            <ul>
              {errorEntries.map(([field, message]) => (
                <li key={field}><a href={`#${FIELD_IDS[field]}`} onClick={event => { event.preventDefault(); document.getElementById(FIELD_IDS[field])?.focus(); }}>{FIELD_LABELS[field]}: {message}</a></li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="inquiry-field">
            <label className="inquiry-label" htmlFor={FIELD_IDS.name}>Name</label>
            <input className="inquiry-input" id={FIELD_IDS.name} name="name" autoComplete="name" required maxLength={100} placeholder="Your name" value={values.name} onChange={e => update('name', e.target.value)} onBlur={() => validateField('name')} {...fieldState('name')} />
            {fieldError('name')}
          </div>
          <div className="inquiry-field">
            <label className="inquiry-label" htmlFor={FIELD_IDS.email}>Email</label>
            <input className="inquiry-input" id={FIELD_IDS.email} name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" value={values.email} onChange={e => update('email', e.target.value)} onBlur={() => validateField('email')} {...fieldState('email')} />
            {fieldError('email')}
          </div>
        </div>
        <div className="inquiry-field">
          <label className="inquiry-label" htmlFor={FIELD_IDS.message}>Query</label>
          <textarea className="inquiry-input" id={FIELD_IDS.message} name="message" rows={5} required maxLength={2000} placeholder="How can I help you?" value={values.message} onChange={e => update('message', e.target.value)} onBlur={() => validateField('message')} {...fieldState('message')} />
          {fieldError('message')}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 pt-1">
          <button type="submit" className="inquiry-primary shrink-0">Submit</button>
        </div>
        {draftOpened && <p role="status" className="text-xs text-copy-secondary leading-relaxed">Your email app was requested. Nothing has been sent yet. If it didn’t open, email {CONTACT_SECTION_DATA.email} directly. Your query is still here.</p>}
      </form>
    </div>
  );
};
