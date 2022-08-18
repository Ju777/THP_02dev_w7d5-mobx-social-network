import '../styles/Forms.scss';
import React from 'react';
import { useAtomValue } from 'jotai';
import { tokenStatusAtom } from '../atoms/tokenStatus';
import { authUserAtom } from '../atoms/authUser';
import FormRegister from '../components/FormRegister';


function Register() {

    // const tokenStatus = useAtomValue(tokenStatusAtom);
    // const authUser = useAtomValue(authUserAtom);

    return (
        <main>   
            {/* <h2>Register page</h2>
            <h3>tokenStatus = {tokenStatus.toString()}</h3> */}
            {/* <h3>authUser = { authUser ?  authUser.id : "not logged in" }</h3>  */}
    
            <FormRegister/>
        </main>
    );
}

export default Register;