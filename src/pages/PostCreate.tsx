
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostCreate() {

    const navigate = useNavigate();

    const [ title, setTitle ] = useState("");

    const [ content, setContent ] = useState("");

    function handleSubmit( event: React.SubmitEvent<HTMLFormElement> ) {

        event.preventDefault();

        const newPost = {
            id: Number,
            title: title,
            content: content,
            created_at: Date.now(),
            updated_at: Date.now()
        }

        console.log("New Post: ", newPost);
        
        alert("Post Created Successfully!");


        
        navigate("/"); // Return to main index page.
    }

    return (
        <>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <br />

                    < input type="text" value={ title } onChange={ event => setTitle( event.target.value ) } />
                </div>
                
                <br />

                < div >
                    <label>Content</label>

                    < br />

                    <textarea value={ content } onChange={ event => setContent( event.target.value ) }/>


                </div>

                <button type="submit">Create Post</button>

            </form>
        </>
    );


}

export default PostCreate;