import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { PERSONAL_INFO } from "../constants";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || hasSubmitted) return;

    setFormState("submitting");
    setErrorMessage("");

    const formData = new FormData(formRef.current);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
    const notificationTemplateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_NOTIFICATION!;
    const acknowledgmentTemplateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ACKNOWLEDGMENT!;

    try {
      await emailjs.send(
        serviceId,
        notificationTemplateId,
        {
          name,
          email,
          message,
          timestamp: new Date().toLocaleString(),
        },
        publicKey
      );

      await emailjs.send(
        serviceId,
        acknowledgmentTemplateId,
        {
          to_email: email,
          to_name: name,
          name,
          email,
          message,
        },
        publicKey
      );

      setFormState("success");
      setHasSubmitted(true);
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setFormState("error");
      setErrorMessage(
        "Failed to send message. Please try again or email me directly."
      );
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="rounded-3xl bg-slate-900 px-6 py-12 md:px-12 md:py-16 shadow-2xl overflow-hidden relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>

          <div className="relative grid gap-12 md:grid-cols-2">
            {/* Contact Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Let's Connect</h2>
                <p className="mt-4 text-slate-400 leading-relaxed">
                  Interested in collaborating on AI projects or have a role in
                  mind? I'm always open to discussing new opportunities.
                </p>
              </div>

              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Email</p>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-white hover:text-primary-400 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">
                      Location
                    </p>
                    <p className="text-white">{PERSONAL_INFO.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="relative rounded-2xl bg-white p-6 md:p-8">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex h-full flex-col items-center justify-center text-center py-10"
                  >
                    <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Message Sent!
                    </h3>
                    <p className="mt-2 text-slate-500">
                      I'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : formState === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex h-full flex-col items-center justify-center text-center py-10"
                  >
                    <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600">
                      <AlertCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Oops! Something went wrong
                    </h3>
                    <p className="mt-2 text-slate-500">{errorMessage}</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="How can I help you?"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-70"
                    >
                      {formState === "submitting" ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
