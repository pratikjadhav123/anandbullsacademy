import axios from '../plugins/axios'

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
                    this.destroyToken();
                    reject(response);
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
                });
        });
    },
 
};
export default course;