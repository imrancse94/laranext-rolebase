import Swal from 'sweetalert2'

const swal = (type, message) => {

    switch (type) {
        case 'delete':
            return Swal.fire({
                title: "Are you sure?",
                text: message,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
    }
}


export default swal;