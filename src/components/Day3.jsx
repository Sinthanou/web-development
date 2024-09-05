import React, { useState } from "react"
import Swal from 'sweetalert2'

//form Component
const Form = ({ onSubmit }) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        massage: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((inputData) => ({
            ...inputData, [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.firstName &&
            formData.lastName &&
            formData.email &&
            formData.dateOfBirth &&
            formData.gender &&
            formData.massage !== "") {

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, saved it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "Saved!",
                        text: "Your file has been saved.",
                        icon: "success"
                    });
                    onSubmit(formData)
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        dateOfBirth: "",
                        gender: "",
                        massage: ""
                    })
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your imaginary file is safe :)",
                        icon: "error"
                    });
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Pleasr Enter The Infomation!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }

    return (
        <>
            <div className="bg-slate-200 py-5 px-5 rounded-md w-[500px]">
                <form action="" onSubmit={handleSubmit} className="*:mb-3">
                    <div className="*:mb-3 *:w-full">
                        <p>First Name</p>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input-style" placeholder="First Name..." />
                        <p>Last Name</p>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input-style" placeholder="Last Name..." />
                        <p>Email</p>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-style" placeholder="Enter your email..." />
                        <p>Birth Day</p>
                        <input type="date" value={formData.dateOfBirth} onChange={handleChange} name="dateOfBirth" id="" />
                    </div>
                    <select name="gender" value={formData.gender} onChange={handleChange} id="">
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other...</option>
                    </select>
                    <br />
                    <textarea name="massage" id="" value={formData.massage} onChange={handleChange} className="border border-black w-full" placeholder="Massage..."></textarea>
                    <br />
                    <div className="text-center">
                        <button className="button-fill">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

const Day3 = () => {

    const [submition, setSubmition] = useState([])
    const handleSubmit = (formData) => {
        setSubmition([...submition, formData])

    }

    return (
        <>
            <div className="flex justify-center">
                <Form onSubmit={handleSubmit} />
            </div>
            <div className="w-full flex flex-col items-center p-20 *:mb-5">
                <h1 className="text-2xl font-bold">User Info</h1>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Birth Day</td>
                            <td>Gender</td>
                            <td>Massage</td>
                        </tr>
                    </thead>
                    <tbody>
                        {submition.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.dateOfBirth}</td>
                                <td>{user.gender}</td>
                                <td>{user.massage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Day3