import React, { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Day2 from "./components/Day2"
import Day1 from "./components/Day1"
import Day3 from "./components/Day3"
import Day4 from "./components/Day4"
import Day5 from "./components/Day5"
import Day6 from "./components/Day6"
import Day7 from "./components/Day7"
import Day8 from "./components/Day8"

// main components
const App = () => {
  const Days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [currentDay, setCurrentDay] = useState(8)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("555555")
      navigate("/authentication");
    }
  }, []);

  function handleDayClick(Day) {
    setCurrentDay(Day)
  }

  const DayFunction = (props) => {
    switch (props.Day) {
      case 1:
        return <Day1 />
      case 2:
        return <Day2 />
      case 3:
        return <Day3 />
      case 4:
        return <Day4 />
      case 5:
        return <Day5/>
      case 6:
        return <Day6/>
      case 7:
        return <Day7/>
      case 8:
        return <Day8/>
      default:
        return null
    }
  }

  return (
    <>
        <div className="flex gap-3 justify-center items-center py-5">
          {Days.map((Day, index) => (
            <button key={index} onClick={() => handleDayClick(Day)} className={` ${currentDay == Day ? "bg-green-500 text-white" : "bg-slate-300"} p-2 rounded-md transition duration-300`}>Day {Day}</button>
          ))}
        </div>
      <div>
        <DayFunction Day={currentDay} />
      </div>
    </>
  )
}

export default App