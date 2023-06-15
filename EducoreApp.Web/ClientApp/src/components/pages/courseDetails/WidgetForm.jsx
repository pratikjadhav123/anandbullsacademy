import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import notice from "../../../plugins/notice";
import payment from "../../../utils/payment";

function WidgetForm({ courseDetail, user, MyCourse }) {
  const navigate = useHistory()
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }

      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script)
    })
  }

  const assignProject = (paymentId) => {
    const formData = new FormData();
    formData.append("CourseId", courseDetail.CourseId)
    formData.append("PaymentId", paymentId)
    payment.purchaseCourse(formData).then((data) => {
      navigate.push("/myProfile")
    })
  }

  const displayRazorpay = async (amount) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('script faild')
      return
    }

    var options = {
      key: "rzp_test_n9RwaKTC23Vqz2",
      currency: "INR",
      // key_secret: "AV6utSKOogRsoOMncWVq7T1r",
      amount: (courseDetail.Price + (0.02 * courseDetail.Price)) * 100,
      name: "Anand bulls trading acadamy",
      description: "for testing purpose",
      image: "",
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          if (paymentId) {
            assignProject(paymentId);
          } else {
            notice.error("Payment faild please contact your bank if debited from account")
          }
        } catch (err) {
          console.log("err", err);
        }
      },
      prefill: {
        name: user.FirstName,
        email: user.Email,
        contact: user.Mobile
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  }
  const checkout = () => {
    if (!user) {
      notice.warning("please Sign in before buying course.Thank You..! ")
      navigate.push("/auth/Login")
    } else {
      displayRazorpay()
    }
  }
  return (
    <>
      {!MyCourse ? <aside className="package-widget-style-2 widget-form mt-5">
        <div className="widget-title text-center ">

          {/* <h4>Join This Course</h4> */}

          <span className="widget-lavel">
            Payment Structure <h4>₹{courseDetail.Price}</h4> is Course Fees and <h4>2% i.e. ₹{0.02 * courseDetail.Price}</h4> is Payment Gateway Charge
          </span>
        </div>

        <div className="widget-body p-0 m-0">
          <form
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="booking-form-wrapper">
              <div className="custom-input-group">
                <div className="submite-btn">
                  <button style={{ borderRadius: "0px" }} type="submit" onClick={checkout}> <h4>₹{courseDetail.Price + (0.02 * courseDetail.Price)}</h4>Check Out</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </aside> :
        <aside className="package-widget-style-2 widget-form mt-5">

          <div className="widget-body p-0 m-0">
            <form
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="booking-form-wrapper">
                <div className="custom-input-group">
                  <div className="submite-btn">
                    <button style={{ borderRadius: "0px" }} type="submit" onClick={() => { navigate.push(`/video/${MyCourse.CourseId}`) }}>start Learning</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </aside>}
    </>
  );
}

export default WidgetForm;
