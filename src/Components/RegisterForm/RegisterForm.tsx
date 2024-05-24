import React, { useState } from 'react';
import './RegisterForm.css';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

interface IRegister {

}

const RegisterForm: React.FC<IRegister> = ({ }) => {
    const context = "Регистрация";
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState<string>('');
    const [last_name, setLastName] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [nickname, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password_repeat, setPasswordRepeat] = useState<string>('');

    const [error, setError] = useState<String>('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (first_name === "" ||
            last_name === "" ||
            nickname === "" ||
            password === "") {
            setError("Поля не могут быть пустым");
            return;
        }

        if (password !== password_repeat) {
            setError("Пароли не совпадают")
            return;
        }

        const json = JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            age: age,
            nickname: nickname,
            password_hash: btoa(password)
        });

        try {
            const response = await axios.post<{ token: string }>('http://localhost:8080/register', json);

            if (response.status === 200) {
                setError('');

                const token = response.data.token;
                localStorage.setItem('token', token)
                console.log(token);

                navigate('/');
            }
        } catch (error: any) {
            console.log(error);
            setError('Ошибка регистрации');
        }
    };

    return (
        <div className="register">
            <h2>{context}</h2>
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
                    <input type="text" id="username" value={nickname} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Повтор пароля:</label>
                    <input type="password" id="password_repeat" value={password_repeat} onChange={e => setPasswordRepeat(e.target.value)} />
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
