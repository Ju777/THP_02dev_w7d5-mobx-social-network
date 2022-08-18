import React from 'react';
import Cookies from 'js-cookie';
const API_URL_POSTS = "http://localhost:1337/posts/";


function RemoveButton({postId}) {
    const token = Cookies.get('token');

    // Remove a post
    const removePost = (postId) => {
        // console.log(postId);
        window.confirm("Are you sure ?") && 
            
        fetch(API_URL_POSTS + postId, {
            method: "DELETE",
            headers: { 'Authorization' : `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(data => {
            // console.log('fetched DELETE POST =>', data)
            window.location.reload();
        })
        .catch(error => console.log(error.message))

    }

    return (
        <>
            <button
                className='btn btn-danger'
                onClick = { () => removePost(postId) }
                >DEL
            </button>
        </>
    );
}

export default RemoveButton;