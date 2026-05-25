"use client";

import React, { useState } from "react";

export default function AIUsage(): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed z-50 right-4 bottom-4">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI Usage"
          className="bg-black text-white px-3 py-2 rounded-md shadow-lg hover:opacity-90"
        >
          AI Usage
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <div className="relative m-4 w-96 max-w-full bg-white text-black rounded-lg shadow-xl p-4 overflow-auto">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base font-semibold">PHỤ LỤC MINH BẠCH (AI USAGE REPORT)</h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close AI Usage"
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 text-sm leading-relaxed space-y-3">
              <p className="font-semibold">Báo Cáo Ứng Dụng AI</p>
              <p>
                Tài liệu này minh bạch hóa quá trình nhóm sử dụng Trí Tuệ Nhân Tạo
                trong việc phát triển Sản Phẩm Sáng Tạo "Hustle".
              </p>

              <p className="font-semibold">1. Công cụ sử dụng</p>
              <p>
                Google Gemini Pro 1.5 / Antigravity: Hỗ trợ lập trình (Coding AI
                Assistant), phân tích cấu trúc, thiết kế giao diện UI/UX và gợi ý
                tinh chỉnh nội dung hàn lâm.
              </p>

              <p className="font-semibold">2. Mục đích sử dụng</p>
              <p>
                Phát triển giao diện web (HTML/CSS/React/Framer Motion) theo phong
                cách Luxury Editorial. Tái cấu trúc (refactoring) nội dung từ dạng
                câu chuyện HR thông thường sang bài phân tích chuyên sâu về Triết
                học Mác - Lênin. Chuyển đổi trải nghiệm từ Slide ngang sang Game
                Nhập Vai Tương Tác.
              </p>

              <p className="font-semibold">3. Prompt chính (Main Prompts)</p>
              <p>
                "Tôi muốn đưa nội dung các cặp phạm trù vào project để thuyết
                trình tình huống sinh viên T..."
              </p>

              <p>
                "Làm sao để web này không giống slide thuyết trình mà giống một
                Sản phẩm sáng tạo / đóng vai bác sĩ tâm lý phân tích nhật ký của
                sinh viên T"
              </p>

              <p className="font-semibold">4. Kết quả và Phần chỉnh sửa của sinh viên</p>
              <p>
                Kết quả: Bộ source code Next.js hoàn chỉnh với hiệu ứng scrollytelling.
                Các đoạn văn phân tích các cặp phạm trù (Nội dung - Hình thức,
                Bản chất - Hiện tượng) được AI gợi ý diễn đạt theo ngôn ngữ học
                thuật.
              </p>

              <p>
                Sinh viên chỉnh sửa & kiểm chứng: Nhóm đã chủ động đối chiếu toàn
                bộ lý luận AI sinh ra với Giáo trình Triết học Mác - Lênin
                (2019/2021). Nhóm quyết định luồng câu chuyện, tùy chỉnh màu
                sắc/font chữ, và duyệt sửa các từ ngữ chưa chính xác (ví dụ AI
                từng viết sai "Nguyên cọ", nhóm đã phát hiện và yêu cầu sửa thành
                "Nguyên cớ"). Sản phẩm phản ánh tư duy thiết kế và biên tập của
                sinh viên.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
