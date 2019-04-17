import React, { useState, useEffect } from 'react';
import Post from './singlePost';
import { API } from '../../config.js';

const Timeline = () => {
    // Declare a new state variable, which we'll call "count"
    const [posts, setPost] = useState(null);

    useEffect(() => {
        fetch(`${API}/post`)
            .then(res => res.json())
            .then(posts => setPost(posts))
    }, []);

    if (!posts) return 'Loading...';
    
    return (
        <div className="row">
            {
                posts.map(post => <Post post={post} key={post._id} />)
            }
        </div>
    )
}

export default Timeline;
