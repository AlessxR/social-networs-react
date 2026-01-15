import * as yup from "yup";

export const schema = yup.object().shape({
     email: yup.string().trim().required('Email is required').email().min(6, 'Email is not valid'),
     password: yup.string().trim().required('Password is required'),
});