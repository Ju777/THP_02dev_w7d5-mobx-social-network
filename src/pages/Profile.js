import '../styles/Profile.scss';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { authUserAtom } from '../atoms/authUser';
import { Navigate } from 'react-router-dom';
const API_URL_GET = "http://localhost:1337/users/me";
const API_URL_PUT = "http://localhost:1337/users/";

function Profile() {

    const [ userData, setUserData ] = useState(null)
    const [ editButtonStatus, setEditButtonStatus ] = useState(false);

    const token = Cookies.get('token');

    useEffect( () => {

        fetch(API_URL_GET, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setUserData(data);
        } )
        .catch(error => console.log(error.message))

    }, [])

    const displayProfile = () => {
        return(
            <>
            {/* <h3>Ton profil = </h3> */}
            {
                userData ? 
                    <div id="profile-container">
                        <div className='user-data-container'>
                            <div>Username : </div>
                            <div>{userData.username}</div>
                        </div>
                        
                        <div className='user-data-container'>
                            <div>Email : </div>
                            <div>{userData.email}</div>
                        </div>

                        <div className='user-data-container'>
                            <button onClick = { () => toggleEditButton() }>EDIT PROFILE</button>
                        </div>
                    </div> :
                     "... data loading ..."
            }
            </>
        )
    }

    const toggleEditButton = () => {
        setEditButtonStatus(!editButtonStatus);
    }

    const displayEditPanel = () => {
        return(
            <>
            {/* <h3>Edite ton profil = </h3> */}
            {
                userData ? 
                    <div id="profile-container">
                        <form onSubmit={fetchEdit}>
                            <div className='user-data-container'>
                                <div>Username : </div>
                                <div><input type="texte" name="username" placeholder={userData.username}/></div>
                            </div>
                            
                            <div className='user-data-container'>
                                <div>Email : </div>
                                <div><input type="texte" name="email" placeholder={userData.email}/></div>
                            </div>

                            <div className='user-data-container'>
                                <input type="submit" value="OK"/>
                                <button onClick = { () => toggleEditButton() }>CANCEL</button>
                            </div>
                        </form>
                    </div> :
                        "... data loading ..."
            }
            </>
        )        
    }

    const fetchEdit = (e) => {
        e.preventDefault();
        // console.log('e.target =>', e.target);

        const formData = new FormData(e.target);
        // console.log('formData', formData)
        const data = Array.from(formData);
        // console.log('data', data);
        const editData = {
            username: data[0][1],
            email: data[1][1]
        }

        // console.log('editData => ', editData)

        fetch(API_URL_PUT + `${userData.id}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(editData)
        })
        .then(repsonse => repsonse.json())
        .then(data => {
            // console.log('fetchEdit data =>', data);
            window.location.reload();
        })
        .catch(error => console.log(error.message))

        
    }

    return (
        <main>   
            {/* <h2>Profile page</h2> */}
            {
                editButtonStatus ? displayEditPanel() : displayProfile()
            }
        </main>
    );
}

export default Profile;