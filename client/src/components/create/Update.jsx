import {Box,styled,FormControl,InputBase,Button,TextareaAutosize} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useState,useEffect,useContext} from "react";
import { useLocation , useNavigate , useParams} from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import axios from "axios";
import getAccessToken from "../../utils/common-utils";

//css

const StyledBox = styled(Box)(({ theme}) =>({
    margin:`60px 100px`,
    [theme.breakpoints.down('md')]:{
        margin:`60px 0`
    }
}));

const Image = styled('img')`
  width:100%;
  height:50vh;
  object-fit:cover;
`
const StyledForm = styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row;
    align-items:center;
`

const StyledinputField = styled(InputBase)`
    flex:1;
    margin:0px 30px;
    font-size:25px;
`

const TextArea = styled(TextareaAutosize)`
    margin-top:50px;
    width:100%;
    font-size:18px;
    border:none;
    resize:none;
    &:focus-visible{
        outline:none;
    }
`



const Update = () =>{
    
    const[post,setPost]=useState({
        title:"",
        description:"",
        picture:"",
        username:"",
        categories:"",
        createDate: new Date()
    })

    const[file,setFile]=useState(''); 
    const {account} = useContext(DataContext);

    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();

    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

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

    useEffect(()=>{
        const getImage = async() =>{
            if(file){
                const data = new FormData();
                data.append("name",file.name);
                data.append("file",file);
                //API Call
                
                let headers = {
                    'Accept': 'application/json, form-data',
                    'Content-Type': 'application/json'
                  };

                await axios.post('http://localhost:8000/file/upload', data,{
                    headers: headers
                  })
                .then(response => {
                    if(response.status === 200){
                        console.log('File uploaded Successfully', response.data);
                        setPost((prevValue)=>{
                            return({...prevValue,picture:response.data})
                        })
                    }
                })
                .catch(error => {
                  console.error('Error during File Upload:', error);
                });

            }
        }
        getImage();
        setPost((prevValue)=>{
            return({...prevValue,categories:location.search?.split('=')[1] || 'All',username:account.username})
        })
    }, [file])




    //setting Title and description
    function handlePostChange(event){
        const name=event.target.name;
        const value=event.target.value;
        setPost((prevValue)=>{
            return({...prevValue,[name]:value})
        })
    }

    async function updateBlogPost(){
        let headers = {
            'authorization': getAccessToken()
          };
          console.log(headers);

        await axios.put('http://localhost:8000/updatePost', post ,{
            headers: headers 
          } )
        .then(response => {
            if(response.status ===200){
                console.log('Post Updated successful:', response.data);
                navigate(`/details/${id}`);
            }
        })
        .catch(error => {
          console.error('Error during Posting:', error);
        });
    }
    
    return (
        <StyledBox>
            <Image src={url} alt="Banner" />
            <StyledForm>
                <label htmlFor="fileInput">
                    <AddCircleIcon  fontSize="large" color="action"/>
                </label>
                <input type="file"
                    id="fileInput"
                    style={{display:'none'}}
                    onChange={(e)=> setFile(e.target.files[0])}
                />.

                <StyledinputField placeholder="Title" value={post.title} onChange={(e)=>{handlePostChange(e)}} name="title" />
                <Button variant="contained" onClick={()=>{updateBlogPost()}}>Update</Button>
            </StyledForm>
            <TextArea 
                minRows={5}
                placeholder="Tell your Story..."
                onChange={(e)=>{handlePostChange(e)}}
                name="description"
                value={post.description}
            />
        </StyledBox>
    )
    }

export default Update;