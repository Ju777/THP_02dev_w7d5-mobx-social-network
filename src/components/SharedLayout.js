import '../styles/SharedLayout.scss';
import logoChitchat from '../assets/images/logo-chichat.png';
import React, { useEffect } from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { tokenStatusAtom } from '../atoms/tokenStatus';
import { authUserAtom } from '../atoms/authUser';
import { useSelector, useDispatch } from 'react-redux';

function SharedLayout() {

    // const [ isTokenCreated, setTokenStatus ] = useAtom(tokenStatusAtom); // Avec TOTAI
    // const [ authUser, setAuthUser ] = useAtom(authUserAtom); // Avec JOTAI

    const isTokenCreated = useSelector( (state) => state.tokenStatus) // Avec Redux
    const authUser = useSelector((state) => state.authUser) // Avec Redux
    const dispatch = useDispatch(); // Avec Redux

    console.log('From SharedLayout : isTokenCreated ==> ', isTokenCreated);
    

    const logout = () =>{

        Cookies.remove('token');
        // setTokenStatus(false); // Avec JOTAI
        dispatch({type:"TOKEN_REMOVED"}); // Avec Redux

        
        Cookies.remove('authUser');
        // setAuthUser(null); // Avec JOTAI
        dispatch({type: "UNSET_AUTHUSER"}); // Avec REDUX
        
        <Navigate to="/"/>
    }

    return (
        <>
            <header>
                <nav>

                    <div>
                        <img src={logoChitchat} alt="logo" className='logo'/>
                    </div>

                    <div className='link-container'>
                        <Link to = "/" className='link'>HOME</Link>                  
                    </div>

                    { isTokenCreated ?
                        <>
                            <div className='link-container'>
                                <Link to = "/profile" className='link'>MY PROFILE</Link>
                                {/* <br/>Redux Token : {isTokenCreated.toString()}
                                <br/>Redux authUser : {authUser.username} */}
                            </div>

                            <div id='quit-container'>
                        
                                <div id="auth-user">{authUser.username}</div>
                            
                                <div id="quit-button-container">
                                    <button
                                        onClick = { () => logout()}
                                        id="quit-button"
                                    >QUIT</button>
                                </div>
                            
                            </div>
                            </> :

                            <>

                            
                            <div>
                                <div className='link-container'>
                                    <Link to = "/register" className='link'>REGISTER</Link>
                                </div>
                                <div className='link-container'>
                                    <Link to = "/login" className='link'>LOGIN</Link>
                                </div> 
                            </div>

                            
                            <div>
                                not logged in
                                {/* <br/>Redux Token : {isTokenCreated.toString()}
                                <br/>Redux authUser : {authUser.username}             */}
                            </div>
                            </>
                        }
                      
                </nav>
                
            </header>

            {/* <main> */}
                <Outlet/>
            {/* </main> */}

            <footer>
                FOOTER
            </footer>
        </>
    );
}

export default SharedLayout;