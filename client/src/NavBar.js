import { useState } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

function NavBar({currentUser, handleLogout}){

    const [admin] = useState(currentUser.admin)
    
    return(
        <>
        <NavBarStyler>
        {admin? (<SpanStyler>Logged in as: {currentUser.username} -Admin </SpanStyler>) : (<SpanStyler>Logged in as: {currentUser.username} -User</SpanStyler>)}
        <NavLinkWrapper>
            <ButtonStyler><NavLink to="/feed">News Feed</NavLink></ButtonStyler>
            <ButtonStyler><NavLink to="/bio">My Account</NavLink></ButtonStyler>
            <ButtonStyler onClick={handleLogout}>Logout</ButtonStyler>
        </NavLinkWrapper>

        </NavBarStyler>
    </>
    )
}

export default NavBar

const NavBarStyler = styled.div`
    background-color: lightblue;
    display: flex;
    /* align-items: center; */
    font-size: 20px;
    /* position: relative; */
`

const ButtonStyler = styled.button`
    border-radius: 8px;
    font-size: 20px;
    margin: 5px;
    margin-top: 10px;
`

const NavLinkWrapper = styled.div`
    margin-left: 900px;
    margin-bottom: 10px;
    position: relative;
`

const SpanStyler = styled.span`
    font-size: 18px;
    /* margin-top: -10px; */
`