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
  if (hp && hp.value.trim().length > 0) return true;

  const hpTime = formEl.querySelector<HTMLInputElement>(
    'input[name="hp_time"]'
  );
  if (hpTime) {
    const started = parseInt(hpTime.value, 10);
    if (!Number.isNaN(started)) {
      const deltaMs = Date.now() - started;
      if (deltaMs < 1500) return true;
    }
  }
  return false;
}

export function ensureHiddenInput(
  formEl: HTMLFormElement,
  name: string
): HTMLInputElement {
  let input = formEl.querySelector<HTMLInputElement>(`input[name="${name}"]`);
  if (!input) {
    input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    formEl.appendChild(input);
  }
  return input;
}

type StampOptions = {
  overwriteWithEmpty?: boolean;
};

export function stampHiddenFields(
  formEl: HTMLFormElement,
  fields: Record<string, string>,
  opts: StampOptions = {}
) {
  const { overwriteWithEmpty = false } = opts;

  Object.entries(fields).forEach(([name, value]) => {
    const input = ensureHiddenInput(formEl, name);
    const incoming = typeof value === "string" ? value : String(value ?? "");

    if (!overwriteWithEmpty && incoming === "" && input.value.trim() !== "") {
      return;
    }

    input.value = incoming;
  });
}
