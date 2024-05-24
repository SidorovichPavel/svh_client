import React, { useState } from 'react';
import './Profile.css';

import Header from '../../Components/Header/Header';
import UploadForm from '../../Components/UploadForm/UploadForm';


const ProfilePage: React.FC = () => {

  

  return (
    <div className="ProfilePage">
      <Header page_title='Личный кабинет' />
      <div className="LeftPane">
        {<UploadForm />}
      </div>
      <div className="MiddlePane">
        {/* Здесь может быть контент для средней части экрана */}
      </div>
      <div className="RightPane">
        {/* Здесь может быть контент для правой части экрана */}
      </div>
    </div>
  );
};

export default ProfilePage;
