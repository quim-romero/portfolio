import emailjs from "@emailjs/browser";

export type TemplateKey = "services" | "contact";

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as
  | string
  | undefined;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as
  | string
  | undefined;
const EMAILJS_TEMPLATE_ID_SERVICES = import.meta.env
  .VITE_EMAILJS_TEMPLATE_ID_SERVICES as string | undefined;
const EMAILJS_TEMPLATE_ID_CONTACT = import.meta.env
  .VITE_EMAILJS_TEMPLATE_ID_CONTACT as string | undefined;

let initialized = false;

export function initEmail() {
  if (!initialized && EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    initialized = true;
  }
}

function getTemplateId(key: TemplateKey): string {
  const id =
    key === "services"
      ? EMAILJS_TEMPLATE_ID_SERVICES
      : EMAILJS_TEMPLATE_ID_CONTACT;
  if (!id) throw new Error(`Missing EmailJS template id for '${key}'.`);
  return id;
}

export async function sendEmailForm(
  key: TemplateKey,
  formEl: HTMLFormElement
): Promise<void> {
  initEmail();
  if (!EMAILJS_SERVICE_ID) throw new Error("Missing EmailJS service id.");
  await emailjs.sendForm(EMAILJS_SERVICE_ID, getTemplateId(key), formEl);
}

export function isBot(formEl: HTMLFormElement): boolean {
  const hp = formEl.querySelector<HTMLInputElement>('input[name="website"]');
  return !!hp && hp.value.trim().length > 0;
}

export function stampHiddenFields(
  formEl: HTMLFormElement,
  fields: Record<string, string>
) {
  Object.entries(fields).forEach(([name, value]) => {
    let input = formEl.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      formEl.appendChild(input);
    }
    input.value = value;
  });
}
