import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1"

function Profile() {
  const [profileData, setProfileData] = useState({})

  const fetchProfileDate = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get(`${API_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } })
      setProfileData(res.data.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProfileDate()
  }, [])

  return (
    <>
      <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white grid grid-cols-3 h-[600px] rounded-md">
          <div className="bg-blue-500 py-5 px-7 rounded-tl-md rounded-bl-md flex flex-col justify-between">
            <div className="text-center">
              <img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" alt="" className='w-[150px] h-[150px] mb-3 border-2 border-black rounded-full' />
              <p className='text-white font-bold text-lg'>{profileData.first_name} {profileData.surname}</p>
            </div>
            <div className="">
              <button className='button-fill bg-white text-blue-500 flex items-center gap-2 hover:bg-white'>
                <p>&#10094;</p>
                <Link to={"/"}>
                  <p>Back</p>
                </Link>
              </button>
            </div>
          </div>
          <div className="col-span-2 pt-5 pl-5 pr-10 w-[400px]">
            <div className="*:mb-3">
              <div className="">
                <p className='font-bold text-blue-500'>Role</p>
                <div className="border-b-2 border-gray-200"><p>{profileData.role}</p></div>
              </div>
              <div className="">
                <p className='font-bold text-blue-500'>Email</p>
                <div className="border-b-2 border-gray-200"><p>{profileData.email}</p></div>
              </div>
              <div className="">
                <p className='font-bold text-blue-500'>Phone_number</p>
                <div className="border-b-2 border-gray-200"><p>{profileData.phone_number}</p></div>
              </div>
              <div className="">
                <p className='font-bold text-blue-500'>ID</p>
                <div className="border-b-2 border-gray-200"><p>{profileData._id}</p></div>
              </div>
            </div>
            <div className="">
              <p className='text-2xl font-bold text-blue-500'>DeTails</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat perspiciatis adipisci dolorem reprehenderit veritatis ratione accusantium, at ab, vel cumque tempora voluptate quibusdam aliquid inventore illum! Dolore, quia rem!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
