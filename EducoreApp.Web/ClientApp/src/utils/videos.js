import axios from '../plugins/axios'
import notice from '../plugins/notice';

const videos = {
    list() {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get('Videos/GetVideos')
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);
                });
        });
    },
    getLink(id) {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get(`Videos/GetLink/${id}`)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    get(id) {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get(`Videos/GetVideosByCourse/${id}`)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    create(data) {
        let formData = new FormData();
        return new Promise((resolve, reject) => {
            axios
                .post(`Videos/SaveVideos?CourseId=${data.CourseId}&folderId=${data.folderId}`, formData)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.error(response.data.message);

                });
        });
    },
    update(id, data) {
        return new Promise((resolve, reject) => {
            axios
                .update('Videos/UpdateVideos', id, data)
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
                .delete('Videos/DeleteVideos', id)
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
export default videos;