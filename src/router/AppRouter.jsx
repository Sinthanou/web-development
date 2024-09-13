import React from 'react'
import App from "../App";
import EditPost from "../components/EditPost";
import Profile from '../components/Profile';
import Authentication from '../components/Authentication';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Day2 from '../components/Day2';
import Day3 from '../components/Day3';
import Day4 from '../components/Day4';
import Day5 from '../components/Day5';
import Day6 from '../components/Day6';
import Day7 from '../components/Day7';
import Day8 from '../components/Day8';

function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<App></App>}></Route>
          <Route path="/authentication" element={<Authentication></Authentication>}></Route>
          <Route path="/edit/:id" element={<EditPost></EditPost>}></Route>
          <Route path="/day2" element={<Day2></Day2>}></Route>
          <Route path="/day3" element={<Day3></Day3>}></Route>
          <Route path="/day4" element={<Day4></Day4>}></Route>
          <Route path="/day5" element={<Day5></Day5>}></Route>
          <Route path="/day6" element={<Day6></Day6>}></Route>
          <Route path="/day7" element={<Day7></Day7>}></Route>
          <Route path="/day8" element={<Day8></Day8>}></Route>
          <Route path="/Profile" element={<Profile></Profile>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default AppRouter
