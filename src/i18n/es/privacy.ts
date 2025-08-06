export default {
  metaTitle: "Política de Privacidad — Quim Romero",
  metaDescription:
    "Información sobre cómo tratamos tus datos personales cuando contactas o pides presupuesto.",
  heading: "Política de Privacidad",

  intro:
    "Esta página explica cómo {NAME} trata tus datos personales cuando usas los formularios de contacto y servicios de este sitio web.",

  controller: {
    title: "Responsable del tratamiento",
    labelName: "Nombre",
    labelId: "NIF",
    labelAddress: "Dirección",
    labelEmail: "Email",
  },

  dataWeProcess: {
    title: "Datos que tratamos",
    intro:
      "Recogemos y procesamos los datos que nos facilitas a través de los formularios:",
    bullets: [
      "Identificación y contacto: nombre y email.",
      "Información del proyecto: mensaje/objetivo, paquete seleccionado (si aplica), plazo (timeline), banda de presupuesto aproximado, moneda, price_view, price_eur, budget_label, budget_eur_min, budget_eur_max, página de procedencia y timestamp.",
      "Campos opcionales: empresa/marca, web/URL, teléfono, enlaces de referencia.",
      "Consentimiento: aceptación de esta Política de Privacidad.",
    ],
    techNote:
      "Por razones técnicas y de seguridad, nuestros proveedores de hosting y servicios pueden registrar datos de uso (p. ej., dirección IP, cabeceras del navegador y cookies esenciales). Si empleamos analítica, solo se cargará previa aceptación de cookies.",
    seeCookies: "Consulta la Política de Cookies",
  },

  purposes: {
    title: "Finalidades",
    bullets: [
      "Gestionar y responder a tu solicitud de contacto o presupuesto.",
      "Preparar propuestas y mantener comunicaciones precontractuales.",
      "Mejorar la calidad del servicio y la seguridad del sitio (registros técnicos, medidas anti-spam).",
      "Estadísticas de uso (solo si aceptas las cookies correspondientes).",
    ],
  },

  legalBasis: {
    title: "Base jurídica",
    bullets: [
      "Consentimiento (art. 6.1.a RGPD) para tratar tu solicitud y contactarte.",
      "Medidas precontractuales (art. 6.1.b RGPD) cuando pides presupuesto.",
    ],
  },

  retention: {
    title: "Conservación",
    text: "Conservaremos tus datos durante un máximo de 24 meses tras la última interacción o hasta que retires tu consentimiento, salvo obligaciones legales distintas.",
  },

  recipients: {
    title: "Destinatarios y encargados",
    intro: "Utilizamos proveedores que actúan como encargados del tratamiento:",
    bullets: [
      "EmailJS: envío y gestión de emails de formularios.",
      "Proveedor de hosting (p. ej., Vercel/Netlify): alojamiento y entrega del sitio.",
      "Analítica (si está habilitada y aceptas): medición de uso (p. ej., Google Analytics).",
    ],
    transfers:
      "Estos proveedores pueden estar ubicados fuera del EEE. En tal caso, se aplican garantías adecuadas (p. ej., Cláusulas Contractuales Tipo) conforme al RGPD.",
  },

  rights: {
    title: "Derechos",
    text: "Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a {EMAIL}. Si no estás conforme, puedes reclamar ante tu autoridad de control.",
  },

  security: {
    title: "Seguridad",
    text: "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos. No realizamos decisiones automatizadas ni elaboramos perfiles.",
  },

  children: {
    title: "Menores",
    text: "Este sitio no está dirigido a menores de 14 años. Si crees que un menor nos ha enviado datos, contáctanos para eliminarlos.",
  },

  updates: {
    title: "Actualizaciones",
    text: "Podemos actualizar esta política para reflejar cambios legales u operativos. La versión vigente estará siempre disponible en esta URL.",
  },
} as const;
