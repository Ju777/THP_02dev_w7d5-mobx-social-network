import '../styles/AuthorProfile.scss';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const API_URL_USER = "http://localhost:1337/users/";
const API_URL_POSTS = "http://localhost:1337/posts?user.id=";

function AuthorProfile() {

    const [ userData, setUserData ] = useState(null);
    const authorId = useParams().authorId;
    const token = Cookies.get('token');
    const [ userPosts, setUserPosts ] = useState(null)

    useEffect( () => {
        fetch(API_URL_USER + authorId, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application.json'}
        })
        .then(response => response.json())
        .then(data => {
            // console.log('fetched user information', data);
            setUserData(data);
        } )

        fetch(API_URL_POSTS + authorId, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application.json'}
        })
        .then(response => response.json())
        .then(data => {
            // console.log('fetched user posts',data);
            setUserPosts(data);
        } )
    }, [])  

    return (
        <main>
            {/* <h3>AuthorPage de = {authorId}</h3> */}
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

                    </div> :
                     "... data loading ..."
            }

            {
                userPosts ?
                            userPosts.map(post => (
                                <>
                                <div className="posts-container">
                                    <div>Post : {post.text}, like {post.like}</div>
                                </div> 
                                </>
                            )) :

                            "... data loading ..."
            }
            </main>
    );
}

export default AuthorProfile;