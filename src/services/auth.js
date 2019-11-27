import {validateAll} from "indicative/validator";
import Axios from "axios";
import config from "../config";

export default class AuthService {

    async registeredUser(data) {

        const rules = {
            Username: 'required|string',
            email: 'required|email',
            password: 'required|min:4|confirmed'
        };
        const messages = {
            required: "Empty {{field}} are not allowed",
            email: "please enter valid email address",
            range: "password must be in range of min 4 to max 8",
            'email.email': 'Email is invalid',
            'password.confirmed': 'password doesnt match'
        };

        try {
            await validateAll(data, rules, messages);

            const response = await Axios.post(`${config.apiUrl}/auth/register`, {
                name: data.Username,
                email: data.email,
                password: data.password
            });

            return response.data.data


        } catch (errors) {
            const formattedErrors = {};
            if (errors.response && errors.response.status === 422) {
                formattedErrors['email'] = errors.response.data['email'][0];
                return Promise.reject(formattedErrors)
            }
            errors.forEach(error => formattedErrors[error.field] = error.message);
            return Promise.reject(formattedErrors)

        }

    }

    async loginUser(data) {

        const rules = {
            email: 'required|email',
            password: 'required|string'
        };
        const messages = {
            required: "Empty {{field}} are not allowed",
            'email.email': 'Email is invalid',

        };

        try {
            await validateAll(data, rules, messages);

            const response = await Axios.post(`${config.apiUrl}/auth/login`, {
                email: data.email,
                password: data.password
            });

            return response.data.data;


        } catch (errors) {

            const formattedErrors = {};

            if (errors.response && errors.response.status === 401) {
                formattedErrors['email'] = "Invalid Credentials";
                return Promise.reject(formattedErrors);
            }
            errors.forEach((errors) => {
                formattedErrors[errors.field] = errors.message
            });
            return Promise.reject(formattedErrors);

        }

    }
}