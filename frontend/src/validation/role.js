import * as yup from "yup";

const roleSchema = yup.object().shape({
    name: yup.string().required('Name is required')
});

export default roleSchema;