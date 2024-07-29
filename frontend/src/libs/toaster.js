import { toast } from 'react-toastify';


export default function toaster(type,message){
    if(type == 'success'){
        return toast.success(message);
    }else if(type == 'error'){
        return toast.error(message)
    }
}