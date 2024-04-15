import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    // className="py-4 px-8 flex flex-col min-h-screen"
    <div > 
      <Header/>
      <Outlet/>
      
    </div>
  )
}

export default Layout
