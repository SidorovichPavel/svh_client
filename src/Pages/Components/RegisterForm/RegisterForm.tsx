import React, { useState } from 'react';
import './RegisterForm.css';

import { genSaltSync, hashSync } from 'bcryptjs'
import axios from 'axios';

function hash(data: string) {
    const salt = genSaltSync();
    const hash = hashSync(data, salt);
    console.log(hash);
    return hash;
}

const RegisterForm: React.FC = () => {
    const context = "Регистрация";

    const [first_name, setFirstName] = useState<string>('');
    const [last_name, setLastName] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [error, setError] = useState<String>('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hashed_pass = hash(password);
        console.log(hashed_pass);

        const json = JSON.stringify({
            username: username,
            hashed_password: hashed_pass,
        });

        try {
            const response = await axios.post<{ jwt: string }>('http://localhost:8080/api/Register', json);

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
        <div className="register">
            <h2 style={{ color: "red" }}>{context}</h2>
            <b style={{ color: "red" }}>{error}</b>
            <form onSubmit={handleRegister}>
                <div className='form-group'>
                    <label>Имя:</label>
                    <input type='text' id='first_name' value={first_name} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Фамилия:</label>
                    <input type='text' id='last_name' value={last_name} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Возраст:</label>
                    <input style={{ width: '20%' }} type='number' id='age' value={age} onChange={e => setAge(Math.max(0, parseInt(e.target.value)))} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Имя пользователя:</label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Повтор пароля:</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>

                </div>
                <div className="form-group">
                    <button type="submit">Войти</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
