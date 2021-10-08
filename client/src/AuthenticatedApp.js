import './App.css';
// import GroupsContainer from './components/GroupsContainer'
// import EventsContainer from './components/EventsContainer'
import { Switch, Route} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Posts from './components/Posts';
import BioPage from './components/BioPage';
import NavBar from './NavBar';

function AuthenticatedApp({ currentUser, setCurrentUser, setAuthChecked}) {
  // const history = useHistory()
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

  function AuthIsChecked(){
    setAuthChecked()
  }

  function UserIsChecked(){
    setCurrentUser()
  }

  useEffect(()=>{
    fetch("http://localhost:3000/posts")
    .then(resp=> resp.json())
    .then(posts => setPosts(posts))
  },[])
  
  function handleLogout(){
    fetch(`/logout`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          setCurrentUser(null)
          // history.push('/')
        }
      })
  }

  const headers = {
    Accepts: "application/json",
    "Content-Type": "application/json",
}   

  // write a new post
  function addNewPost(post){
    fetch("http://localhost:3000/posts", {
        method: 'POST',
        body: JSON.stringify(post),
        headers,
    })
    .then(resp=>resp.json())
    .then(post=> setPosts([...posts, post]))
}


  function getUsers(){
    fetch("http://localhost:3000/users")
    .then(resp=>resp.json())
    .then(users => setUsers(users))
  }





  return (
    <div className="App">
      <nav>
      <NavBar currentUser={currentUser} handleLogout={handleLogout}/>
      </nav>
      <Switch>
        <Route path="/bio">
          <BioPage  currentUser={currentUser} posts={posts} setAuthChecked={AuthIsChecked} setCurrentUser={UserIsChecked}/>
        </Route>
        {/* <Route path="/feed"> */}
          <Posts posts={posts} addNewPost={addNewPost} currentUser={currentUser} setPosts={setPosts} users={users} getUsers={getUsers}/>
        {/* </Route> */}
      </Switch>
    </div>
  );
}

export default AuthenticatedApp;
