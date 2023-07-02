import React from "react";


function PaymentInformation() {

  return (
    <>
      <div className="pd-header">
        <div className="pd-thumb">
          <img src={process.env.PUBLIC_URL + "/images/paymentInfo.png"} alt="PaymentInfo" />
        </div>
      </div>
    </>
  );
}

export default PaymentInformation;
