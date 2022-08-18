
import React from 'react';
import RemoveButton from './RemoveButton';
import LikeAdding from './LikeAdding';
import LikeRemoving from './LikeRemoving';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { authUserAtom } from '../atoms/authUser';
import {nanoid} from 'nanoid';

function PostCards({postsList, forceUpdate}) {

    const authUser = useAtomValue(authUserAtom);

    return (
        <>
            {
                postsList.map(post => (
                    <div key={nanoid()} className='post-container'>

                        {
                            authUser &&

                        <div className='author-part'>
                            
                            
                            {
                                post.user.username === authUser.username ?
                                <>  
                                    <div className='post-owner-style'>
                                        <Link  key={nanoid()} to={`/user/${post.user.id}`}>
                                            ME
                                        </Link>
                                    </div>

                                    <div key={nanoid()}>
                                        <RemoveButton  key={nanoid()} postId={post.id} forceUpdate={forceUpdate}/>
                                    </div>
                                </>
                                    :
                                <div className=''>
                                    <Link  key={nanoid()} to={`/user/${post.user.id}`}>
                                        author : {post.user.username}
                                    </Link>
                                </div>
                            }
                        
                        </div>
                        
                        }
                        

                        <div key={nanoid()}>{post.text}</div>

                        <div key={nanoid()} className='like-part'>
                            <div>{post.like} likes</div>
                            <div key={nanoid()} className="liking-buttons-container">
                                <LikeAdding post={post} forceUpdate={forceUpdate}/>
                                <LikeRemoving post={post} forceUpdate={forceUpdate}/> 
                            </div>
                            <div>{new Date(post.created_at).toDateString()} </div>
                        </div>
                        
                        
                    </div>
                ))
            }
        </>
    );
}

export default PostCards;