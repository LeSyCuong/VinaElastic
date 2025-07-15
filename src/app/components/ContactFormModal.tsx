"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaFontAwesomeAlt } from "react-icons/fa";
import ButtonContact from "./ButtonContact";

type ContactFormModalProps = {
  visible: boolean;
  onClose: () => void;
};

const ContactFormModal = ({ visible, onClose }: ContactFormModalProps) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setShowSuccess(true);
    setForm({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });

    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed mt-8 z-50 top-1/2 left-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl p-8"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* LEFT */}
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Hợp tác cùng chúng tôi
                </h2>
                <p className="text-gray-700 text-sm">
                  Kết nối ngay với chúng tôi để cùng hợp tác và phát triển.{" "}
                  <br />
                  Điền thông tin vào biểu mẫu, chúng tôi sẽ liên hệ lại sớm
                  nhất!
                </p>

                <Image
                  src="/assets/images/logo.png"
                  alt="logo"
                  width={200}
                  height={70}
                  className="pt-2"
                />

                <div className="flex flex-col gap-3 text-sm pt-2">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.6a1 1 0 01.97.757l1.125 4.5a1 1 0 01-.516 1.116l-2.222 1.11a11.042 11.042 0 005.292 5.292l1.11-2.222a1 1 0 011.116-.516l4.5 1.125a1 1 0 01.757.97V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Hotline</p>
                      <a
                        href="tel:0967291989"
                        className="text-sm font-medium text-gray-800"
                      >
                        0967291989
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 8V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z"
                      />
                    </svg>

                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href="mailto:vinaelastic@gmail.com"
                        className="text-sm font-medium text-gray-800"
                      >
                        Vinaelastic@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="md:w-1/2 w-full space-y-4 text-black"
              >
                {[
                  { name: "name", placeholder: "Quý danh", type: "text" },
                  { name: "phone", placeholder: "Số điện thoại", type: "tel" },
                  { name: "email", placeholder: "Email", type: "email" },
                  {
                    name: "service",
                    placeholder: "Dịch vụ yêu cầu",
                    type: "text",
                  },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    className="w-full rounded-full border border-gray-300 px-4 py-2 bg-white/90 outline-none focus:ring-1 focus:ring-blue-400 transition"
                    required
                  />
                ))}

                <textarea
                  name="message"
                  placeholder="Lời nhắn"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 h-24 bg-white/90 outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                />
                <div className="w-full">
                  <ButtonContact />
                </div>

                {showSuccess && (
                  <div className="mt-2 w-full rounded-lg bg-green-100 text-green-800 px-4 py-2 text-sm text-center shadow-inner">
                    Cảm ơn bạn đã gửi thông tin liên hệ, chúng tôi sẽ liên hệ
                    vào thời gian gần nhất.
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactFormModal;
