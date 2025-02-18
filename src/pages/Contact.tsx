import Layout from "../layout/Layout";
import { useForm } from "react-hook-form";

export default function Contact() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={5}
              {...register("message")}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand text-white px-6 py-3 rounded-full font-semibold hover:brightness-110 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </Layout>
  );
}
