import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1"

function EditPost() {
  const [editPost, setEditPost] = useState('')
  const [postDetail, setPostDetail] = useState(null)
  const navigate = useNavigate()
  const {id} = useParams()
  
  const fetchPosts = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get(`${API_URL}/posts/${id}`, { headers: { Authorization: `Bearer ${token}` }})
      setPostDetail(res.data.data.post)
      setEditPost(res.data.data.post.content)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "failed to fetch posts",
        text: "error",
      })
    }
  }
  
  useEffect(() => {
    fetchPosts()
  }, [])
  
  const handleEdit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      await axios.patch(`${API_URL}/posts/${id}`, { content: editPost }, { headers: { Authorization: `Bearer ${token}` } })
      Swal.fire({
        icon: "success",
        title: "Post update successfully",
        text: "success",
      })
      navigate('/')
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "failed to fetch posts",
        text: "error",
      })
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="text-center">
          <p className='text-2xl font-bold py-5'>Edit Post ID: {id}</p>
          <p>Writer: {postDetail?.author?.first_name} {postDetail?.author?.surname}</p>
          <div className="">
            <form action="" onSubmit={handleEdit} className='flex flex-col items-center gap-5'>
              <textarea name="" id="" className='border border-gray-500 w-[250px]' value={editPost} onChange={(e) => setEditPost(e.target.value)}></textarea>
              <div className="flex gap-5">
                  <button className='button-fill' onClick={() => navigate("/")}>back</button>
                  <button className='button-fill' type='submit'>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPost
