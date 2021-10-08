import { useState } from "react"
import styled from "styled-components"

function PostCard({post, currentUser, handleDelete}){
    const [editedComment, setEditedComment] = useState("")

    //functionality to delete a post (passed down from post)
    function deleteThisPost(){
        handleDelete(post)
    }

    //  functionality to edit a post
    function editPost(synthEvent){
        synthEvent.preventDefault()
        console.log("in edit", editedComment)

        fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "PATCH",
        header: {"Content-Type" : "application/json"},
        body: JSON.stringify({comment: editedComment})
        }).then(resp => resp.json())
        .then(editedPost =>{
            post.comment = editedComment
            console.log(post.comment)
            console.log("hello")
        } )
    
  }

    return(
        <>
        <PostCardStyler>
        <H3Styler>{post.user.username}</H3Styler>
        <PStyler>{post.comment}</PStyler> 
        {/* <ButtonStyler onClick ={editPost}>Edit</ButtonStyler> */}
       
        {post.user.username === currentUser.username? (<> <InputStyle type="text" name="editPost" value = {editedComment}
            onChange={(e) => setEditedComment(e.target.value)} placeholder="edit your post"></InputStyle><ButtonStyler onClick={editPost}>Edit </ButtonStyler> <ButtonStyler onClick={deleteThisPost}>Delete</ButtonStyler></>) : (<></>)}
        </PostCardStyler>
        </>

    )
}

export default PostCard

const PostCardStyler = styled.div`
    border-style: solid;
    border-width: 3px;
    border-color: black;
    border-radius: 8px;
    margin-bottom: 15px;
    margin: auto;
    text-align: center;
    font-size: 25px;
    display: block;
    max-width: 450px;
    margin-top: 10px;
`

const ButtonStyler = styled.button`
    border-radius: 8px;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 15px;
`

const H3Styler = styled.h3`
    margin-left: -300px;
    position: relative;
    font-size: 25px;
`

const InputStyle = styled.input`
  font-size: 20px;
  width: 400px;
  border-radius: 8px;
  margin-bottom: 10px;
`

const PStyler = styled.p`
margin-left: 0px;
`