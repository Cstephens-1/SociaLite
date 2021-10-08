import { useEffect, useState } from "react"
import styled from "styled-components"
import PostCard from "./PostCard"
import UserCard from "./UserCard"

function Posts({posts, addNewPost, currentUser, setPosts}){
    const [newComment, setNewComment] = useState('')
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch("http://localhost:3000/users")
        .then(resp=> resp.json())
        .then(user=> setUsers(user))
    }, [])

    //delete an existing post
    function deletePost(post){
        fetch(`http://localhost:3000/posts/${post.id}`, {
            method: "DELETE",
          })
          let postsRemaining = posts.filter(eachPost=> eachPost.id !== post.id);
          console.log(postsRemaining)
            setPosts([...postsRemaining])
      }
    
      //map over the existing posts and format them to a card
    function mapPosts(posts){
      if (posts !== undefined){
        return(
            posts.map(post=>{
                return(
                    <PostCard post={post} key={post.id} currentUser={currentUser} handleDelete={deletePost} />
                )
            }))
            } else {
                return(
                    <></>
                )       
            }
    }

    function mapUsers(users){
        return(
            users.map(user=>{
                return(
                    <UserCard user={user}/>
                )
            })
        )
}
   


    //submit a new post
    function handleSubmit(synthEvent){
        synthEvent.preventDefault()
        console.log(synthEvent)
        const newPost = {
            comment: newComment,
            user_id: currentUser.id
        }
        addNewPost(newPost)
    }

    

    
    //the JS for the post form
    return(
    <>
        <FormStyler>
        <form onSubmit={handleSubmit}>
            <InputStyler>
                <InputStyle type="text" name="post" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="whats on your mind?"></InputStyle>
            </InputStyler>
            <ButtonStyler type="submit">Submit</ButtonStyler>
        </form>
        </FormStyler>
        {mapPosts(posts)}
        <FriendsListStyler>
        {mapUsers(users)}
        </FriendsListStyler>
        </>
    )
}

export default Posts

const FormStyler = styled.div`
    margin: 10px;
`

const InputStyler = styled.div`
    margin-right: 10px;
`

const ButtonStyler = styled.button`
    border-radius: 8px;
    font-size: 20px;
    margin-top: 10px;
`

const InputStyle = styled.textarea`
  font-size: 25px;
  width: 500px;
  height: 100px;
  border-radius: 8px;
`

const FriendsListStyler = styled.div`
    right: 200px;
    position: absolute;
    border-style: solid;
    border-width: 2px;
    border-color: black;
    top: 250px;
    width: 300px;

`