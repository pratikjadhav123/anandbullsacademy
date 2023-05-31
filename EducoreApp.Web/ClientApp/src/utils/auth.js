import axios from '../plugins/axios'
import notice from '../plugins/notice';
// import notistack from '../../plugin/notistack';
// import notistack from '../plugin/notistack';
const ID_TOKEN_KEY = 'tokens';

const auth = {
    login(data) {
        return new Promise((resolve, reject) => {
            axios
                .post('Auth/Login', data)
                .then(({ data }) => {
                    this.saveToken(data.Token);
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    getUser() {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .post('Auth/UserDetails')
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    this.destroyToken();
                    reject(response);
                });
        });
    },
    logout() {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .post('Auth/Logout')
                .then(({ data }) => {
                    this.destroyToken();
                    resolve(data);
                })
                .catch(({ response }) => {
                    this.destroyToken();
                    reject(response);
                });
        });
    },
    forgotPassword(data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            axios
                .post(`Auth/ForgotPassword?Email=${data.Email}`, data)
                .then(({ data }) => {
                    // notistack.success(data.message);
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    resetPassword(data) {
        return new Promise((resolve, reject) => {
            axios
                .post('Auth/ResetPassword', data)
                .then(({ data }) => {
                    // notistack.success(data.message);
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    resend() {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .get('resend')
                .then(({ data }) => {
                    // notistack.success(data.message);
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    verify(data) {
        return new Promise((resolve, reject) => {
            axios
                .post('Auth/ConfirmEmail', data)
                .then(({ data }) => {
                    // notistack.success(data.message);
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    profile(data) {
        // const formData = new FormData();
        // formData.append("FirstName",data.FirstName)
        // formData.append("LastName",data.LastName)
        // formData.append("Email ",data.Email )
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .post('Auth/UpdateProfile', data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                });
        });
    },
    changePassword(data) {
        return new Promise((resolve, reject) => {
            axios.setToken();
            axios
                .post('Auth/ChangePassword', data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(({ response }) => {
                    reject(response);
                    notice.apiError(response)
                });
        });
    },
    getToken() {
        return window.localStorage.getItem(ID_TOKEN_KEY);
    },
    saveToken(token) {
        window.localStorage.setItem(ID_TOKEN_KEY, token);
    },
    destroyToken() {
        window.localStorage.removeItem(ID_TOKEN_KEY);
    },
};
export default auth;