import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Watch from './Pages/Watch/Watch';
import Welcome from './Pages/Welcome/Welcome';
import Profile from './Pages/Profile/Profile';

import RegisterForm from './Components/RegisterForm/RegisterForm';
import LoginForm from './Components/LoginForm/LoginForm'

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
