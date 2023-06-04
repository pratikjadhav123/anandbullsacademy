import { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import 'simple-react-validator/dist/locale/fr';

const useValidator = (customMessage = {}, customValidator = {}) => {
    const [show, setShow] = useState(false);
    const validators = {
        password: {
            message: 'Please Enter Valid Password for Ex. [Example@123]',
            rule: (val, params, validator) => {
                return validator.helpers.testRegex(
                    val, '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
                ) && params.indexOf(val) === -1;
            }
        },
    };
    const validator = new SimpleReactValidator({
        element: (message) => message,
        messages: customMessage,
        validators: { ...validators, ...customValidator },
    });

    if (show) {
        validator.showMessages();
    }

    return [validator, setShow];
};
export default useValidator;