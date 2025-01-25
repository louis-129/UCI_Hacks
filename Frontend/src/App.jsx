import React from 'react'
import './App.css'
import Router from '../components/Router'
import Context from '../components/Context'


function App() {

  const userInfo ={
    name: "louis",
    email: "louis@gmail.com",
    loggedIn: true,
    cartItems: 4,

  }
    return (
      <>
      <Context.Provider value ={userInfo}>
        <Router/>
      </Context.Provider>
      </>
    )
}

export default App
