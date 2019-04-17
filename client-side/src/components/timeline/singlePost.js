import React, { useState, Fragment } from 'react';
import moment from 'moment';

import { API } from '../../config.js';


const Post = ({ post }) => {
    const [userVotes, setVotes] = useState(post.votes);

    const { _id, content, creator, votes, flairs, date } = post;
    const { description, title } = content;
    const { username } = creator;

    const vote = async type => {
        await fetch(`${API}/post/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type })
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(updatedPost => {
                console.log(updatedPost)
                setVotes(updatedPost.votes)
            })
            .catch(e => console.error(e))
    }

    return (
        <Fragment>
            {/*<!-- Post Content Column -->*/}
            < div className="col-6 center" >

                {/*<!-- Title -->*/}
                < h1 className="mt-4" >{title}</h1 >

                {/*<!-- Author -->*/}

                <div className="col-12">
                    < p className="lead col-10 horizontal">
                        < a href="/" >{username}</a >
                    </p >
                    <span>{userVotes}</span>
                    <p className="col-1 horizontal" onClick={() => vote('like')}>
                        <i className="far fa-thumbs-up voteButton"></i>
                    </p>
                    <p className="horizontal">
                        <i className="far fa-thumbs-down voteButton" onClick={() => vote('dislike')}></i>
                    </p>
                </div>
                <hr />

                {/*<!-- Date/Time -->*/}
                <p>Posted on {moment(date).format('LLL')}</p>

                <hr />
                <div className="bootstrap-tagsinput">
                    {flairs.map(flair => <span className="tag label label-info" key={flair} data-role="tagsinput">{flair}</span>)}
                </div>
                <hr />
                {/*<!-- Preview Image -->*/}
                <img className="img-fluid rounded" src="http://placehold.it/900x300" alt="" />

                <hr />

                {/*<!-- Post Content -->*/}
                <p className="lead">{description}</p>
                <hr />
            </div >
        </Fragment>
    );
}

export default Post;