
import { toast } from 'react-toastify';

export default {
    apiError(error) {
        console.log("apierror",error);
        let text = null;
        if (error.status === 422) {
            for (const key in error.data.errors) {
                for (const keys in error.data.errors[key]) {
                    this.error(error.data.errors[key][keys]);
                }
            }
        } else if (error.status === 404) {
            text = error.data.message;
        } else if (error.status === 405) {
            text = "Erreur 405 : Méthode non autorisée !";
        } else if (error.status === 500) {
            text = "Erreur 500 : Erreur Serveur !";
        } else if (error.status === 403 || error.status === 401) {
            text = error.data.message;
        } else if (error.status === 400) {
            text = error.data.message;
        } else if (error.status === 307) {
            this.info(error.data.message);
        }
        if (text) {
            this.error(text);
        }
    },
    success(msg) {
        toast.success(msg);
    },
    warning(msg) {
        toast.warn(msg);
    },
    info(msg) {
        toast.info(msg);
    },
    error(msg) {
        toast.error(msg);
    }
};
