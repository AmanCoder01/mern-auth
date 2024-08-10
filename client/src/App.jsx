import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NotProtectedRoute } from './components/NotProtectedRoute';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage ';
import { ResetPasswordPage } from './pages/ResetPasswordPage ';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/signup' element={<NotProtectedRoute><SignUpPage /></NotProtectedRoute>} />
        <Route path='/signin' element={<NotProtectedRoute><SignInPage /></NotProtectedRoute>} />
        <Route path='/verify-email' element={<NotProtectedRoute><EmailVerificationPage /></NotProtectedRoute>} />
        <Route path='/forgot-password' element={<NotProtectedRoute><ForgotPasswordPage /></NotProtectedRoute>} />
        <Route path='/reset-password/:token' element={<NotProtectedRoute><ResetPasswordPage /></NotProtectedRoute>} />
      </Routes>
    </BrowserRouter >
  )
}

export default App