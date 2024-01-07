import { AppBar, Toolbar , Typography , styled} from "@mui/material";
import {Link} from "react-router-dom";

const Component = styled(AppBar)`
    background : #ffff;
    color : #000;
    
`
const Container = styled(Toolbar)`
    justify-content:center;
    & > a {
        color: inherit;
        padding:20px;
        cursor:pointer;
        text-decoration:none;
    }
`

const Header = () =>{
    return (
        <div>
            <Component>
                <Container>
                    <Link to="/">Home</Link>
                    <Link to="/about">ABOUT</Link>
                    <Link to="/contact">CONTACT</Link>
                    <Link to="/login">LOGOUT</Link>
                </Container>
            </Component>
        </div>
    )
}

export default Header;