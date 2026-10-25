# Contact form

The contact form submits to `https://formsubmit.co/ajax/qais@qdelta.in`.
Name, email, WhatsApp number, and query are all mandatory and are sent to FormSubmit only when the visitor selects Submit.
No API key or mail client is required. FormSubmit's spam filtering remains enabled.

## Activate delivery

1. Deploy the site and send a test query from its contact form.
2. Open the activation email sent by FormSubmit to `qais@qdelta.in` (check spam).
3. Confirm the form, then submit another test query to verify inbox delivery.

The UI confirms submission acceptance, not guaranteed email delivery. Network,
timeout, and provider errors preserve the visitor's input for retrying.
Tests mock the provider; running `npm test` does not send email.
