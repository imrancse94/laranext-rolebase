import * as yup from "yup";

const usergroupSchema = yup.object().shape({
    name: yup.string().required('Name is required')
});

export default usergroupSchema;