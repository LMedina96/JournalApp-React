import React from 'react'
import { Route, Routes } from 'react-router-dom'
import JournalRoutes from '../journal/routes/JournalRoutes'
import AuthRoutes from '../auth/routes/AuthRoutes'

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/auth/*' element={<AuthRoutes />} />

        <Route path='/*' element={<JournalRoutes />} />
    </Routes>
  )
}

export default AppRouter
