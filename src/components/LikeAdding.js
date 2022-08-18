import React from 'react';
import Cookies from 'js-cookie';

// forceUpdate est conservé en props mais mis en commentaire plus bas car fonctionne un coup sur 2
// et pas sur tous les navigateurs : Opéra pas de souci, Chrome et Firefox moyen.
function LikeAdding({post}) {
    const API_URL_POSTS = "http://localhost:1337/posts/";
    const token = Cookies.get('token');

    // user can like a post
    const addLike = (post) => {
        fetch(API_URL_POSTS + post.id, {
            method: "PUT", 
            headers: { 'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify( { like: post.like + 1 })
        })
        .then(response => response.json())
        .then(data => {
            // console.log('fetched addLike =>', data)
            window.location.reload();
        })
        .catch(error => console.log(error.message))
    }

    return (
        <>
            <button
                className='like-button'
                onClick = { () => addLike(post) }
            >+</button>
        </>
    );
}

export default LikeAdding;