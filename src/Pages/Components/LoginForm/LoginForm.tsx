import React, { useState } from 'react';
import './LoginForm.css';

import { genSaltSync, hashSync } from 'bcryptjs'
import axios from 'axios';

function hash(data: string) {
    const salt = genSaltSync();
    const hash = hashSync(data, salt);
    console.log(hash);
    return hash;
}

interface LoginProps {
    onLogin: (username: string, password: string) => void;
}

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<String>('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hashed_pass = hash(password);
        console.log(hashed_pass);

        const json = JSON.stringify({
            username: username,
            hashed_password: hashed_pass,
        });

        try {
            const response = await axios.post<{ jwt: string }>('http://localhost:8080/api/login', json);

            if (response.status == 200) {
                const jwt = response.data.jwt;
                localStorage.setItem('jwt', jwt)
                setError('');
                console.log(jwt);
            }
        } catch (error: any) {
            console.log(error);
            setError('Auth failed');
        }
    };

    return (
        <div className="login-form">
            <header>
            </header>
            <div>
                <h2>Форма входа</h2>
                <b>{error}</b>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
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
        </div>
    );
};

export default Login;
