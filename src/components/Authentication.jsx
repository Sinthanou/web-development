import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1"

function Authentication() {
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

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await axios.post(`${API_URL}/users/login`, loginData)
            if (res.data.status === 'success') {
                const token = res.data.token
                localStorage.setItem('token', token)
                fetchRests()
                setActiveTap("")
                navigate("/Day8")
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
                fetchRests()
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
            </div>
        </>
    )
}

export default Authentication
