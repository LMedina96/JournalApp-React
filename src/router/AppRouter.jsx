import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import JournalRoutes from '../journal/routes/JournalRoutes'
import AuthRoutes from '../auth/routes/AuthRoutes'
import { useDispatch, useSelector } from 'react-redux'
import CheckingAuth from '../ui/components/CheckingAuth'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth/authSlice'
import { startLoadingNotes } from '../store/journal/thunks'

const AppRouter = () => {

  const {status} = useSelector(state => state.auth)
  const dispatch = useDispatch()
 
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async(user) => {

      if (!user) return dispatch(logout())

      const {uid, email, displayName, photoURL} = user
      dispatch(login({uid, email, displayName, photoURL}))
      dispatch(startLoadingNotes())

    })
  }, [])

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>

        {
          (status === 'authenticated')
          ? <Route path='/*' element={<JournalRoutes />} />
          : <Route path='/auth/*' element={<AuthRoutes />} />
        }

        <Route path='/*' element={<Navigate to='/auth/login' />}/>

    </Routes>
  )
}

export default AppRouter
