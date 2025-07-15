import Submit from "../components/footer/submit";

export default function Footer() {
  return (
    <footer
      className="relative bg-[#111111]
 rounded-tl-[150px] text-gray-200 p-6 text-sm"
    >
      <div className="z-[1] max-w-6xl mt-5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Cột 1 - Tổng đài hỗ trợ */}
        <div>
          <h3 className="font-semibold mb-6">Tổng đài hỗ trợ</h3>
          <ul className="space-y-3 text-footer">
            <li>
              Hotline:{" "}
              <a href="tel:0967291989" className="text-footer">
                <b>(+84) 967291989</b>
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:vinaelastic@gmail.com
"
                className="text-footer"
              >
                <b>Vinaelastic@gmail.com</b>
              </a>
            </li>
            <li>Từ 7h00 – 22h00 các ngày từ thứ 2 đến Chủ nhật</li>
          </ul>
        </div>

        {/* Cột 2 - Hợp tác */}
        <div className="text-gray-200">
          <h3 className="font-semibold mb-6">Hợp tác</h3>
          <ul className="space-y-3 text-footer">
            <li>
              <a href="#" className="text-footer">
                Liên hệ hợp tác
              </a>
            </li>
            <li>
              <a href="#" className="text-footer">
                Dành cho nhà đầu tư
              </a>
            </li>
            <li>
              <a href="#" className="text-footer">
                Dành cho khách hàng
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 3 - Thông tin công ty */}
        <div className="z-[1]">
          <h3 className="font-semibold mb-6">Liên hệ</h3>
          <ul className="space-y-3 text-footer">
            <li>
              <b>CÔNG TY TRÁCH NHIỆM HỮU HẠN VINA ELASTIC</b>
            </li>
            <li>
              <b>Trụ sở:</b> Lieu Thuong Village, Lieu Xa Commune, Yen My
              District, Hung Yen Province, Vietnam
            </li>
            <li>
              <b>Chi nhánh:</b> No. 43, Ngoc Lap TDP, Phung Chi Kien Ward, My
              Hao Town, Hung Yen Province, Vietnam
            </li>
          </ul>
        </div>
      </div>
      <div className="text-left mt-6 border-t border-[#333] pt-4">
        <div className="w-full max-w-6xl mx-auto px-4 sm:p-10 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">
            <div className="space-y-4 sm:space-y-6 sm:pr-10 pb-4 sm:pb-10">
              <h2 className="text-xl text-gray-300 sm:text-1xl lg:text-2xl font-bold leading-tight">
                Đăng ký nhận bản tin của chúng tôi.
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Nhận thông tin cập nhật về khuyến mãi sản phẩm và tin tức trong
                hộp thư đến của bạn. Không có thư rác.
              </p>
            </div>
            <div className="sm:pl-10 space-y-4">
              <Submit />
              <p className="text-gray-400 text-sm leading-relaxed">
                Bằng cách gửi địa chỉ email của bạn, bạn đồng ý nhận khuyến mãi
                hàng tháng của Vina Elastic Để biết thêm thông tin, vui lòng đọc{" "}
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  chính sách bảo mật
                </a>{" "}
                của chúng tôi - Bạn luôn có thể rút lại sự đồng ý của mình.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 sm:mt-1 text-sm text-gray-500 ">
          &copy; 2025 <span className="font-medium">Vina Elastic</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
