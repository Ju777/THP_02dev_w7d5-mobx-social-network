import React from 'react';
import Cookies from 'js-cookie';
import { useSetAtom } from 'jotai';
import { tokenStatusAtom } from '../atoms/tokenStatus';
import { authUserAtom } from '../atoms/authUser';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const API_URL = "http://localhost:1337/auth/local/register"

function FormRegister() {

    const dispatch = useDispatch();
    const setTokenStatus = useSetAtom(tokenStatusAtom);
    const setAuthUser = useSetAtom(authUserAtom);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('e.target', e.target);

        const formData = new FormData(e.target);
        const data = Array.from(formData);
        // console.log('data', data);

        const registerData = {
            username: data[0][1],
            email: data[1][1],
            password: data[2][1]
        }
        // console.log('registerData', registerData);

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerData)
        })
        .then(response => response.json())
        .then(data => {
                // console.log('fetched data', data);

                Cookies.set('token', data.jwt);
                // console.log('Cookie token', Cookies.get('token'));

                // setTokenStatus(true); // Avec JOTAI
                dispatch({type: "TOKEN_CREATED"}); // Avec Redux

                Cookies.set('authUser', JSON.stringify(data.user))

                // setAuthUser(data.user); //Avec Jotai
                dispatch({type: "SET_AUTHUSER"}); // Avec Redux

                navigate('/');
            })
        .catch(error => console.log(error.message))
    }


    return (
        <>
            <div id="form-container">
                <form onSubmit = {handleSubmit}>
                    <div className='inputs-container'>
                        <div className='label-container'><label htmlFor="username">Username</label></div>
                        <div className='input-container'><input type="text" name="username"/></div>
                        
                        <div className='label-container'><label htmlFor="email">Email</label></div>
                        <div className='input-container'><input type="text" name="email"/></div>

                        <div className='label-container'><label htmlFor="password">Password</label></div>
                        <div className='input-container'><input type="password" name="password"/></div>

                        <div className='input-container'><input type="submit" value="Register!"/></div>
                        
                    </div>
                </form>
            </div>
        </>
    );
}

export default FormRegister;