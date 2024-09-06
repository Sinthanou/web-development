import React, { useState } from 'react';

const LoginForm = ({ isDarkMode, onSubmit }) => {
    const [profileImage, setProfileImage] = useState("")
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [errorText, setErrorText] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((inputData) => ({
            ...inputData, [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.username === "admin" && formData.password === "59769452") {
            onSubmit(formData)
            setErrorText("")
        } else {
            setErrorText("your username or password is incorrect")
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    console.log(formData)

    return (
        <>
            <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} shadow-md py-5 px-10 w-[500px] rounded-lg transition-all`}>
                <h1 className='text-3xl font-bold text-center text-blue-500'>Login</h1>
                <form action="" onSubmit={handleSubmit} className='*:mb-3'>
                    {profileImage && (
                        <div className="flex justify-center mt-5">
                            <img src={profileImage} alt="" className='w-[100px] h-[100px] rounded-full border border-black' />
                        </div>
                    )}
                    <p>Profile Picture</p>
                    <input onChange={handleImageUpload} type="file" accept='image/*' />
                    <div className="">
                        <p>Username</p>
                        <input type="text" name='username' value={formData.username} onChange={handleChange} className='input-style' placeholder='Username...' />
                    </div>
                    <div className="">
                        <p>Password</p>
                        <input type="password" name='password' value={formData.password} onChange={handleChange} className='input-style' placeholder='Password...' />
                    </div>
                    {errorText && (
                        <div className="text-red-500">
                            <p>{errorText}</p>
                        </div>
                    )}
                    <div className="text-center mt-10">
                        <button onClick={handleSubmit} className="button-fill">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

const SignUpForm = ({ isDarkMode }) => {
    const [profileImage, setProfileImage] = useState("")

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <>
            <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} shadow-md py-5 px-10 w-[500px] rounded-lg transition-all`}>
                <h1 className='text-3xl font-bold text-center text-blue-500'>Sign Up</h1>
                <form action="" className='*:mb-3'>
                    {profileImage && (
                        <div className="flex justify-center mt-5">
                            <img src={profileImage} alt="" className='w-[100px] h-[100px] rounded-full border border-black' />
                        </div>
                    )}
                    <p>Profile Picture</p>
                    <input onChange={handleImageUpload} type="file" accept='image/*' />
                    <div className="">
                        <p>Email</p>
                        <input type="email" name='username' className='input-style' placeholder='Username...' />
                    </div>
                    <div className="">
                        <p>Username</p>
                        <input type="text" name='username' className='input-style' placeholder='Username...' />
                    </div>
                    <div className="">
                        <p>Password</p>
                        <input type="password" name='password' className='input-style' placeholder='Password...' />
                    </div>
                    <div className="text-center mt-10">
                        <button className="button-fill">Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    )
}

const Day4 = () => {

    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [isAlert, setIAlert] = useState(false)
    const [userData, setUserData] = useState(null)

    const handleLogin = (Data) => {
        setIAlert(true)
        setUserData(Data)
    }

    const handleLogout = () => {
        setIAlert(false)
        setUserData(null)
    }

    return (
        <>
            <div className="flex items-center justify-between px-52">
                <div className="flex gap-5">
                    <button onClick={() => setIsLogin(false)} className={`${isLogin ? "bg-slate-300 text-black" : "bg-blue-500 text-white"} button-fill hover:bg-blue-500 hover:text-white`}>Login</button>
                    <button onClick={() => setIsLogin(true)} className={`${isLogin ? "bg-blue-500 text-white" : "bg-slate-300 text-black"} button-fill hover:bg-blue-500 hover:text-white`}>Sign Up</button>
                </div>
                <div className="pb-5">
                    <div className="">
                        <button onClick={() => { setIsDarkMode(!isDarkMode) }} className={`${isDarkMode ? "text-black border border-black bg-white" : "text-white bg-black"} p-3 rounded-md active:scale-90 transition-all`}>{`${isDarkMode ? "Light Mode" : "Dark Mode"}`}</button>
                    </div>
                </div>
            </div>
            <div className={`${isDarkMode ? "bg-gray-600" : "bg-blue-50"} flex flex-col gap-5 justify-center transition-all items-center h-screen`}>
                {isAlert ? (
                    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} w-[500px] shadow-md flex justify-center rounded-md py-5`}>
                        <div className="text-center">
                            <p className='text-3xl font-bold mb-5'>Welcome</p>
                            <button onClick={handleLogout} className='button-fill'>Logout</button>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        {isLogin ? <SignUpForm isDarkMode={isDarkMode} /> : <LoginForm isDarkMode={isDarkMode} onSubmit={handleLogin} />}
                    </div>
                )}
            </div>
        </>
    );
}

export default Day4;
