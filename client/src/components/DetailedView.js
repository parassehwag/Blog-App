import {Box,Typography,styled} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useEffect,useState,useContext} from "react";
import getAccessToken from "../utils/common-utils";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {DataContext} from "../context/DataProvider"

const DetailedView = () =>{
    const[post,setPost]=useState({});
    const {id}= useParams();
    const {account} =useContext(DataContext);
    
    useEffect(()=> {
        let headers = {
            'authorization': getAccessToken()
          };
        const fetchData = async() =>{
            await axios.get('http://localhost:8000/postById',{
                params: { id : id },
                headers: headers
              })
            .then(response => {
                if(response.status === 200){
                    setPost(response.data);
                    console.log(response.data);
                }
            })
            .catch(error => {
              console.error('Error during fetching post data by id', error);
            });
        }
        fetchData();
    },[])
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    //css
    const StyledBox=styled(Box)`
        margin:110px 100px 50px;
    `
    const Image = styled('img')({
        height:'50vh',
        display:'block',
        margin:'0px auto'

    })
    const Title = styled(Typography)`
    font-size:38px;
    font-weight:600;
    text-align:center;
    word-break: break-word;
    `
    const Edit = styled(EditIcon)`
        margin:5px;
        padding:5px;
        border: 1px solid #878787;
        border-radius:10px;
    `
    const Delete = styled(DeleteIcon)`
    margin:5px;
    padding:5px;
    border: 1px solid #878787;
    border-radius:10px;
    `
    const Author = styled(Box)`
        color:#878787;
        margin:20px 0px;
        display:flex;
        justify-content:space-between;
    `
    const Description = styled(Typography)`
        word-break: break-word;
    `
    
    return(
        <StyledBox>
            <Image src={url} alt="blog" />
            <Box style={{float:'right' , cursor:'pointer'}}>
            {
                account.username === post.username && 
                <> 
                <Edit color="primary" />
                <Delete color="error" />
                </>
            }
            </Box>
            <Title>{post.title}</Title>
            <Author>
                <Typography>Author: <Box component="span" style={{fontWeight:600}}>{post.username}</Box></Typography>
                <Typography>{new Date(post.createdDate).toString()}</Typography>
            </Author>
            <Typography>{post.description}</Typography>
        </StyledBox>
    )
}

export default DetailedView;