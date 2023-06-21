import React, { useState } from "react";
import { Button, Card, Dropdown, Table } from 'react-bootstrap';
import useValidator from "../../../plugins/validator";
import notice from "../../../plugins/notice";
import coupon from "../../../utils/coupon";
const resete = {
    CouponId: "",
    Amount: ""
}
function CourseSettingWrapperArea({ couponList, getCouponList }) {
    console.log("couponList", couponList);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(resete);
    const [validator, showMessage] = useValidator();
    const error = {
        CouponId: validator.message(('CouponId'), data.CouponId, "required"),
        Amount: validator.message(('Amount'), data.Amount, "required|integer"),
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        handleSetData(name, value)
    }
    const handleSetData = (name, value) => {
        setData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator              
                [name]: value
            }
        })
    }
    const handleSubmit = () => {
        if (validator.allValid()) {
            coupon.update(data.CouponId, data).then((data) => {
                setData(resete)
                setOpen(false)
                getCouponList()
                notice.success("Coupon Updated SuccessFully")
            })
        } else {
            showMessage(true)
        }
    }
    // const alertConfirm = (CourseId) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.value) {
    //             coupon.delete(CourseId).then(() => {
    //                 getCouponList();
    //                 Swal.fire('Deleted', 'Course has been deleted.', 'success')
    //             });
    //         } else {
    //             Swal.fire('Cancelled', 'Course is still intact', 'info')
    //         }
    //     })
    // };
    return (
        <>
            <div className="package-details-wrapper pt-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 p-5">
                            <div className="tour-package-details">

                                {!open ? <div className="comment-form">
                                    <Card.Body>
                                        <Card.Title><h4>All Course List </h4></Card.Title>
                                        <Table responsive striped className="small">
                                            <thead>
                                                <tr style={{ textAlign: "center" }}>
                                                    <th>CourseId</th>
                                                    <th>Title</th>
                                                    <th>Amount</th>
                                                    <th>Update</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {couponList.length ? couponList.map((item, index) => <tr key={index} style={{ textAlign: "center" }} >
                                                    {console.log(item)}
                                                    <td>{item.CourseId}</td>
                                                    <td>{item.Title}</td>
                                                    <td>₹ {item.Amount}</td>
                                                    <td><Button variant="light" onClick={() => { setOpen(true); setData(item) }}>Edit Course</Button></td>
                                                </tr>) : <h2> Add new coupon</h2>}
                                            </tbody>
                                        </Table>
                                        {/* <Button variant="primary" onClick={() => { setOpen(true); setData(resete) }}>update coupon</Button> */}
                                    </Card.Body>
                                </div>
                                    :
                                    <form
                                        onSubmit={(e) => e.preventDefault()}
                                        id="comment_form"
                                        method="post"
                                    >
                                        <div className="comment-form">
                                            <h4>Update Coupon</h4>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="custom-input-group">
                                                        <input
                                                            type="text"
                                                            placeholder="Coupen Amount "
                                                            id="Amount"
                                                            name="Amount"
                                                            value={data.Amount}
                                                            onChange={handleChange}
                                                        />
                                                        {error?.Amount &&
                                                            <span className='error' style={{ color: "red" }}> {error?.Amount}</span>}

                                                    </div>
                                                </div>
                                            </div>


                                            <div className="custom-input-group d-flex justify-content-center">
                                                <div className="submite-btn ">
                                                    <button type="submit" onClick={() => setOpen(false)}> Back
                                                    </button>
                                                </div>
                                                <div className="submite-btn">
                                                    <button type="submit" onClick={handleSubmit}> Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseSettingWrapperArea;
