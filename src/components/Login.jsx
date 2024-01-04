import {useState} from "react";
import { Box, TextField, Button} from '@mui/material';
import "../Styles/Login.css";

const Login = () => {
    const imageURL = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
    const [user,setUser] = useState(true);

    function toggleuser(){
        setUser(!user);
    }

    return (
    <Box>
    {user ?
        <Box className="box">
            <img src={imageURL} alt="Blog App Logo"/>
            <TextField className= "text-field" variant="standard" label="Username" />
            <TextField className= "text-field" variant="standard" label="Password" />
            <Button className="login-button" variant="contained">Login</Button>
            <p>OR</p>
            <Button className="signup-button" onClick={toggleuser}>Create an account</Button>
        </Box>

        :<Box className="box">
            <img src={imageURL} alt="Blog App Logo"/>
            <TextField className= "text-field" variant="standard" label="Name" />
            <TextField className= "text-field" variant="standard" label="Username" />
            <TextField className= "text-field" variant="standard" label="Password" />
            <Button className="signup-button">SignUp</Button>
            <p>OR</p>
            <Button className="login-button" variant="contained" onClick={toggleuser}>Already Have An Account</Button>
         </Box>
    }
    </Box>
    )
}


export default Login;