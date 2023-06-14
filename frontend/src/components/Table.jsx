import React, { useContext, useState, useEffect } from "react";
import moment from "moment";

import ErrorMessage from './ErrorMessage';
import PostModal from "./PostModal";

import { UserContext } from "../context/UserContext";

const Table = () => {

    const [token,setToken] = useContext(UserContext);
    const [posts, setPosts] = useState(null);
    const [errorMessage, SetErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [id, setId] = useState(null);

    const handleVote = async (id) => {

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({post_id: id, dir: 1})
        };

        const response = await fetch("https://fastapi-mperle05.herokuapp.com/vote", requestOptions);

        if(!response.ok) {
            SetErrorMessage("Could not vote. Only one vote per person.");
        } else {
            const data = await response.json();
            SetErrorMessage("");
            getPosts();
            // console.log(data);
        }
    };

    const handleDeletePost = async (id) => {
    
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        };

        const response = await fetch(`https://fastapi-mperle05.herokuapp.com/posts/${id}`, requestOptions);

        if(!response.ok) {
            SetErrorMessage("Could not be deleted. Maybe you are not the owner of this post.");
            getPosts();
        } else {
            SetErrorMessage("");
            getPosts();
        }
    };

    const handleUpdatePost = async (id) => {
        setId(id);
        setActiveModal(true);
    };

    const getPosts= async () => {

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        };

        const response = await fetch("https://fastapi-mperle05.herokuapp.com/posts/?limit=1000&skip=0", requestOptions);

        const data = await response.json();

        if(!response.ok) {
            if (response.status === 401) setToken(null);
            SetErrorMessage("Could not load posts");
        } else {
            data.sort(function(a,b) {return b.Post.id - a.Post.id});
            // console.log(data);
            setPosts(data);
            setLoaded(true);
        }
    };

    useEffect(() => {
        getPosts();
    },[]);

    const handleModal = () => {
        setActiveModal(!activeModal);
        getPosts();
        // setId(null);
    }

    const convertDate = (date) => {
        if (moment().format("M.D.YY") === moment(date).format("M.D.YY")) {
            return(moment(date).format("HH:mm"));
        } else {
            return(moment(date).format("D.M.YY"));
        }
    }

    const extractUserName = (email) => {
        // Split the email address at the '@' symbol
        var parts = email.split('@');
        

      
        // Return the first part of the split array, which contains the user name
        return parts[0];
      }

    const test = () => {
        setId(null);
        setActiveModal(true);
    }

    return (
        <>
            <PostModal
                active={activeModal}
                handleModal={handleModal}
                token={token}
                id={id}
                setErrorMessage={SetErrorMessage}
            />
            <button className="button is-fullwidth mb-5 is-primary" onClick={ () => test() }>Create Post</button>
            <ErrorMessage message={errorMessage}/>
            { loaded && posts ? (
                <div className="table-container">
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Post</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Votes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { posts.map((post) => (
                                <tr key={post.Post.id}>
                                    <td><b>{post.Post.title}</b>: {post.Post.content}</td>
                                    <td>{extractUserName(post.Post.owner.email)}</td>
                                    <td>{convertDate(post.Post.created_at)}</td>
                                    <td>{post.votes}</td>
                                    <td>
                                        <button className="vote mr-2 is-info is-light" onClick={() => handleVote(post.Post.id)}>  Vote </button>
                                        <button className="del mr-2 is-danger is-light" onClick={() => handleDeletePost(post.Post.id)}>Delete</button>
                                        <button className="ch mr-2 is-info is-light" onClick={() => handleUpdatePost(post.Post.id)}>Change</button>
                                    </td>
                                </tr>
                            ))  }
                        </tbody>
                    </table>
                </div>
            ): <p>Loading</p>
            
            }
            <button className="button is-fullwidth mb-5 is-primary" onClick={ () => setActiveModal(true) }>Create Post</button>
        </>
    )

};

export default Table;