import React, { useEffect, useState } from 'react'

const BasicForm = () => {

  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`your name is ${name}`)
    setName("")
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="text-center">
          <p className='text-2xl font-bold'>Basic Form</p>
          <div className="py-10 w-[300px]">
            <form action="" onSubmit={handleSubmit} className='flex flex-col items-center gap-5'>
              <input type="text" placeholder='Enter your name...' value={name} onChange={(e) => setName(e.target.value)} className='input-style' />
              <button className='button-fill' type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

const MultipleInputForm = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`your Info: ${JSON.stringify(formData)}`)
    setFormData({
      firstName: "",
      lastName: "",
      email: ""
    })
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="text-center">
          <p className='text-2xl font-bold'>Multiple Input Form</p>
          <div className="w-[300px] py-10">
            <form action="" className='flex flex-col items-center gap-5' onSubmit={handleSubmit}>
              <input className='input-style' value={formData.firstName} name='firstName' onChange={onChange} type="text" placeholder='First Name...' />
              <input className='input-style' value={formData.lastName} name='lastName' onChange={onChange} type="text" placeholder='Last Name...' />
              <input className='input-style' value={formData.email} name='email' onChange={onChange} type="email" placeholder='Email...' />
              <button className='button-fill' type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

const SelectAndRadio = () => {

  const [selectFruit, setSelectFruit] = useState("")
  const [selectGender, setSelectGender] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="">
          <p className='text-2xl font-bold'>Radio and drop down</p>
          <div className="my-5">
            <form action="" onSubmit={handleSubmit} className='flex flex-col items-center gap-5'>
              <div className="flex flex-col items-center gap-3">
                <select name="fruit" id="" onChange={(e) => setSelectFruit(e.target.value)}>
                  <option value="">Select fruit</option>
                  <option value="Mango">Mango</option>
                  <option value="Apple">Apple</option>
                  <option value="Banana">Banana</option>
                  <option value="Strawberry">Strawberry</option>
                  <option value="Pineapple">Pineapple</option>
                </select>
                {selectFruit && <p>{selectFruit}</p>}
              </div>
              <div className="*:p-3 text-center">
                <input type="radio" name='gender' value="Male" onChange={(e) => setSelectGender(e.target.value)} />
                <label htmlFor="">Male</label>
                <input type="radio" name='gender' value="Female" onChange={(e) => setSelectGender(e.target.value)} />
                <label htmlFor="">Female</label>
                {selectGender && <p>your gender is {selectGender}</p>}
              </div>
              <button className='button-fill' type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

const ProductSearch = () => {
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2
  const [searchTerm, setSearchTerm] = useState("")
  const [priceFilter, setPriceFilter] = useState({
    min: "",
    max: ""
  })
  const products = [
    {
      id: 1,
      name: "Smart Phone",
      price: 5
    },
    {
      id: 2,
      name: "Laptop",
      price: 7
    },
    {
      id: 3,
      name: "Head Phone",
      price: 2
    },
    {
      id: 4,
      name: "Camera",
      price: 4
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: 2
    },
  ]
  const [results, setResults] = useState([...products])

  useEffect(() => {
    handleSearch()
  }, [sortOrder])

  const handleSearch = () => {
    let filterProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    if (priceFilter.min !== "") (
      filterProducts = filterProducts.filter((product) => parseInt(priceFilter.min) <= product.price)
    )

    if (priceFilter.max !== "") (
      filterProducts = filterProducts.filter((product) => parseInt(priceFilter.max) >= product.price)
    )

    filterProducts.sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price
    })
    setResults(filterProducts)
  }

  const handlePriceFilterChange = (e) => {
    setPriceFilter({ ...priceFilter, [e.target.name]: [e.target.value] })
  }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value)
  }

  // change page varible
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItems = indexOfLastItem - itemsPerPage
  const currentItems = results.slice(indexOfFirstItems, indexOfLastItem)
  const totalPages = Math.ceil(results.length / itemsPerPage)

  return (
    <>
      <div className="flex justify-center py-5">
        <div className="text-center">
          <p className='text-2xl font-bold'>Product Search</p>
          <form action="" className='my-3 text-left' onSubmit={() => {
            e.preventDefault()
            handleSearch
          }}>
            <div className="flex gap-3">
              <input type="text" placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='input-style' />
              <button type='submit' className='button-fill'>Search</button>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <label htmlFor="">Lowest price</label>
              <input type="number" onChange={handlePriceFilterChange} name='min' value={priceFilter.min} className='border border-gray-500' />
              <label htmlFor="">highest price</label>
              <input type="number" onChange={handlePriceFilterChange} name='max' value={priceFilter.max} className='border border-gray-500' />
            </div>
            <div className="flex items-center mt-2 gap-3">
              <label htmlFor="">Sort</label>
              <select name="" id="" onChange={handleSortChange} className='text-center border border-gray-400 rounded-md'>
                <option value="">price</option>
                <option value="asc">low - high</option>
                <option value="aesc">high - low</option>
              </select>
            </div>
          </form>
          <ul>
            {currentItems.map((product, index) => (
              <li key={index} className='my-2 p-3 bg-gray-200 w-full'>{index + 1}. {product.name} price: {product.price}</li>
            ))}
          </ul>
          <div className="flex justify-center">
            <div className="flex items-center gap-10">
              <button className='button-stroke p-2' onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                >prev</button>
              <span>Page {currentPage} form {totalPages}</span>
              <button className='button-stroke p-2' onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                >next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Day6() {
  return (
    <>
      {/* <BasicForm />
      <hr className='border border-gray-300' />
      <MultipleInputForm />
      <hr className='border border-gray-300' />
      <SelectAndRadio />
      <hr className='border border-gray-300' /> */}
      <ProductSearch />
    </>
  )
}

export default Day6
