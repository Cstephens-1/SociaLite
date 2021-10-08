import { useState } from "react"
import styled from "styled-components"



function BioPage({currentUser, posts, setAuthChecked, setCurrentUser}){
    const [newUserName, setNewUserName] = useState("")
    const [updatedBio, setUpdatedBio] = useState("")
    const [updatedImg, setUpdatedImg]= useState("")

    const editedUser = {
        username: newUserName || currentUser.username,
        bio: updatedBio || currentUser.bio,
        img: updatedImg || currentUser.img
    }
    
    function deleteAccount(){
        console.log(currentUser)
            fetch(`http://localhost:3000/users/${currentUser.id}}`, {
              method: 'DELETE',
            // //   credentials: 'include'
            })
              .then(res => {
                setCurrentUser(null)
                console.log(res)
                // setAuthChecked(false)
                console.log(currentUser.username, "'s account has been deleted'")
          })
        }

        function editAccount(synthEvent){
            synthEvent.preventDefault()
            console.log(currentUser)
            console.log("in edit", newUserName, updatedBio, updatedImg)
            currentUser.username = newUserName
            currentUser.bio = updatedBio
            currentUser.img = updatedImg
            console.log(currentUser)
            // fetch(`/users/${currentUser.id}`,{
            //     method: "PATCH",
            //     header: {"Content-Type" : "application/json"},
            //     // body: JSON.stringify(currentUser)
            //     body: JSON.stringify({
            //         editedUser
            //     })
            // }).then(resp => resp.json())
            // .then(setCurrentUser(editedUser))
        }

     

    

        

   
    return(
        <>
        <h1>{currentUser.username}</h1>
        <p>About me: {currentUser.bio}</p>
        <img src={currentUser.img} alt="" />
        {/* this isnt working^^ */}

        <FormWrapper>
        <form onSubmit={editAccount}>
            <InputStyle placeholder="update your username" value={newUserName} onChange={(e) => setNewUserName(e.target.value)}></InputStyle>
            <ButtonStyler type="submit">Edit Username</ButtonStyler>

            <InputStyle placeholder="update your biography" value={updatedBio} onChange={(e) => setUpdatedBio(e.target.value)}></InputStyle>
            <ButtonStyler type="submit">Edit Biography</ButtonStyler>

            <InputStyle placeholder="enter image url" value={updatedImg} onChange={(e) => setUpdatedImg(e.target.value)}></InputStyle>
            <ButtonStyler type="submit">Update Profile Picture</ButtonStyler>
            <br></br>
            <ButtonStyler onClick={deleteAccount}>Delete your account</ButtonStyler>
        </form>
        </FormWrapper>
        
       
        </>
    )
}

export default BioPage

const ButtonStyler = styled.button`
    border-radius: 8px;
    font-size: 15px;
    margin-top: 10px;
    max-width: 150px;
    margin-bottom: 20px;
`
const FormWrapper = styled.div`
width: 500px;
  /* background-color: black; */
  position: relative;
  display: flexbox;
  flex-direction: column;
  margin-left:30%;
`

const InputStyle = styled.input`
  font-size: 20px;
  width: 400px;
  border-radius: 8px;
`