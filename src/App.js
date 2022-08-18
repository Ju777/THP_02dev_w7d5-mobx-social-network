import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './components/SharedLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Error from './pages/Error';
import ProtectedRoute from './components/ProtectedRoute';
import AuthorProfile from './pages/AuthorProfile';


function App() {

  useEffect( () => {
    // let data=window.performance.getEntriesByType("navigation")[0].type;
    // console.log(data);
  }, [])

  return (
    
      <div className="">
        <BrowserRouter><Routes>

          <Route path = "/" element = {<SharedLayout/>}>
          <Route index element = {<Home/>}/>

            <Route path = "/register" element = {<Register/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/error" element = {<Error/>}/>

            <Route path = "/profile" element = {<ProtectedRoute>
                                                  {<Profile/>}
                                                </ProtectedRoute>}/>

            <Route path = "/user/:authorId" element = {<ProtectedRoute>
                                                        {<AuthorProfile/>}
                                                      </ProtectedRoute>}/>
          
          </Route>

        </Routes></BrowserRouter>
      </div>
    
  );
}

export default App;
