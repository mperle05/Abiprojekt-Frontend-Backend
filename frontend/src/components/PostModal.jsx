import React, { useContext, useState, useEffect } from "react";

const PostModal = ({active, handleModal, token, id, setErrorMessage}) => {
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState("");

    const handleCreatePost = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({title: title, content: content, published: true})
        };

        const response = await fetch("https://fastapi-mperle05.herokuapp.com/posts", requestOptions);

        if(!response.ok) {
            setErrorMessage("Could not upload post");
        } else {
            cleanFormData();
            handleModal();
        }


    }

    const cleanFormData = () => {
        setTitle("");
        setContent("");
        setPublished("");
      };    

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({title: title, content: content, published: true}),
        };
        const response = await fetch(`https://fastapi-mperle05.herokuapp.com/posts/${id}`, requestOptions);
        if (!response.ok) {
            setErrorMessage("Something went wrong when updating post");
        } else {
          cleanFormData();
          handleModal();
        }
      };

    return (
        <div className={`modal ${active && "is-active"}`}>
            <div className="modal-background" onClick={ handleModal }></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-primary-light">
                    <h1 className="modal-card-title">
                        {id ? "Update Post" : "Create Post"}
                    </h1>
                </header>
                <section className="modal-card-body">
                    <form>
                        <div className="field">
                            <label className="label">
                                Title
                            </label>
                            <div className="control">
                                <input
                                    type="text"
                                    placeholder="Enter Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">
                                Content
                            </label>
                            <div className="control">
                                <input
                                    type="text"
                                    placeholder="Enter Content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot has-background-primary-light">
                    {id ? (
                        <button className="button is-info" onClick={handleUpdatePost}>
                            Update
                        </button>
                    ) : (
                        <button className="button is-primary" onClick={handleCreatePost}>
                            Create
                        </button>
                    )}
                    <button className="button" onClick={handleModal}>Cancel</button>
                </footer>
            </div>
        </div>
    )
};

export default PostModal;