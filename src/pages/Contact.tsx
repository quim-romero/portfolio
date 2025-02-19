import Layout from "../layout/Layout";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { sendEmail } from "../utils/sendEmail";

const schema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup.string().email("Invalid email").required("Email is required."),
  message: yup.string().required("Message is required."),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (data: any) => {
    if (loading) return;
    setLoading(true);
    setError(false);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      await sendEmail(data);
      setSuccess(true);
      reset();
    } catch (error) {
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="px-6 py-24 max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Contact</h1>
        <p className="text-lg text-muted">
          Let’s get in touch — I’ll reply fast.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={5}
              {...register("message")}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-brand text-white px-6 py-3 rounded-full font-semibold transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-green-500 text-sm mt-4">
              Message sent successfully!
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-4">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </section>
    </Layout>
  );
}
