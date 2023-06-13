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
    get(id) {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get(`Payment/SelectCourse?CourseId=${id}`)
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
                .post(`Payment/ApplyDiscount?Discounut=${parseInt(data.Discounut)}&Users=${data.Users}`, data)
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