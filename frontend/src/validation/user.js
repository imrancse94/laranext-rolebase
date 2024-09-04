import * as yup from "yup";

const createUserSchema = yup.object().shape({
    usergroup_id:yup.array().min(1, 'Please select at least one usergroup').required('Usergroup Id is required'),
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Passwrod is required').min(6).max(32).required('Passwrod is required'),
    password_confirmation: yup.string().required('Confirm Passwrod required').oneOf([yup.ref('password'), null], 'Passwords must match')
});

const updateUserSchema = yup.object().shape({
    usergroup_id:yup.number().required('Usergroup Id is required'),
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().nullable().min(6).max(32),
});

export default {
    createUserSchema,
    updateUserSchema
};