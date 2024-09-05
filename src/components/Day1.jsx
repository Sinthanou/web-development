import React, { useState, useEffect } from "react"

const Day1 = () => {

    //functionalCouter Conponent
    const FunctionalCounter = () => {

        const [count, setCount] = useState(0)

        useEffect(() => {
            document.title = `count: ${count}`
        })

        return (
            <>
                <div className="mainContriner rounded-xl bg-blue-300">
                    <h1 className="font-bold text-3xl">Counter Function</h1>
                    <p>Quantity: {count}</p>
                    <button onClick={() => setCount(count + 1)} className="bg-green-500 rounded-md px-5 py-2 text-white mr-3">count</button>
                    <button onClick={() => {
                        if (count !== 0) {
                            setCount(count - 1)
                        }
                    }} className="bg-red-500 rounded-md px-5 py-2 text-white mr-3">delete</button>
                    <button onClick={() => setCount(0)} className="bg-blue-500 rounded-md px-5 py-2 text-white">reset</button>
                </div>
            </>
        )
    }

    // class functionalCounter
    class ClassCounter extends React.Component {
        constructor(props) {
            super(props)
            this.state = { count: 0 }
        }

        componentDidUpdate() {
            document.title = `count: ${this.state.count}`
        }

        render() {
            return (
                <>
                    <div className="mainContriner rounded-xl bg-blue-300">
                        <h1 className="font-bold text-3xl">Counter Class</h1>
                        <p>Quantity: {this.state.count}</p>
                        <button onClick={() => this.setState({ count: this.state.count + 1 })} className="bg-green-500 rounded-md px-5 py-2 text-white mr-3">count</button>
                        <button onClick={() => {
                            if (this.state.count !== 0) {
                                this.setState({ count: this.state.count - 1 })
                            }
                        }
                        } className="bg-red-500 rounded-md px-5 py-2 text-white mr-3">delete</button>
                        <button onClick={() => this.setState({ count: 0 })} className="bg-blue-500 rounded-md px-5 py-2 text-white">reset</button>
                    </div>
                </>
            )
        }
    }

    //Letter component
    function PostLetter(props) {

        const [IsLike, setIsLike] = useState(false)
        const [likeCount, setLikeCount] = useState(0)

        return (
            <div className="letterBox w-[600px]">
                <h1 className="text-4xl font-bold">My Name is {props.name}</h1>
                <p>{props.content}</p>
                <img src={props.image} alt="" />
                <div className="flex items-center gap-3">
                    {IsLike ? (
                        <IconLike onClick={() => {
                            setIsLike(!IsLike)
                            setLikeCount(likeCount - 1)
                        }} className="fill-blue-500 cursor-pointer" />
                    ) : (

                        <IconLike onClick={() => {
                            setIsLike(!IsLike)
                            setLikeCount(likeCount + 1)
                        }} className="fill-black cursor-pointer" />
                    )}
                    <p className="text-2xl">{likeCount}</p>
                </div>
            </div>
        )
    }

    //icon component
    function IconLike(props) {
        return (
            <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="3em"
                width="3em"
                {...props}
            >
                <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311h-.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z" />
            </svg>
        );
    }

    return (
        <>
            <div className="app flex-col items-center gap-5">
                <FunctionalCounter />
                <ClassCounter />
                <PostLetter image="data:image/jpeg;base64,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" name="Sinthanou" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis doloremque suscipit culpa enim, magni quis quasi aut consequatur explicabo facilis praesentium fugit eos voluptatum officia totam in earum tenetur minima adipisci, voluptas nostrum pariatur. Tenetur, minima vero? Voluptas iste architecto aspernatur ullam mollitia enim tenetur libero commodi, ex nostrum. Necessitatibus aperiam maxime recusandae distinctio ducimus doloribus praesentium quam asperiores iure inventore animi, libero, obcaecati sit dolor consectetur. Sapiente reiciendis cumque facilis fuga enim amet architecto aspernatur provident accusamus tempore, rem porro, fugiat quasi doloribus eveniet ullam debitis, magni eaque quos! Voluptas facere deserunt asperiores labore quo distinctio similique tempora sed." />
            </div>
            <style jsx>
                {
                    `
            .app {
              padding: 20px 0;
              display: flex;
              text-align: center;
            }
              
            .mainContriner * {
              margin-top: 10px;
            }

            .mainContriner {
              border: 2px #3b82f6 solid;
              width: 600px;
              padding: 20px;
            }

            .letterBox * {
              margin-top: 10px;
            }
            `
                }
            </style>
        </>
    )
}

export default Day1