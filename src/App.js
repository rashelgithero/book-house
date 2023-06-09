import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoMatch from './components/NoMatch/NoMatch';
import CourseDetail from './components/CourseDetail/CourseDetail';
import CoursePurchase from './components/CoursePurchase/CoursePurchase';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';

function App() {
  return (
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
          
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;

