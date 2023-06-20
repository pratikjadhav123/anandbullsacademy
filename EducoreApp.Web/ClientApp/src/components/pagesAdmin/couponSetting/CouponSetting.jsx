import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading";
import CourseSettingWrapperArea from "./CouponSettingWrapperArea";
import coupon from "../../../utils/coupon";

function CouponSetting() {
    const [couponList, setCouponList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getCouponList();
    }, []);
    const getCouponList = () => {
        coupon.list().then((data) => {
            setLoading(false)
            setCouponList(data);
        }).catch((error)=>{
            console.log(error);
        })
    }
    return (
        <>
            {loading ? <Loading /> :
                <CourseSettingWrapperArea couponList={couponList} getCouponList={getCouponList} />}
        </>
    );
}

export default CouponSetting;
