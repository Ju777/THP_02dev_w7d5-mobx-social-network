import React, { useSyncExternalStore } from 'react';
import { authUserAtom } from '../atoms/authUser';
import { useAtomValue } from 'jotai';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';


const API_URL_POSTS = "http://localhost:1337/posts/";

function NewPost() {

    // const authUser = useAtomValue(authUserAtom);
    const authUser = useSelector((state) => state.authUser);

    const token = Cookies.get('token');

    // Create a new post
    const fetchPOST = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Array.from(formData);
        const postData = {
            text: data[0][1],
            user: authUser.id
        }

        console.log('postData => ', postData);

        // console.log('token => ', token)

        fetch(API_URL_POSTS, {
            method: "POST",
            headers: { 'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.reload();
        })
        .catch(error => console.log(error.message));
    }

    return (
        <>
            {/* <h3>Authenticated User panel</h3> */}
            <div id="new-post-container">
                <form onSubmit = { fetchPOST } id="new-post-form">
                    <div id="new-post-input-container">
                        <input
                            type="text"
                            name="post-content"
                            id="new-post-input"
                            placeholder=' ... write and post ... '/>
                    </div>
                    <div id="new-post-button-container">
                        <input
                            type="submit"
                            id="new-post-button"
                            value="POST !"/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default NewPost;