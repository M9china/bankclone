"use client";

import { useRef, useState } from "react";

export default function PaymentNotificationPage() {
  const contentRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    setLoading(true);
    try {
      const { toPng } = await import("html-to-image");
      const jsPDF = (await import("jspdf")).default;

      const imgData = await toPng(contentRef.current, {
        pixelRatio: 3,
        backgroundColor: "#ffffff",
        fetchRequestInit: { cache: "no-cache" },
        filter: (node) => {
          // Force include all nodes
          return true;
        },
      });

      const img = new window.Image();
      img.src = imgData;
      await new Promise((res) => (img.onload = res));

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 5; // 👈 change this to control side padding (0–20 works well)

      // Get image properties
      const imgProps = pdf.getImageProperties(imgData);

      // Scale image to fit inside margins
      const ratio = Math.min(
        (pageWidth - margin * 2) / imgProps.width,
        (pageHeight - margin * 2) / imgProps.height,
      );

      const imgWidth = imgProps.width * ratio;
      const imgHeight = imgProps.height * ratio;

      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);

      pdf.save("FNB-Account-Suspension-Notice.pdf");

      pdf.save("FNB-Account-Suspension-Notice.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      {/* Download Button */}
      <div className="w-full max-w-3xl flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          disabled={loading}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white text-sm font-semibold px-5 py-2.5 rounded shadow transition-colors duration-200"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                />
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>

      {/* Printable Content */}
      <section
        ref={contentRef}
        className="bg-white w-full max-w-3xl pb-10 pt-6 px-4 text-sm text-black leading-relaxed print:shadow-none print:max-w-none"
      >
        {/* Use plain <img> instead of Next.js <Image> so html-to-image can capture it */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fnblog.png"
          alt="First National Bank Logo"
          width={100}
          height={100}
          crossOrigin="anonymous"
          className="mx-auto mb-4 block pb-8 -mr-[0px] h-[7rem] w-auto object-contain bg-white"
        />

        <p className="mb-4">To Whom it may Concern:</p>
        <p className="mb-6 text-justify">
          First National Bank hereby confirms that the following account has
          been flagged thus suspended until further notice.
        </p>
        <div className="mb-6 space-y-1">
          <p>
            <strong>Date Actioned :</strong> 2026/03/02
          </p>
          <p>
            <strong>Time Actioned :</strong> 15:02:01
          </p>
          <p>
            <strong>Trace ID :</strong> RJ8ZHSTP
          </p>
        </div>
        <h3 className="font-semibold mt-6 mb-2">Account Details</h3>
        <div className="mb-6 space-y-1 ">
          <p>Account Status: Suspended</p>
          <p>Account Holder Name: MR ZAMOKUHLE ALTON HLOPHE</p>
          <p>Account Number: 630444942331</p>
          <p>Account Type: Easy Zero</p>
          <p>Branch Code: 250655</p>
          
        </div>

        <p className="mt-6 font-semibold">END OF NOTIFICATION</p>
        <div className="mt-4 space-y-4 text-xs text-black text-justify">
          <p>
            Our customer has requested First National Bank Limited to send this
            notification to you. Should you have any queries regarding the
            contents of this notice, please contact the account holder. First
            National Bank Limited does not guarantee or warrant the accuracy and
            integrity of the information and data transmitted electronically and
            we accept no liability whatsoever for any loss, expense, claim or
            damage, whether direct, indirect or consequential, arising from the
            transmission of the information and data.
          </p>
          <p className="font-semibold">Disclaimer:</p>
          <p>
            The information contained in this email is confidential and may
            contain proprietary information. It is meant solely for the intended
            recipient. Access to this email by anyone else is unauthorised. If
            you are not the intended recipient, any disclosure, copying,
            distribution or any action taken or omitted in reliance on this is
            prohibited and may be unlawful. No liability or responsibility is
            accepted if information or data is, for whatever reason corrupted or
            does not reach its intended recipient. No warranty is given that
            this email is free of viruses. The views expressed in this email
            are, unless otherwise stated, those of the author and not those of
            First National Bank Limited or its management. Licensed divisions of
            FirstRand Bank Limited are authorised financial service providers in
            terms of the Financial Advisory and Intermediary Services Act 37 of
            2002.
          </p>
          <p className="mt-4">
            First National Bank A division of FirstRand Bank Limited. An
            Authorised Financial Services and Credit Provider (NCRCP20).
          </p>
        </div>
      </section>
    </main>
  );
}
