import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import React, { createContext, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoMatch from './components/NoMatch/NoMatch';
import CourseDetail from './components/CourseDetail/CourseDetail';
import CoursePurchase from './components/CoursePurchase/CoursePurchase';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import Signup from './components/Signup/Signup';
import SignIn from './components/SignIn/SignIn';
export const userContext = createContext();
function App() {
  const [logInUser, setLogInUser] = useState({});
  return (
    <userContext.Provider value={[logInUser, setLogInUser]}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path='/course' element={<Courses/>}> </Route>
            <Route path='/' element={<Courses/>}> </Route>
            <Route path='*' element={<NoMatch/>}> </Route>
            <Route path='/course/:key' element={<CourseDetail/>}></Route>
            <Route path='/purchase' element= {<CoursePurchase></CoursePurchase>}></Route>
            <Route path='/login' element = {<Login/>}></Route>
            <Route path='/shipment' element= {<Shipment/>}></Route>
            <Route path='/login/signup' element = {<Signup></Signup>}></Route>
            <Route path='/signIn' element = {<SignIn/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </userContext.Provider>
  )
};

export default App;

