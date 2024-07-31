import * as yup from "yup";

const permissionSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    key: yup.string().required('Key is required'),
});

export default permissionSchema;