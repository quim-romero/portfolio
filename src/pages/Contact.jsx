import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        USER_ID
      )
      .then(() => {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setStatus("error");
      });
  };

  return (
    <section className="min-h-screen px-6 pt-28 pb-16 max-w-xl mx-auto bg-white dark:bg-background text-zinc-900 dark:text-foreground transition-colors duration-300">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Contact
      </motion.h1>

      <motion.p
        className="text-muted dark:text-muted mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Whether you're hiring, building something ambitious, or just want to
        connect — I'd love to hear from you.
      </motion.p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            name="message"
            required
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 rounded font-medium text-white 
            bg-primary-light hover:bg-primary-lightHover 
            dark:bg-primary dark:hover:bg-primary-dark transition"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <motion.p
            className="text-green-500 dark:text-green-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Message sent successfully!
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            className="text-red-500 dark:text-red-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Something went wrong. Please try again.
          </motion.p>
        )}
      </form>
    </section>
  );
};

export default Contact;
