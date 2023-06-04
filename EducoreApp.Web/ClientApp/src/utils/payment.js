import axios from '../plugins/axios'
import notice from '../plugins/notice';

const payment = {
    getCourse() {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get('Payment/GetPurchasedCourses')
                .then(({ data }) => {
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