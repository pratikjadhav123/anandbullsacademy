import axios from '../plugins/axios'
import notice from '../plugins/notice';

const users = {
    list() {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get('Users/GetUsers')
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    update(id, data) {
        return new Promise((resolve, reject) => {
            axios
                .update('Users/UpdateUser', id, data)
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
                .delete('Users/DeleteUser', id)
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
export default users;