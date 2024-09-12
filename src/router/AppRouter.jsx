import React from 'react'
import App from "../App";
import EditPost from "../components/EditPost";
import Profile from '../components/profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={ <App/> }></Route>
            <Route path="/edit/:id" element={ <EditPost/> }></Route>
            <Route path='/Profile' element={ <Profile /> }></Route>
        </Routes>
      </Router>
    </>
  )
}

export default AppRouter
