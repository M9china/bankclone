import Image from "next/image";
export default function PaymentNotificationPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <section className="bg-white w-full max-w-3xl shadow-md p-10 text-sm text-black leading-relaxed print:shadow-none print:max-w-none">

        {/* <h2 className="text-xl font-bold text-center mb-6">
          NOTIFICATION OF PAYMENT
        </h2> */}
        <Image className="mx-auto mb-4" src="/FNB-logo.png" alt="First National Bank Logo" width={100} height={100} />

        <p className="mb-4">To Whom it may Concern:</p>

        <p className="mb-6">
          First National Bank hereby confirms that the following account has been flagged thus suspended until further notice. 
        </p>

        <div className="mb-6 space-y-1">
          <p><strong>Date Actioned :</strong> 2026/03/02</p>
          <p><strong>Time Actioned :</strong> 15:02:01</p>
          <p><strong>Trace ID :</strong> RJ8ZHSTP</p>
        </div>

        <h3 className="font-bold mt-6 mb-2">Account Holder Details</h3>

        <div className="mb-6 space-y-1">
          <p>MR ZAMOKUHLE ALTON HLOPHE</p>
        </div>

        <p className="mt-6 font-semibold">END OF NOTIFICATION</p>

        <div className="mt-8 space-y-4 text-xs text-gray-700">

          <p>
            Our customer (the payer) has requested First National Bank Limited to send this notification to you.
            Should you have any queries regarding the contents of this notice, please contact the account holder. First National Bank
            Limited does not guarantee or warrant the accuracy and integrity of the information and data transmitted
            electronically and we accept no liability whatsoever for any loss, expense, claim or damage, whether direct,
            indirect or consequential, arising from the transmission of the information and data.
          </p>

          <p className="font-semibold">Disclaimer:</p>

          <p>
            The information contained in this email is confidential and may contain proprietary information. It is meant
            solely for the intended recipient. Access to this email by anyone else is unauthorised. If you are not the
            intended recipient, any disclosure, copying, distribution or any action taken or omitted in reliance on this
            is prohibited and may be unlawful. No liability or responsibility is accepted if information or data is, for
            whatever reason corrupted or does not reach its intended recipient. No warranty is given that this email is
            free of viruses. The views expressed in this email are, unless otherwise stated, those of the author and not
            those of First National Bank Limited or its management. First National Bank Limited reserves the right to
            monitor, intercept and block emails addressed to its users or take any other action in accordance with its
            email use policy. Licensed divisions of FirstRand Bank Limited are authorised financial service providers in
            terms of the Financial Advisory and Intermediary Services Act 37 of 2002.
          </p>

          <p className="mt-4">
            First National Bank A division of FirstRand Bank Limited. An Authorised Financial Services and Credit Provider (NCRCP20).
          </p>
        </div>

      </section>
    </main>
  );
}