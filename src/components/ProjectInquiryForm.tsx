import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, ArrowRight, Check, CheckCircle2, Copy, Mail } from 'lucide-react';
import { CONTACT_SECTION_DATA } from '../data/portfolioData';
import {
  EMPTY_INQUIRY, PROJECT_TIMELINES, PROJECT_TYPES, prepareInquiry, validateInquiry,
  type InquiryErrors, type InquiryField, type InquiryValues,
} from '../utils/contactInquiry';
import { WhatsappIcon } from './SocialIcons';
import { useSiteMotion } from './SiteMotion';

const FIELD_IDS: Record<InquiryField, string> = {
  name: 'inquiry-name', email: 'inquiry-email', business: 'inquiry-business',
  service: 'inquiry-service', timeline: 'inquiry-timeline', message: 'inquiry-message',
};
const FIELD_LABELS: Record<InquiryField, string> = {
  name: 'Your name', email: 'Email address', business: 'Business / brand',
  service: 'Project type', timeline: 'Timeline', message: 'Project brief',
};

const FieldError: React.FC<{ field: InquiryField; message?: string }> = ({ field, message }) => message ? (
  <p id={`${FIELD_IDS[field]}-error`} className="inquiry-error" aria-live="polite">
    <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 mt-0.5 shrink-0" />{message}
  </p>
) : null;

export const ProjectInquiryForm: React.FC = () => {
  const { reducedMotion } = useSiteMotion();
  const [values, setValues] = useState<InquiryValues>({ ...EMPTY_INQUIRY });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [prepared, setPrepared] = useState<ReturnType<typeof prepareInquiry> | null>(null);
  const [copyNotice, setCopyNotice] = useState('');
  const summaryRef = useRef<HTMLDivElement>(null);
  const editing = useRef(false);
  const preparedFocused = useRef(false);
  const errorEntries = (Object.entries(errors) as [InquiryField, string][]).filter(([, message]) => Boolean(message));
  const focusPrepared = useCallback((node: HTMLHeadingElement | null) => {
    if (node && !preparedFocused.current) {
      preparedFocused.current = true;
      requestAnimationFrame(() => {
        if (!node.isConnected) return;
        node.focus({ preventScroll: true });
        node.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
      });
    }
  }, [reducedMotion]);
  const focusEditedForm = useCallback((node: HTMLFormElement | null) => {
    if (node && editing.current) {
      editing.current = false;
      node.querySelector<HTMLInputElement>(`#${FIELD_IDS.name}`)?.focus();
    }
  }, []);

  const validateField = (field: InquiryField, next: InquiryValues = values) => {
    const message = validateInquiry(next)[field];
    setErrors(previous => {
      const updated = { ...previous };
      if (message) updated[field] = message;
      else delete updated[field];
      return updated;
    });
  };

  const update = (field: InquiryField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field]) validateField(field, next);
  };

  const fieldState = (field: InquiryField) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${FIELD_IDS[field]}-error` : undefined,
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    setCopyNotice('');
    preparedFocused.current = false;
    setPrepared(prepareInquiry(values, CONTACT_SECTION_DATA.email, CONTACT_SECTION_DATA.whatsapp));
  };

  const copyInquiry = async () => {
    if (!prepared) return;
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(prepared.message);
      setCopyNotice('Inquiry copied. Paste it into your preferred messaging app.');
    } catch {
      setCopyNotice('Copy is unavailable here. You can select the inquiry text above or use the WhatsApp/email links.');
    }
  };

  const transition = { duration: reducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <div className="inquiry-card">
      <div className="mb-6">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-violet-700 mb-2">
          {prepared ? '02 / Ready to connect' : '01 / Project details'}
        </p>
        <h3 id="inquiry-title" className="text-2xl sm:text-[28px] font-bold font-display tracking-tight text-slate-950 leading-tight">Tell me about your project.</h3>
        <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed mt-2">
          {prepared ? 'A clear brief. One easy next step.' : 'A few details to start a useful conversation. Required fields are marked *.'}
        </p>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {!prepared ? (
          <motion.form
            key="details"
            ref={focusEditedForm}
            aria-labelledby="inquiry-title"
            noValidate
            onSubmit={submit}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="space-y-5"
          >
            {showSummary && errorEntries.length > 0 && (
              <div ref={summaryRef} role="alert" tabIndex={-1} aria-labelledby="inquiry-error-title" className="inquiry-error-summary">
                <h4 id="inquiry-error-title" className="font-bold mb-1">A few details need your attention.</h4>
                <ul className="space-y-1">
                  {errorEntries.map(([field, message]) => (
                    <li key={field}>
                      <a href={`#${FIELD_IDS[field]}`} onClick={event => { event.preventDefault(); document.getElementById(FIELD_IDS[field])?.focus(); }}>
                        {FIELD_LABELS[field]}: {message}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="inquiry-field">
                <label className="inquiry-label" htmlFor={FIELD_IDS.name}>Your name <span aria-hidden="true">*</span></label>
                <input className="inquiry-input" id={FIELD_IDS.name} name="name" autoComplete="name" required maxLength={100} placeholder="Your full name" value={values.name} onChange={e => update('name', e.target.value)} onBlur={() => validateField('name')} {...fieldState('name')} />
                <FieldError field="name" message={errors.name} />
              </div>
              <div className="inquiry-field">
                <label className="inquiry-label" htmlFor={FIELD_IDS.email}>Email address <span aria-hidden="true">*</span></label>
                <input className="inquiry-input" id={FIELD_IDS.email} name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" value={values.email} onChange={e => update('email', e.target.value)} onBlur={() => validateField('email')} {...fieldState('email')} />
                <FieldError field="email" message={errors.email} />
              </div>
            </div>

            <fieldset id={FIELD_IDS.service} tabIndex={-1} {...fieldState('service')} className="min-w-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600">
              <legend className="inquiry-label">What can I help with? <span aria-hidden="true">*</span></legend>
              <div className="grid grid-cols-2 gap-2">
                {PROJECT_TYPES.map(type => (
                  <label key={type} className="service-option last:col-span-2">
                    <input className="sr-only" type="radio" name="service" value={type} checked={values.service === type} onChange={() => update('service', type)} required />
                    <span className="service-choice"><Check aria-hidden="true" className="h-3.5 w-3.5" /><span>{type}</span></span>
                  </label>
                ))}
              </div>
              <FieldError field="service" message={errors.service} />
            </fieldset>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="inquiry-field">
                <label className="inquiry-label" htmlFor={FIELD_IDS.business}>Business / brand <span className="inquiry-optional">(optional)</span></label>
                <input className="inquiry-input" id={FIELD_IDS.business} name="organization" autoComplete="organization" maxLength={120} placeholder="Your business name" value={values.business} onChange={e => update('business', e.target.value)} onBlur={() => validateField('business')} {...fieldState('business')} />
                <FieldError field="business" message={errors.business} />
              </div>
              <div className="inquiry-field">
                <label className="inquiry-label" htmlFor={FIELD_IDS.timeline}>Timeline <span className="inquiry-optional">(optional)</span></label>
                <select className="inquiry-input" id={FIELD_IDS.timeline} name="timeline" value={values.timeline} onChange={e => update('timeline', e.target.value)} {...fieldState('timeline')}>
                  <option value="">Choose a timeline</option>
                  {PROJECT_TIMELINES.map(timeline => <option key={timeline} value={timeline}>{timeline}</option>)}
                </select>
                <FieldError field="timeline" message={errors.timeline} />
              </div>
            </div>

            <div className="inquiry-field">
              <label className="inquiry-label" htmlFor={FIELD_IDS.message}>A little about your idea <span aria-hidden="true">*</span></label>
              <textarea className="inquiry-input" id={FIELD_IDS.message} name="message" rows={4} required minLength={20} maxLength={2000} placeholder="What are you building, and what would make it a success?" value={values.message} onChange={e => update('message', e.target.value)} onBlur={() => validateField('message')} {...fieldState('message')} aria-describedby={`${errors.message ? `${FIELD_IDS.message}-error ` : ''}inquiry-message-hint`} />
              <div id="inquiry-message-hint" className="flex justify-between gap-3 text-[10px] text-copy-muted mt-2"><span>20–2,000 characters</span><span>{values.message.length}/2,000</span></div>
              <FieldError field="message" message={errors.message} />
            </div>

            <button type="submit" className="inquiry-primary w-full">Prepare my inquiry <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></button>
            <p className="text-[11px] text-copy-secondary leading-relaxed">Next, choose WhatsApp or email. Your details stay in this browser until you choose an app.</p>
          </motion.form>
        ) : (
          <motion.div key="review" initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={transition} className="space-y-5">
            <div className="flex items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4">
              <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-violet-700 mt-0.5" />
              <div className="min-w-0">
                <h4
                  tabIndex={-1}
                  ref={focusPrepared}
                  className="text-sm font-bold text-violet-950 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600"
                >Prepared—not sent yet.</h4>
                <p className="text-xs text-copy-secondary leading-relaxed mt-1">Review your brief, then choose an app to send it to Qais.</p>
              </div>
            </div>
            <pre className="inquiry-review-text" tabIndex={0} aria-label="Your prepared project inquiry">{prepared.message}</pre>
            <div className="inquiry-actions">
              <a className="inquiry-primary" href={prepared.whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsappIcon className="h-4 w-4 shrink-0" />Continue on WhatsApp</a>
              <a className="inquiry-secondary" href={prepared.emailUrl}><Mail aria-hidden="true" className="h-4 w-4 shrink-0" />Open email draft</a>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button type="button" className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-copy-secondary rounded-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet-600" onClick={() => { editing.current = true; setPrepared(null); setCopyNotice(''); }}><ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />Edit details</button>
              <button type="button" className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-violet-700 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet-600" onClick={copyInquiry}><Copy aria-hidden="true" className="h-3.5 w-3.5" />Copy inquiry</button>
            </div>
            {copyNotice && <p role="status" className="text-xs text-copy-secondary leading-relaxed">{copyNotice}</p>}
            <p className="text-[11px] text-copy-secondary leading-relaxed">Opening an app prepares a draft only. Review and press Send in WhatsApp or your email app to deliver it.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
