import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";


const API_URL = "https://sample-api-fwbm.onrender.com/api/v1"

function Day8() {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState('')
    const [loginData, setLoginData] = useState({
        email: "mosii@gmail.com",
        password: "59769452"
    })
    const [signUpData, setSignUpData] = useState({
        first_name: "",
        surname: "",
        email: "",
        phone_number: "",
        password: ""
    })
    const [activeTap, setActiveTap] = useState('login')
    const [isLoading, setIsLoading] = useState(false)
    const [isPostsLoading, setIsPostsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchRests()
    }, [])

    const fetchRests = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            setPosts([])
            return
        }
        setIsPostsLoading(true)
        try {
            const res = await axios.get(`${API_URL}/posts`, { headers: { Authorization: `Bearer ${token}` } })
            setPosts(res.data.data.posts)
        } catch (error) {
            console.log(error)
            setPosts([])
        } finally {
            setIsPostsLoading(false)
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem('token')
        setUser({})
        setPosts([])
        setActiveTap("login")
        Swal.fire({
            icon: "success",
            title: "Logout success",
            text: "Thank you!"
        })
        navigate("/authentication")
    }

    function IconLike(props) {
        return (
            <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="2em"
                width="2em"
                {...props}
            >
                <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311h-.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z" />
            </svg>
        );
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Please login first!",
                text: "Please login to perform this action"
            })
            return
        }
        setIsLoading(true)
        try {
            await axios.post(`${API_URL}/posts`, { content: newPost }, { headers: { Authorization: `Bearer ${token}` } })
            setNewPost("")
            fetchRests()
            Swal.fire({
                icon: "success",
                title: "Create a new post successfully",
                text: "You have already posted"
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Cannot create a new post!",
                text: "something went worng, please try again later!"
            })
        } finally {
            setIsLoading(false)
        }

    }

    const formatDateTime = (isoString) => {
        // create Date object from IOS string
        const date = new Date(isoString)
        // set time to UTC + 7
        date.setHours(date.getHours() + 7)
        // fill zero number function
        const padZero = (num) => num.toString().padStart(2, "0")
        // fetch date info
        const day = padZero(date.getUTCDate())
        const month = padZero(date.getUTCMonth() + 1)
        const year = padZero(date.getUTCFullYear())
        // fetch time info
        let hours = date.getUTCHours()
        const minutes = padZero(date.getUTCMinutes())
        const amPm = hours >= 12 ? "AM" : "PM"
        // set 24hr to 12hr
        hours = hours % 12
        hours = hours ? hours : 12
        hours = padZero(hours)
        // create 
        return `${day}-${month}-${year} ${hours}:${minutes} ${amPm}`
    }

    const handleDelete = async (postID, index_) => {
        const token = localStorage.getItem("token")
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Please login first.",
                text: "Please login to delete post"
            })
            return
        }

        const result = await Swal.fire({
            icon: "question",
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#3b82f6",
            confirmButtonText: "Yes, delete it",
            cancelButtonColor: "#ef4444",
            cancelButtonText: "Cancel"
        })

        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/posts/${postID}`, { headers: { Authorization: `Bearer ${token}` } })
                Swal.fire({
                    icon: "success",
                    title: "Delete post successfully",
                    text: "success"
                })
                fetchRests()
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Delete post failed",
                    text: "Something went wrong"
                })
            }
        }
    }

    const handleLike = async (postId) => {
        const token = localStorage.getItem("token")
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Please login first.",
                text: "Please login to delete post"
            })
            return
        }

        try {
            const res = await axios.post(`${API_URL}/posts/${postId}/like`, {}, { headers: { Authorization: `Bearer ${token}` } })
            if (res.data.status === "success") {
                fetchRests()
                Swal.fire({
                    icon: "success",
                    title: "Liked",
                    text: "You already liked",
                    timer: 1500,
                    showCancelButton: false
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Something worng"
            })
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="text-center">
                        <div className="flex flex-col items-center gap-3">
                            <Link to={"/Profile"}>
                                <p className='text-7xl text-blue-500 hover:scale-110 transition-transform cursor-pointer'><CgProfile /></p>
                            </Link>
                            <p className='text-lg font-bold'>Profile</p>
                        </div>
                    <h1 className='text-2xl font-bold my-5'>Day8 Login, Posts, CRUD and Router</h1>
                        <form action="" className='flex flex-col items-center' onSubmit={handlePostSubmit}>
                            <input className='input-style mb-5 w-[300px]' type="text" name="" id="" value={newPost} onChange={(e) => setNewPost(e.target.value)} />
                            <button className='button-stroke' type='submit' >
                                {isLoading ? (
                                    <p>loading...</p>
                                ) : (
                                    <p>Post</p>
                                )}
                            </button>
                        </form>
                </div>
            </div>
                <div className="flex flex-col items-center gap-5">
                    <div className="w-[600px] flex items-center justify-between">
                        <button className='button-fill' onClick={handleLogOut}>Logout</button>
                    </div>
                    <h2 className='text-xl font-bold py-3'>Posts</h2>
                    {isPostsLoading ? (
                        <div className="flex justify-center py-10"><p>Loading...</p></div>
                    ) : (
                        <ul className='flex flex-col items-left gap-3'>
                            <div className="text-center">
                                <button className='button-fill' onClick={fetchRests}>Refresh</button>
                            </div>
                            {posts.map((post, index) => (
                                <li key={index} className='bg-gray-300 rounded-md px-4 py-5 w-[600px]'>
                                    <div className="flex justify-between">
                                        <p>post by: {post.author.first_name}</p>
                                        <p>Time: {formatDateTime(post.createdAt)}</p>
                                    </div>
                                    <p>{post.content}</p>
                                    <div className="flex items-center justify-between gap-3 mt-10">
                                        <div className="flex items-center gap-3">
                                            <IconLike onClick={() => handleLike(post._id, index)} />
                                            <p> {post.likes ? post.likes.length : 0}</p>
                                        </div>
                                        <div className="flex justify-end gap-3">
                                            <Link to={`/edit/${post._id}`}>
                                                <button className='button-fill py-1 px-3 bg-yellow-500 hover:bg-yellow-400'>Edit</button>
                                            </Link>
                                            <button className='button-fill py-1 px-3 bg-red-500 hover:bg-red-400' onClick={() => { handleDelete(post._id) }}>Delete</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
\        </>
    )
}

export default Day8
