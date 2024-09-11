import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1"

function Day7() {
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

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await axios.post(`${API_URL}/users/login`, loginData)
            if (res.data.status === 'success') {
                const token = res.data.token
                localStorage.setItem('token', token)
                setUser(res.data.data.user)
                fetchRests(token)
                setActiveTap("")
                Swal.fire({
                    icon: "success",
                    title: "Login Success",
                    text: `Welcome, ${res.data.data.user.first_name} ${res.data.data.user.surname} `
                })
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login fail",
                text: "Please Try again"
            })
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await axios.post(`${API_URL}/users/signup`, signUpData)
            if (res.data.status === 'success') {
                const token = res.data.data.token
                localStorage.setItem('token', token)
                setUser(res.data.data.user)
                fetchRests(token)
                Swal.fire({
                    icon: "success",
                    title: "SignUp Success",
                    text: `Welcome, ${res.data.data.user.first_name} ${res.data.data.user.surname} `
                })
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "SignUp fail",
                text: "Please Try again"
            })
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchRests = async (token) => {
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
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if(!token) {
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
            fetchRests(token)
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

    return (
        <>
            {activeTap === "" ? (
                null
            ) : (
                <div className="flex justify-center py-3 gap-5">
                    <div className=""></div>
                    <div>
                        <button className={activeTap === "login" ? "button-fill" : "button-stroke"} onClick={() => setActiveTap("login")}>Login</button>
                    </div>

                    <div>
                        <button className={activeTap === "signup" ? "button-fill" : "button-stroke"} onClick={() => setActiveTap("signup")}>SignUp</button>
                    </div>
                </div>
            )}
            <div className="flex justify-center">
                <div className="text-center">
                    <h1 className='text-2xl font-bold my-5'>Day7 Login and Posts</h1>
                    {/* {isLoading && <div>Loading...</div>} */}

                    {activeTap === "login" &&
                        <form action="" className='flex flex-col items-center w-[350px] gap-5' onSubmit={handleLogin}>
                            <input className='input-style' type="email" name="" id="" placeholder='Email...' value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                            <input className='input-style' type="password" name="" id="" placeholder='Password...' value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                            <button className='button-fill px-7' type='submit' disabled={isLoading} >
                                {isLoading ? (
                                    <p>loading...</p>
                                ) : (
                                    <p>Login</p>
                                )}
                            </button>
                        </form>}
                    {activeTap === "signup" && (
                        <form action="" className='flex flex-col items-center w-[350px] gap-5' onSubmit={handleSignUp}>
                            <input className='input-style' type="text" name="" id="" placeholder='firstname...' onChange={(e) => setSignUpData({ ...signUpData, first_name: e.target.value })} />
                            <input className='input-style' type="text" name="" id="" placeholder='surname...' onChange={(e) => setSignUpData({ ...signUpData, surname: e.target.value })} />
                            <input className='input-style' type="email" name="" id="" placeholder='email...' onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} />
                            <input className='input-style' type="tel" name="" id="" placeholder='phone number...' onChange={(e) => setSignUpData({ ...signUpData, phone_number: e.target.value })} />
                            <input className='input-style' type="password" name="" id="" placeholder='password...' onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} />
                            <button className='button-fill px-7' type='submit' disabled={isLoading} >
                                {isLoading ? (
                                    <p>loading...</p>
                                ) : (
                                    <p>SignUp</p>
                                )}
                            </button>
                        </form>
                    )}

                    {activeTap === "" && (
                        <form action="" className='text-center' onSubmit={handlePostSubmit}>
                            <input className='input-style mb-5' type="text" name="" id="" value={newPost} onChange={(e) => setNewPost(e.target.value)} />
                            <button className='button-stroke' type='submit' >
                            {isLoading ? (
                                    <p>loading...</p>
                                ) : (
                                    <p>Post</p>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-center gap-5">
                <div className="w-[600px] flex items-center justify-between">
                    <div className="">
                        <h2>Hello, {user.first_name}</h2>
                        <p>Email: {user.email}</p>
                        <p>Phone Number: {user.phone_number}</p>
                        <p>role: {user.role}</p>
                    </div>
                    <button className='button-fill' onClick={handleLogOut}>Logout</button>
                </div>
                <h2 className='text-center text-xl font-bold'>Posts</h2>
                {isPostsLoading ? (
                    <div className="flex justify-center py-10"><p>Loading...</p></div>
                ) : (
                    <ul className='flex flex-col items-left gap-3'>
                        {posts.map((post, index) => (
                            <li key={index} className='bg-gray-300 rounded-md px-4 py-8 w-[600px]'>
                                <p>post by: {post.author.first_name}</p>
                                <p>{post.content}</p>
                                <p>Like: {post.likes ? post.likes.length : 0}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default Day7
