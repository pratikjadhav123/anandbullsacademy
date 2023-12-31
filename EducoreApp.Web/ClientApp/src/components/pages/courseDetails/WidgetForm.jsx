import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import notice from "../../../plugins/notice";
// import payment from "../../../utils/payment";

function WidgetForm({ courseDetail, user, MyCourse, getCourseDetail, coupon, setCoupon }) {
  const navigate = useHistory();
  // const [applycoupon, setApplycoupon] = useState()
  // const loadScript = (src) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement('script')
  //     script.src = src
  //     script.onload = () => {
  //       resolve(true)
  //     }

  //     script.onerror = () => {
  //       resolve(false)
  //     }

  //     document.body.appendChild(script)
  //   })
  // }
  // const assignProject = (paymentId) => {
  //   const formData = new FormData();
  //   formData.append("CourseId", courseDetail.CourseId)
  //   formData.append("PaymentId", paymentId)
  //   formData.append("Coupon", applycoupon ? applycoupon : '')
  //   payment.purchaseCourse(formData).then((data) => {
  //     navigate.push("/myProfile")
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // }

  // const displayRazorpay = async () => {
  //   const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

  //   if (!res) {
  //     alert('script faild')
  //     return
  //   }

  //   var options = {
  //     key: "rzp_test_n9RwaKTC23Vqz2",
  //     currency: "INR",
  //     amount: (courseDetail.Price + (0.02 * courseDetail.Price)) * 100,
  //     name: "Anand bulls trading acadamy",
  //     description: "for testing purpose",
  //     image: "",
  //     handler: async (response) => {
  //       try {
  //         const paymentId = response.razorpay_payment_id;
  //         if (paymentId) {
  //           assignProject(paymentId);
  //         } else {
  //           notice.error("Payment faild please contact your bank if debited from account")
  //         }
  //       } catch (err) {
  //         console.log("err", err);
  //       }
  //     },
  //     prefill: {
  //       name: user.FirstName,
  //       email: user.Email,
  //       contact: user.Mobile
  //     },
  //     capture: true, // Capture the payment immediately after authorization
  //   };
  //   var pay = new window.Razorpay(options);
  //   pay.open();
  // }
  // const checkout = () => {
  //   if (!user) {
  //     notice.warning("please Sign in before buying course.Thank You..! ")
  //     navigate.push("/auth/Login")
  //   } else {
  //     displayRazorpay()
  //   }
  // }
  // const applyCoupon = () => {
  //   if (!user) {
  //     notice.warning("Please Sign in to check Validity of COUPON")
  //   } else {
  //     getCourseDetail();
  //     setApplycoupon(coupon)
  //   }
  // }
  return (
    <>
      {!MyCourse ? <aside className="package-widget-style-2 widget-search widget-form mt-5">
        <div className="widget-title text-center ">
          <span className="widget-lavel">
            Make Payment Of <h4>₹{courseDetail.Price} /-</h4>
          </span>
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
                    <button style={{ borderRadius: "0px" }} type="submit" onClick={() => { navigate.push(`/video/${MyCourse.CourseId}`) }}>Start Learning</button>
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
