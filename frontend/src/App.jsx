// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import PostList from "./components/postlist";

import { createContext, useState } from "react";
export let Contextapi=createContext(null)

function App() {
  const [token,setToken] = useState(localStorage.getItem('token'))

  return (
    <>
      <Router>
        <Contextapi.Provider value={{token,setToken}}>
        <Routes>
          {token?
          <>
          <Route path="/post-list" element={<PostList />} />
          </>
          :
          <>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          </>
        }
        </Routes>
        </Contextapi.Provider>
      </Router>
    </>
  );
}

export default App;
