"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ButtonContact from "@/app/components/ButtonContact";

const ContactForm = () => {
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

    // Hiển thị thông báo thành công
    setShowSuccess(true);

    // Reset form
    setForm({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });

    // Ẩn thông báo sau 5 giây
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative max-w-6xl  mx-auto my-10 mt-25 p-10 rounded-4xl overflow-hidden shadow-2xl bg-white"
    >
      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:w-1/2 space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Hợp tác cùng chúng tôi
            </h2>
            <p className="text-gray-700 text-base">
              Kết nối ngay với chúng tôi để cùng hợp tác và phát triển. <br />
              Điền thông tin vào biểu mẫu, chúng tôi sẽ liên hệ lại sớm nhất!
            </p>
          </div>

          <div className="flex justify-start pt-4">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={240}
              height={90}
              className="object-contain drop-shadow-md"
              priority
            />
          </div>

          <div className="flex gap-10 pt-4">
            <div className="flex items-center gap-2">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-blue-500"
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
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-blue-500"
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
        </motion.div>

        {/* RIGHT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="md:w-1/2 w-full space-y-5 text-black"
        >
          {[
            { name: "name", placeholder: "Quý danh", type: "text" },
            { name: "phone", placeholder: "Số điện thoại", type: "tel" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "service", placeholder: "Dịch vụ yêu cầu", type: "text" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name as keyof typeof form]}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 px-5 py-3 bg-white/80 outline-none focus:ring-1 focus:ring-blue-400 hover:ring-1 hover:ring-blue-200 transition duration-500"
              required
            />
          ))}

          <textarea
            name="message"
            placeholder="Lời nhắn"
            value={form.message}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-5 py-3 h-28 bg-white/80 outline-none focus:ring-1 focus:ring-blue-400 hover:ring-1 hover:ring-blue-200 resize-none transition duration-500"
          />

          {/* ButtonContact with type="submit" and full width */}
          <div className="w-full">
            <ButtonContact />
          </div>

          {showSuccess && (
            <div className="mt-4 w-full rounded-lg bg-green-100 text-green-800 px-4 py-3 text-sm font-medium shadow-inner transition duration-300">
              Cảm ơn bạn đã gửi thông tin liên hệ, chúng tôi sẽ liên hệ vào thời
              gian gần nhất.
            </div>
          )}
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
