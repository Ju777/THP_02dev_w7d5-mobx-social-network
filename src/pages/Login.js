import '../styles/Forms.scss';
import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { tokenStatusAtom } from '../atoms/tokenStatus';
import { authUserAtom } from '../atoms/authUser';
import FormLogin from '../components/FormLogin';

function Login() {

    // const tokenStatus = useAtomValue(tokenStatusAtom); REDUX
    // const authUser = useAtomValue(authUserAtom); REDUX

    // useEffect( () => console.log('Login authUser => ', authUser), []) REDUX

    return (
        <main>   
            {/* <h2>Login page</h2>
            <h3>tokenStatus = {tokenStatus.toString()}</h3> */}
            {/* <h3>authUser = { authUser ?  authUser.id : "not logged in" }</h3>  */}
            
            <FormLogin/>
        </main>
    );
}

export default Login;