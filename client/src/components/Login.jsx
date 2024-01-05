import {useState} from "react";
import { Box, TextField, Button} from '@mui/material';
import "../Styles/Login.css";
// import {API} from "../sevice/api.js";
import axios from "axios";

const Login = () => {
    const imageURL = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

    const [ error,setError]=useState('')
    const [user,setUser] = useState(true);

    function toggleuser(){
        setUser(!user);
    }

    // const [loginValues,setLoginValues] = useState({Username:"",Password:""});

    // function handleLoginChange(event){
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setLoginValues((prevValue)=>{
    //         return ({...prevValue,[name]:value})
    //     })
    //     console.log(loginValues);
    // }

    const [signUpValues,setSignUpValues] = useState({Name:"" , Username:"" , Password:""})

    function handleSignupChange(event){
        setError('');
        const name = event.target.name;
        const value = event.target.value;
        setSignUpValues((prevValue)=>{
            return({...prevValue , [name]:value})
        })
    }

    async function signUpUser(){    
        console.log(signUpValues);
          await axios.post('http://localhost:8000/signUp', signUpValues)
            .then(response => {
              console.log('SignUp successful:', response.data);
              setSignUpValues({Name:"" , Username:"" , Password:""})
              setUser(!user)
            })
            .catch(error => {
              console.error('Error during Signup:', error);
              setError("Something Went Wrong! Please try Again")
            });
    }

    return (
    <Box>
    {user ?
        <Box className="box">
            <img src={imageURL} alt="Blog App Logo"/>
            <TextField className= "text-field" variant="standard" label="Username" />
            <TextField className= "text-field" variant="standard" label="Password"/>
            <Button className="login-button" variant="contained">Login</Button>
            <p>OR</p>
            <Button className="signup-button" onClick={toggleuser}>Create an account</Button>
        </Box>

        :<Box className="box">
            <img src={imageURL} alt="Blog App Logo"/>
            <TextField className= "text-field" variant="standard" name ="Name" label="Name" onChange={(e) =>{handleSignupChange(e)}} value={signUpValues.Name}/>
            <TextField className= "text-field" variant="standard" name ="Username" label="Username" onChange={(e) =>{handleSignupChange(e)}} value={signUpValues.Username}/>
            <TextField className= "text-field" variant="standard" name ="Password" label="Password" onChange={(e) =>{handleSignupChange(e)}} value={signUpValues.Password}/>
            {error&&<p>{error}</p>}
            <Button className="signup-button" onClick={()=>{signUpUser()}}>SignUp</Button>
            <p>OR</p>
            <Button className="login-button" variant="contained" onClick={toggleuser}>Already Have An Account</Button>
         </Box>
    }
    </Box>
    )
}


export default Login;