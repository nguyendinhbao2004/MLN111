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
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <div
            className="relative mx-auto w-full max-w-2xl bg-[var(--background)] text-[var(--foreground)] rounded-xl shadow-2xl p-6 overflow-auto"
            style={{ border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base font-semibold">PHỤ LỤC MINH BẠCH (AI USAGE REPORT)</h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close AI Usage"
                className="text-[var(--foreground)] bg-[var(--muted)] hover:opacity-90 rounded-md px-2 py-1"
                style={{ border: "none" }}
              >
                ✕
              </button>
            </div>

            <div className="mt-3 text-sm leading-relaxed space-y-3">
              <p className="font-semibold">Báo Cáo Ứng Dụng AI</p>
              <p>
                Tài liệu này minh bạch hóa quá trình nhóm sử dụng Trí Tuệ Nhân Tạo
                trong việc phát triển Sản Phẩm Sáng Tạo &quot;Hustle = Thành Công&quot;.
              </p>

              <p className="font-semibold">1. Công cụ sử dụng</p>
              <p>
                Codex / Antigravity: Hỗ trợ lập trình (Coding AI
                Assistant), phân tích cấu trúc, thiết kế giao diện UI/UX và gợi ý
                tinh chỉnh nội dung hàn lâm.
              </p>

              <p className="font-semibold">2. Mục đích sử dụng</p>
              <p>
                Phát triển giao diện web (HTML/CSS/React/Framer Motion) t. Tái cấu trúc (refactoring) nội dung từ dạng
                câu chuyện sang bài phân tích chuyên sâu về Triết
                học Mác - Lênin.
              </p>

              <p className="font-semibold">3. Prompt chính (Main Prompts)</p>
              <p>
                &quot;Tôi muốn đưa nội dung các cặp phạm trù vào project để thuyết
                trình tình huống sinh viên T...&quot;
              </p>

              <p>
                &quot;Làm sao để web này không giống slide thuyết trình mà giống một
                Sản phẩm sáng tạo / đóng vai bác sĩ tâm lý phân tích nhật ký của
                sinh viên T&quot;
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
                từng viết sai &quot;Nguyên cọ&quot;, nhóm đã phát hiện và yêu cầu sửa thành
                &quot;Nguyên cớ&quot;). Sản phẩm phản ánh tư duy thiết kế và biên tập của
                sinh viên.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
