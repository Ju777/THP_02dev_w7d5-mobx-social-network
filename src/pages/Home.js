import '../styles/Home.scss';
import React, { useState, useEffect, useReducer } from 'react';
import { useAtomValue } from 'jotai';
import { tokenStatusAtom } from '../atoms/tokenStatus';
import Cookies from 'js-cookie';
import PostCards from '../components/PostCards';
import NewPost from '../components/NewPost';
import { authUserAtom } from '../atoms/authUser';
import { useSelector } from 'react-redux';
const API_URL_POSTS = "http://localhost:1337/posts/";

function Home() {

    const [ postsList, setPostsList ] = useState(null);
    const token = Cookies.get('token');

    // const authUser = useAtomValue(authUserAtom); // Avec JOTAI  
    // const isTokenCreated = useAtomValue(tokenStatusAtom); // Avec JOTAI    

    const isTokenCreated = useSelector((state)=> state.tokenStatus); // Avec Redux
    const authUser = useSelector((state) => state.authUser); // Avec Redux

    // Posts list initialization
    useEffect( () => {

        fetch(API_URL_POSTS + "?_limit=20&_sort=created_at:DESC", {
            method: "GET", 
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            // console.log('fetch GET postsList => ', data);
            setPostsList(data);
        })
        .catch(error => console.log(error.message))
    }, [])

    // authenticated user panel
    const authenticatedUserPanel = () => {
        return(
        <>
            <NewPost/>

            {/* <h3 className=''>Latest posts </h3> */}
            { postsList ? <PostCards
                            postsList={postsList}
                            /> : " ... datat loading  ..."}
        </>
        )
    }

    // visitor panel
    const visitorPanel = () => {
        return(
        <div id="visitor-panel">
            {/* <h3>Visitor panel</h3> */}
            <h2>Welcome on ChitChat !</h2>
            <h5>This website is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.</h5>
        </div>
        )
    }

    return (
        <main>   
            {/* <h2>Home page</h2> */}

            {
                isTokenCreated ? authenticatedUserPanel() : visitorPanel() // Avec Redux
            }

        </main>
    );
}

export default Home;