import React, { useState } from 'react'

const SampleList = () => {
  const fruits = ["Mango", "Apple", "Banana", "Strawberry", "Pineapple"]

  return (
    <div className="flex justify-center">
      <div className="border border-black py-7 px-14 rounded-md">
        <h1 className='text-2xl font-bold'>Fruit Lists:</h1>
        <div className="flex justify-start">
          <ul>
            {fruits.map((fruit, index) => (
              <div key={index} className="flex items-center gap-2">
                <p className='font-bold'>{index + 1}.</p>
                <li>{fruit}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const ASEANCountries = () => {

  const countries = ["Brunei", "Cambodia", "Indonesia", "Laos", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Vietnam"]

  return (
    <>
      <div className="flex justify-center">
        <div className="border border-black py-7 px-14 rounded-md">
          <h1 className='text-2xl font-bold'>ASEANCountry Lists:</h1>
          <div className="flex justify-start">
            <ul>
              {countries.map((country, index) => (
                <div key={index} className="flex items-center gap-2">
                  <p className='font-bold'>{index + 1}.</p>
                  <li>{country}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

const StudentsList = () => {
  const students = [
    {
      name: "Somsanouk",
      class: "C1",
      gender: "Male"
    },
    {
      name: "Somwang",
      class: "A1",
      gender: "Male"
    },
    {
      name: "Somsee",
      class: "A1",
      gender: "Female"
    },
  ]

  const A1FemaleStudents = students.filter((student) => {
    return student.class === "A1" && student.gender === "Female"
  })

  return (
    <>
      <div className="flex justify-center">
        <div className="border border-black py-7 px-14 rounded-md">
          <h1 className='text-2xl font-bold'>Student Lists:</h1>
          <div className="flex justify-start">
            <ul>
              {A1FemaleStudents.map((student, index) => (
                <div key={index} className="flex items-center gap-2">
                  <p className='font-bold'>{index + 1}.</p>
                  <li>{student.name}, Class {student.class} Gender {student.gender}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

const TodoLists = () => {

  const [newTodo, setNewTodo] = useState("")
  const [todo, setTodo] = useState([])

  const addNewTodo = (e) => {
    e.preventDefault()
    if (newTodo !== "") {
      setTodo([...todo, {
        text: newTodo,
        complete: false
      }])
      setNewTodo("")
    }
  }

  const handleComplete = (index_) => {
    const todoComplete = todo.map((data, index) => {
      if (index_ === index) {
        return { ...data, complete: !data.complete }
      } else {
        return data
      }
    })
    setTodo(todoComplete)
  }

  return (
    <>
      <h1 className='text-2xl font-bold py-10 text-center'>My TodoList</h1>
      <div className="flex justify-center py-3">
        <div className="w-[600px] flex items-center justify-center gap-3">
          <input type="text" value={newTodo} className='input-style w-80' placeholder='Add Todo...' onChange={(e) => setNewTodo(e.target.value)} />
          <button onClick={(e) => addNewTodo(e)} className='button-fill'>Add</button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 my-5">
        {todo.map((data, index) => (
          <div key={index} className="flex items-center justify-between border border-black rounded-md p-3 w-[700px]">
            <p onClick={() => handleComplete(index)} className={`${data.complete ? "line-through hover:bg-none" : "hover:bg-gray-100"} cursor-pointer`}>{data.text}</p>
            <div className="flex gap-3">
              <button className='button-stroke border-yellow-500 text-yellow-500 hover:bg-yellow-500'>Edit</button>
              <button className='button-stroke border-red-500 text-red-500 hover:bg-red-500'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

const ImageCarousel = ({ images }) => {

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }


  return (
    <>
      <div className="flex justify-center p-5">
        <div className="flex flex-col items-center w-[600px]">
          <h2 className='text-2xl font-bold py-5'>Image Carousel</h2>
          <div className="relative">
            <button className='slide-button right-5' onClick={nextSlide}>&#10095;</button>
            <button className='slide-button left-5' onClick={prevSlide}>&#10094;</button>
            {/* {images.map((image, index) => ( */}
              <img src={images[currentIndex]} className='w-[600px]' />
          </div>
        </div>
      </div>
    </>
  )
}

function Day5() {

  const images = ["https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
    "https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg"
  ]

  return (
    <>
      {/* <div className="flex justify-center py-5">
        <h2 className='text-4xl font-bold'>Using list and key in react</h2>
      </div>
      <div className="*:mb-5 flex items-center justify-center gap-5">
        <SampleList />
        <ASEANCountries />
        <StudentsList />
      </div> */}
      <TodoLists />
      <hr />
      <ImageCarousel images={images} />
    </>
  )
}

export default Day5
