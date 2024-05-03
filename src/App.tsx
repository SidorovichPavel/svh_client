import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Watch from './Pages/Watch';
import Welcome from './Pages/Welcome';
import Profile from './Pages/Profile';

import RegisterForm from './Pages/Components/RegisterForm/RegisterForm';
import LoginForm from './Pages/Components/LoginForm/LoginForm'

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<></>} />
        <Route index element={<Watch />} />
        <Route path='profile' element={<Profile />} />
        <Route path='login' element={<Welcome welcomeForm={<LoginForm />} />} />
        <Route path='register' element={<Welcome welcomeForm={<RegisterForm />} />} />
      </Routes>
    </BrowserRouter >
  );
};

export default App;
