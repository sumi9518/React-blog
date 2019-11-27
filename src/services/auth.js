import {validate} from "indicative/validator";
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
            await validate(data, rules, messages)

                const response = await Axios.post(`${config.apiUrl}/auth/register`, {
                    name: data.Username,
                    email: data.email,
                    password: data.password
                })

                return response.data.data


        } catch (errors) {
            console.log(errors.response);
            const formattederrors = {}

            if (errors.response && errors.response.status === 422) {
                formattederrors['email'] = errors.response.data['email'][0];
                return Promise.reject(formattederrors)
            }
            errors.forEach(error => formattederrors[error.field] = error.message)
            return Promise.reject(formattederrors)

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
        await validate(data, rules, messages)

        const response = await Axios.post(`${config.apiUrl}/auth/login`, {
            email: data.email,
            password: data.password
        })

        return response.data.data


    } catch (errors) {
        console.log(errors.response);
        const formattederrors = {}

        if (errors.response && errors.response.status === 401) {
            formattederrors['email'] = "Invalid Credentials";
            return Promise.reject(formattederrors)
        }
        errors.forEach((errors) => {
            formattederrors[errors.field] = errors.message
        });
        return Promise.reject(formattederrors)

    }

}
}