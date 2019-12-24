import React from 'react';
import { useState, useEffect } from 'react';
import { register } from '../utilities/service';

const Register = ({setUser, history}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setPass] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [isSamePass, setIsSamePass] = useState(false);

    useEffect(() => {
        function isValidPw() {
            if ((/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g).test(password)) {
                setValidPass(true);
            }
            else {
                setValidPass(false);
            }
        }
        console.log(password);
        isValidPw();
    }, [password])

    useEffect(() => {
        setIsSamePass(confirmPass === password);
        console.log(confirmPass === password);
    }, [confirmPass, password]);

    function handleRegister(){
        if(!validPass || !isSamePass) return;
        register({name, surname, username, email, password}).then(data=>{
            if(data.success===true){
                setUser(data.user);
                history.push('/list');
            } else {
                console.log('Neuspesna registracija');
            }
        })
    }

    return (
        <form className='registerform'>
            <label>Name: </label>
            <input className='register' type='text' placeholder='Name' required onInput={e => {
                setName(e.target.value);
            }} />
            <label>Surname: </label>
            <input className='register' type='text' placeholder='Surname' required onInput={e => {
                setSurname(e.target.value);
            }} />
            <label>Username: </label>
            <input className='register' type='text' placeholder='Username' required onInput={e => {
                setUsername(e.target.value);
            }} />
            <label>Email: </label>
            <input className='register' type='email' placeholder='Email' required onInput={e => {
                setEmail(e.target.value);
            }} />
            <label>Password: </label>
            <input className='register' type='password' placeholder='Password' required onInput={e => {
                setPassword(e.target.value);
            }} />
            <label>Confirm Password: </label>
            <input className='register' type='password' placeholder='Confirm password' required onInput={e => {
                setPass(e.target.value);
            }} />
           <input className='regbutt' type='submit' value='Register' onClick={e => { e.preventDefault(); handleRegister()}} />
        </form>
    )
}

export default Register;