import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Register from './components/entry/Register'
import Login from './components/entry/Login'
import HeaderRoot from './components/header/heder_nav/HeaderRoot'
import Load_url from './components/scrape/Load_url'
import Scraped_url from './components/scrape/Scraped_url'
import Root_page from './components/dashboard/Root_page'
import Preview from './components/dashboard/childs/Preview'
import Home from './components/Home/Home'
import Left_sidebar from './components/profile/Left_sidebar'
import Forgotpassword from './components/entry/Forgotpassword'
import ResetPassword from './components/entry/ResetPassword'
import AgencyDashboard from './components/AgencyDashboard/AgencyDashboard'

export default function App() {
  const [agencyClient, setAgencyClient] = useState({});
  return (
    <>
      <BrowserRouter>
        <HeaderRoot />
        <Routes>
          <Route path='/' element={<Navigate to={'/dashboard'} />} />
          <Route path="/Dashboard" element={<Home />} />
          <Route path="/client-dashboard/:id" element={<Home agencyClient={agencyClient} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<Forgotpassword />} />
          <Route path='/load-url' element={<Load_url />} />
          <Route path='/scrape' element={<Scraped_url />} />
          <Route path='/chatbot/:childs/:id' element={<Root_page agencyView={agencyClient.name !== undefined} />} />
          <Route path='/profile/:childs' element={<Left_sidebar />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/agency-dashboard' element={<AgencyDashboard setAgencyClient={setAgencyClient} />} />
          <Route path='/test' element={<AgencyDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
