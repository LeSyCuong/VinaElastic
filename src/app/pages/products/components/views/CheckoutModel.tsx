import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/items";
import { useUserStore } from "@/app/stores/userStore";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type Props = {
  title: string;
  items: CartItem[];
  onClose: () => void;
};

const url_backend = process.env.NEXT_PUBLIC_URL_BACKEND;

export default function CheckoutModal({ title, items, onClose }: Props) {
  const [qrUrl, setQrUrl] = useState("");
  const [paying, setPaying] = useState(false);
  const [invoice, setInvoice] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [successID, setSuccessID] = useState<string | null>(null);
  const { user, checkUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, [checkUser]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    checkUser();
    window.addEventListener("storage", checkUser);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("storage", checkUser);
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear the interval when component unmounts
      }
    };
  }, [checkUser]);

  const pollPaymentStatus = (invoiceCode: string) => {
    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${url_backend}/orders/status/${invoiceCode}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === "success") {
            clearInterval(intervalRef.current as NodeJS.Timeout); // Clear the interval when payment is successful
            setSuccessMessage(`Thanh toán thành công sản phẩm: ${data.name}`);
            setSuccessID(data.id);
            setQrUrl("");
            localStorage.setItem("paymentStatus", JSON.stringify(data));
          }
        }
      } catch (err) {
        console.error("Error checking payment status", err);
      }
    }, 10000); // Poll every 10 seconds

    setTimeout(() => {
      clearInterval(intervalRef.current as NodeJS.Timeout); // Stop polling after 15 minutes
      console.log("Polling stopped after 15 minutes");
    }, 900000);
  };

  const generateQR = (amount: number, invoiceCode: string) => {
    const base = "https://img.vietqr.io/image/ACB-19433111-print.png";
    const query = `?amount=${amount}&addInfo=${invoiceCode}&accountName=LE+SY+CUONG&invoiceCode=${invoiceCode}`;
    setQrUrl(`${base}${query}`);
    setTimeout(() => {
      pollPaymentStatus(invoiceCode);
    }, 2000);
  };

  const handlePurchase = async (
    itemId: number,
    price: number,
    name: string
  ) => {
    if (!user || !user.username) {
      router.push("/login");
      return;
    }

    setPaying(true);
    try {
      if (user.vnd >= price) {
        const res = await fetch(
          `${url_backend}/sanpham-game/thanh-toan/${itemId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.id }),
          }
        );

        if (!res.ok) throw new Error("Lỗi thanh toán");

        alert("✅ Thanh toán thành công!");
        onClose();
      } else {
        const res = await fetch(`${url_backend}/orders/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId,
            price,
            userId: user.id,
            name,
          }),
        });

        if (!res.ok) throw new Error("Lỗi tạo hóa đơn");

        const data = await res.json();

        setInvoice(data.invoiceCode);
        generateQR(price, data.invoiceCode);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Thanh toán thất bại. Vui lòng thử lại.");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="fixed inset-0 p-5 z-50 flex items-center justify-center">
      <div className="bg-[var(--background)]/50 top-10 backdrop-blur-xl border border-white/30 rounded-xl p-6 shadow-xl w-full max-w-md animate-fade-in-up relative">
        <button
          onClick={() => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current as NodeJS.Timeout);
            }
            onClose();
          }}
          className="cursor-pointer absolute top-3 right-6 text-[var(--primary)] hover:text-black hover:scale-110 transition text-3xl font-bold"
          aria-label="Đóng"
        >
          ×
        </button>

        {paying ? (
          <div className="text-center mt-4">
            <h3 className="text-sm text-[var(--primary)] font-semibold mb-3">
              Đang tạo hóa đơn, vui lòng chờ...
            </h3>
            <div className="animate-spin mx-auto border-4 border-t-4 border-primary rounded-full w-16 h-16"></div>
          </div>
        ) : successMessage ? (
          <div className="text-center mt-4">
            <DotLottieReact
              src="https://lottie.host/2f29c08a-e2f4-44d7-bf80-1ddfaf3edcb2/AUlde17beM.lottie"
              loop={false}
              autoplay
            />
            <h3 className="text-xl text-[var(--primary)] font-semibold mb-5">
              {successMessage}
            </h3>
            <button
              onClick={() => {
                router.push(`/profile/order/${successID}`);
              }}
              className="cursor-pointer w-full text-sm bg-[var(--primary)] text-[var(--background)] py-1.5 rounded-lg hover:scale-103 transition duration-500"
            >
              Xem đơn hàng
            </button>
          </div>
        ) : qrUrl && invoice ? (
          <div className="text-center mt-4">
            <h3 className="text-sm text-[var(--primary)] font-semibold mb-3">
              Quét mã QR để thanh toán
            </h3>
            <img
              src={qrUrl}
              alt="Mã QR thanh toán"
              width={260}
              height={260}
              className="mx-auto rounded-xl border"
            />
            <p className="text-xs text-[var(--primary)] mt-3">
              Sau khi chuyển khoản thành công,<br></br> hệ thống sẽ hoàn thành
              hóa đơn trong vòng 3 đến 5 phút.
            </p>
          </div>
        ) : items.length > 0 ? (
          <div>
            <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
              {title}
            </h2>
            <div className="space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin pr-1">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="space-y-4">
                  <div className="p-3 bg-[var(--background)]/30 rounded-xl shadow">
                    <h3 className="text-sm font-semibold text-[var(--primary)] mb-2">
                      Bản thường
                    </h3>
                    <ul className="text-xs text-[var(--primary)] list-disc pl-5 mb-3 space-y-1">
                      <li>Tool GM Admin</li>
                      <li>Bộ source server game</li>
                      <li>Hỗ trợ setup</li>
                    </ul>
                    <button
                      onClick={() =>
                        handlePurchase(item.id, item.price, item.name)
                      }
                      disabled={paying}
                      className="cursor-pointer w-full text-sm bg-[var(--primary)] text-[var(--background)] py-1.5 rounded-lg hover:scale-103 transition duration-500"
                    >
                      {item.price.toLocaleString("vi-VN")}₫
                    </button>
                  </div>
                  <div className="p-3 bg-[var(--background)]/30 rounded-xl shadow">
                    <h3 className="text-sm font-semibold text-[var(--primary)] mb-2">
                      Bản thương mại
                    </h3>
                    <ul className="text-xs text-[var(--primary)] list-disc pl-5 mb-3 space-y-1">
                      <li>Web User, Admin, Giftcode, Shop Item, Auto Bank</li>
                      <li>Tool GM Admin</li>
                      <li>Bộ source server game</li>
                      <li>Hỗ trợ setup</li>
                    </ul>
                    <button
                      onClick={() =>
                        handlePurchase(item.id, item.price + 1500000, item.name)
                      }
                      disabled={paying}
                      className="cursor-pointer w-full text-sm bg-[var(--primary)] text-[var(--background)] py-1.5 rounded-lg hover:scale-103 transition duration-500"
                    >
                      {(item.price + 1500000).toLocaleString("vi-VN")}₫
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Không có sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
}
