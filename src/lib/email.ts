import emailjs from "@emailjs/browser";

export type TemplateKey = "services" | "contact";

const PUB = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const SID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TPL_SERVICES = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_SERVICES as
  | string
  | undefined;
const TPL_CONTACT = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT as
  | string
  | undefined;

let initialized = false;

export function initEmail() {
  if (!initialized) {
    if (!PUB) console.warn("[email] Missing VITE_EMAILJS_PUBLIC_KEY");
    emailjs.init(PUB || "");
    initialized = true;
  }
}

function getTemplateId(key: TemplateKey): string {
  const id = key === "services" ? TPL_SERVICES : TPL_CONTACT;
  if (!id) throw new Error(`Missing EmailJS template id for '${key}'.`);
  return id;
}

export async function sendEmailForm(
  key: TemplateKey,
  formEl: HTMLFormElement
): Promise<void> {
  initEmail();
  if (!SID) throw new Error("Missing EmailJS service id.");
  await emailjs.sendForm(SID, getTemplateId(key), formEl);
}

export async function sendEmailData(
  key: TemplateKey,
  data: Record<string, unknown>
): Promise<void> {
  initEmail();
  if (!SID) throw new Error("Missing EmailJS service id.");
  await emailjs.send(SID, getTemplateId(key), data);
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
