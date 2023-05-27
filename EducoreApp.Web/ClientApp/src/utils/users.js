import axios from '../plugins/axios'

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
                    this.destroyToken();
                    reject(response);
                });
        });
    },
    create(data) {
        return new Promise((resolve, reject) => {
            axios
                .post('Users/SaveUser', data)
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
export default users;