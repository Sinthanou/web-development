import React, { useState } from "react"
import Day2 from "./components/Day2"
import Day1 from "./components/Day1"
import Day3 from "./components/Day3"
import Day4 from "./components/Day4"

// main components
const App = () => {

  const Days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [currentDay, setCurrentDay] = useState(4)

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