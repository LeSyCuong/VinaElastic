"use client";
import { useState, useEffect } from "react";

interface User {
  user?: { id: number } | null;
}

const getClientIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP:", error);
    return null;
  }
};

const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  return userAgent;
};

const Submit = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [errorCode, setErrorCode] = useState("");

  useEffect(() => {
    const checkUser = () => {
      const sessionUser = sessionStorage.getItem("user");
      const localUser = localStorage.getItem("user");

      if (sessionUser) {
        setUser(JSON.parse(sessionUser).id);
      } else if (localUser) {
        setUser(JSON.parse(localUser).id);
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const showMessage = (
    text: string,
    type: "success" | "error",
    code?: string
  ) => {
    setMessage(text);
    setMessageType(type);
    setErrorCode(code || "");

    if (type === "error" && code) {
      console.log(`Error [${code}]: ${text}`);
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("");
      setErrorCode("");
    }, 7000);
  };

  const getErrorMessage = (
    errorCode: string,
    defaultMessage: string
  ): string => {
    const errorMessages: { [key: string]: string } = {
      INVALID_EMAIL: "Email không đúng định dạng. Vui lòng kiểm tra lại.",
      EMAIL_EXISTS:
        "Email này đã được đăng ký trước đó. Vui lòng sử dụng email khác.",
      IP_RATE_LIMIT:
        "Bạn đã vượt quá giới hạn đăng ký (5 lần/giờ). Vui lòng thử lại sau.",
      DEVICE_RATE_LIMIT:
        "Thiết bị của bạn đã vượt quá giới hạn đăng ký (10 lần/ngày). Vui lòng thử lại vào ngày mai.",
      DATABASE_ERROR: "Lỗi hệ thống. Vui lòng thử lại sau ít phút.",
      SYSTEM_ERROR: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      NETWORK_ERROR: "Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.",
      SERVER_ERROR: "Server đang bận. Vui lòng thử lại sau.",
    };

    return errorMessages[errorCode] || defaultMessage;
  };

  const handleSubmit = async (): Promise<boolean> => {
    setMessage("");
    setMessageType("");
    setErrorCode("");

    if (!email) {
      showMessage("Vui lòng nhập email!", "error", "EMPTY_EMAIL");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage(
        "Email không đúng định dạng!",
        "error",
        "INVALID_EMAIL_FORMAT"
      );
      return false;
    }

    setIsLoading(true);

    try {
      const ip = await getClientIP();
      const deviceInfo = getDeviceInfo();

      const response = await fetch(
        process.env.NEXT_PUBLIC_URL_BACKEND + "/contact/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user,
            email,
            ip,
            device: deviceInfo,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        if (response.status === 400) {
          const message = getErrorMessage(
            errorData?.code || "INVALID_EMAIL",
            errorData?.message || "Dữ liệu không hợp lệ"
          );
          showMessage(message, "error", errorData?.code || "BAD_REQUEST");
          return false;
        }

        if (response.status === 409) {
          const message = getErrorMessage(
            errorData?.code || "EMAIL_EXISTS",
            errorData?.message || "Email đã tồn tại"
          );
          showMessage(message, "error", errorData?.code || "CONFLICT");
          return false;
        }

        if (response.status === 429) {
          const message = getErrorMessage(
            errorData?.code || "RATE_LIMIT",
            errorData?.message || "Vượt quá giới hạn cho phép"
          );
          showMessage(message, "error", errorData?.code || "RATE_LIMIT");
          return false;
        }

        if (response.status >= 500) {
          // Server Error
          const message = getErrorMessage(
            errorData?.code || "SERVER_ERROR",
            errorData?.message || "Lỗi server"
          );
          showMessage(message, "error", errorData?.code || "SERVER_ERROR");
          return false;
        }

        // Other HTTP errors
        showMessage("Có lỗi xảy ra, vui lòng thử lại", "error", "HTTP_ERROR");
        return false;
      }

      const data = await response.json();

      if (data.success === false) {
        const message = getErrorMessage(
          data.code || "UNKNOWN_ERROR",
          data.message || "Đăng ký thất bại! Vui lòng thử lại."
        );
        showMessage(message, "error", data.code || "UNKNOWN_ERROR");
        return false;
      }

      // Success case
      showMessage(
        data.message ||
          "Đăng ký thành công! Cảm ơn bạn đã đăng ký nhận bản tin.",
        "success",
        "SUCCESS"
      );
      setEmail(""); // Reset form
      return true;
    } catch (error) {
      console.error("Network error:", error);

      // Handle different types of network errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        showMessage(
          getErrorMessage("NETWORK_ERROR", "Lỗi kết nối mạng"),
          "error",
          "NETWORK_ERROR"
        );
      } else {
        showMessage(
          getErrorMessage(
            "SYSTEM_ERROR",
            "Có lỗi xảy ra! Vui lòng thử lại sau."
          ),
          "error",
          "SYSTEM_ERROR"
        );
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3 z-[1]">
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your_email@gmail.com"
          className="hover:white hover:ring-[0.5px] transaction duration-400 w-full sm:basis-[70%] px-4 py-3 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-white-100 focus:border-transparent text-base"
          disabled={isLoading}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="cursor-pointer w-full sm:basis-[30%] px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Đang gửi..." : "Subscribe"}
        </button>
      </div>

      {message && (
        <div className="space-y-1">
          <div
            className={`text-sm font-medium transition-all duration-300 ${
              messageType === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Submit;
