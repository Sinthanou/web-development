import React from "react"

const Day2 = () => {

    const ProductDetail = [
        {
            title: "Comfort Foam White Casual Shoes",
            type: "Sneakers",
            price: "599.999 KIP",
            image: "https://5.imimg.com/data5/SELLER/Default/2022/11/YV/ZF/YO/116453489/white-casual-shoes-for-men.jpg"
        },
        {
            title: "Comfort Foam White Casual Shoes",
            type: "Sneakers",
            price: "599.999 KIP",
            image: "https://5.imimg.com/data5/SELLER/Default/2022/11/YV/ZF/YO/116453489/white-casual-shoes-for-men.jpg"
        },
        {
            title: "Comfort Foam White Casual Shoes",
            type: "Sneakers",
            price: "599.999 KIP",
            image: "https://5.imimg.com/data5/SELLER/Default/2022/11/YV/ZF/YO/116453489/white-casual-shoes-for-men.jpg"
        },
        {
            title: "Comfort Foam White Casual Shoes",
            type: "Sneakers",
            price: "599.999 KIP",
            image: "https://5.imimg.com/data5/SELLER/Default/2022/11/YV/ZF/YO/116453489/white-casual-shoes-for-men.jpg"
        },
        {
            title: "Comfort Foam White Casual Shoes",
            type: "Sneakers",
            price: "599.999 KIP",
            image: "https://5.imimg.com/data5/SELLER/Default/2022/11/YV/ZF/YO/116453489/white-casual-shoes-for-men.jpg"
        },
        {
            title: "Comfort Foam White Casual Shoes",
            type: "Sneakers",
            price: "599.999 KIP",
            image: "https://5.imimg.com/data5/SELLER/Default/2022/11/YV/ZF/YO/116453489/white-casual-shoes-for-men.jpg"
        },
        {
            title: "Comfort Foam White Casual Shoes",
            type: "Sneakers",
            price: "599.999 KIP",
            image: "https://5.imimg.com/data5/SELLER/Default/2022/11/YV/ZF/YO/116453489/white-casual-shoes-for-men.jpg"
        },
    ]

    //product component
    const ProductCompo = (props) => {

        return (
            <div key={props.Key} className="p-5 shadow-lg w-[350px] rounded-lg bg-white text-left text-lg text-black">
                <img className="w-full" src={props.ProductImage} alt="" />
                <p className="text-lg font-bold  mt-3">{props.ProductTitle}</p>
                <p className="mt-3">Type: {props.ProductType}</p>
                <p className="mt-3">Color:</p>
                <div className="flex items-center gap-2 py-3">
                    <div className="w-7 h-7 rounded-full bg-white border-4 border-zinc-300"></div>
                    <div className="w-7 h-7 rounded-full bg-black border-4 border-zinc-300"></div>
                    <div className="w-7 h-7 rounded-full bg-blue-500 border-4 border-zinc-300"></div>
                    <div className="w-7 h-7 rounded-full bg-pink-500 border-4 border-zinc-300"></div>
                </div>
                <p className="font-bold mt-3">Price: {props.ProductPrice}</p>
            </div>
        )
    }

    return (
        <>
            <div className="p-40">
                <p className="text-2xl font-bold mb-10">Products</p>
                <div className="w-full grid grid-cols-4 gap-10">
                    {ProductDetail.map((product, index) => (
                        <ProductCompo
                            ProductTitle={product.title}
                            ProductType={product.type}
                            ProductPrice={product.price}
                            ProductImage={product.image}
                            Key={index}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Day2