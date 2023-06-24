import axios from '../plugins/axios'
import notice from '../plugins/notice';

const payment = {
    get(data) {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .post(`Payment/SelectCourse`, data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);
                });
        });
    },
    applyDiscount(data) {
        return new Promise((resolve, reject) => {
            axios
                .post(`Payment/ApplyDiscount?Users=${data.Users}`, data)
                .then(({ data }) => {
                    // notistack.success(data.message);
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);
                });
        });

    },
    purchaseCourse(data) {
        return new Promise((resolve, reject) => {
            axios
                .post('Payment/PurchaseCourse', data)
                .then(({ data }) => {
                    // notistack.success(data.message);
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);
                });
        });
    },


};
export default payment;