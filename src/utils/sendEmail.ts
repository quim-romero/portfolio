import emailjs from '@emailjs/browser';

export async function sendEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  return await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    data,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}
