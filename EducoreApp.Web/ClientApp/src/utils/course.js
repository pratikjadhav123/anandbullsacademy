import axios from '../plugins/axios'
import notice from '../plugins/notice';

const course = {
    list() {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get('Course/GetCourse')
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
                .get(`Course/GetCourse/${id}`)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);
                });
        });
    },
    getCourse() {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get('Course/GetPurchasedCourses')
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);
                });
        });
    },
    getCourseVideo(id) {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get(`Course/GetCourseVideos?CourseId=${id}`)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);
                });
        });
    },
    create(data) {
        return new Promise((resolve, reject) => {
            axios
                .post('Course/SaveCourse', data)
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
    update(id,data) {
        return new Promise((resolve, reject) => {
            axios
                .update('Course/UpdateCourse',id, data)
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
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete('Course/DeleteCourse', id)
                .then(({ data }) => {
                    // notistack.success(data.message);
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    }
};
export default course;