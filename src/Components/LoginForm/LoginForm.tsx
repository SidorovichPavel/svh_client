import React, { useState } from 'react';
import './LoginForm.css';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ILogin {

}

const Login: React.FC<ILogin> = ({ }) => {
    const context = "Вход";
    const navigate = useNavigate();

    const [nickname, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<String>('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const json = JSON.stringify({
            nickname: nickname,
            password_hash: btoa(password),
        });
        debugger
        try {
            const response = await axios.post<{ token: string }>('http://localhost:8080/login', json);

            if (response.status === 200) {
                setError('');

                const token = response.data.token;
                localStorage.setItem('token', token)
                console.log(token);

                navigate('/');
            }
        } catch (error: any) {
            console.log(error);
            setError('Ошибка входа');
        }
    };

    return (
        <div className="login-form">
            <h2>{context}</h2>
            <b style={{ color: "red" }}>{error}</b>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        value={nickname}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Войти</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
