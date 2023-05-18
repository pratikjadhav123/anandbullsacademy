import React from "react";

function WidgetForm() {

  return (
    <>
      <aside className="package-widget-style-2 widget-form">
        <div className="widget-title text-center d-flex justify-content-between">
          <h4>Join This Course</h4>
          <h3 className="widget-lavel">
            ₹888.00
          </h3>
        </div>
        <div className="widget-body">
          <form
            onSubmit={(e) => e.preventDefault()}
            action="#"
            method="post"
            id="booking-form"
          >
            <div className="booking-form-wrapper">
              <div className="custom-input-group">
                <input type="text" placeholder="Your Full Name" id="name" />
              </div>
              <div className="custom-input-group">
                <input type="email" placeholder="Your Email" id="email" />
              </div>
              <div className="custom-input-group">
                <input type="tel" placeholder="Phone" id="phone" />
              </div>
              <div className="custom-input-group">
                {/* <DatePicker
                              selected={startDate}
                              onChange={(date) =>
                                this.changeDatepickerHandeller(date)
                              }
                              className="input-field check-in"
                              placeholder="dd-mm-yy"
                            /> */}
              </div>
              <div className="custom-input-group">
                <textarea
                  cols={20}
                  rows={7}
                  placeholder="Your message"
                  defaultValue={""}
                />
              </div>
              <div className="custom-input-group">
                <div className="submite-btn">
                  <button type="submit">join Now</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}

export default WidgetForm;
