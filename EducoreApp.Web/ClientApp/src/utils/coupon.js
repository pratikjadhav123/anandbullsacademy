import axios from '../plugins/axios'
import notice from '../plugins/notice';

const coupon = {
    list() {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get('Coupon/GetCoupons')
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);

                });
        });
    },
    get(id) {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get(`Coupon/GetCoupons/${id}`)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);
                });
        });
    },
    GetAmountByCoupon(data) {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get(`Coupon/GetAmountByCoupon?Coupon=${data?.Coupon}&CourseId=${data.CourseId}`)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);
                });
        });
    },
    update(id,data) {
        const formdata = new FormData();
        return new Promise((resolve, reject) => {
            axios
                .update('Coupon/UpdateCoupon',`${id}?Amount=${data.Amount}`, formdata)
                .then(({ data }) => {
                    // notistack.success(data.message);
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);
                });
        });
    }
};
export default coupon;