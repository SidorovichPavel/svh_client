import React from "react";
import LoginForm from './Components/LoginForm/LoginForm';

import './Welcome.css';

interface ILoginProps {
    welcomeForm: React.ReactNode;
}

const Welcome: React.FC<ILoginProps> = ({ welcomeForm }) => {
    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Добро пожаловать!</h1>
                {welcomeForm}
            </div>
            
        </div>
    )
}

export default Welcome;