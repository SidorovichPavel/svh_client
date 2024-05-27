import React, { useState } from 'react';
import './Profile.css';

import Header from '../../Components/Header/Header';
import UploadForm from '../../Components/UploadForm/UploadForm';

interface ILink {
  id: string;
  path: string;
}

const header_context: ILink[] = [
  { id: "Просмотр", path: "/" }
];

const ProfilePage: React.FC = () => {

  const token = localStorage.getItem("token");

  return (
    <div className="ProfilePage" >
      <Header page_title='Личный кабинет' actions={header_context} />
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
