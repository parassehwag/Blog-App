import {useState, useEffect} from "react";
import axios from "axios";
import getAccessToken from "../utils/common-utils";
import {Box,Grid} from "@mui/material";
import Post from "./Post";
import { useSearchParams,Link } from "react-router-dom";

const Posts = () =>{

    const [posts,setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(()=>{
        let headers = {
            'authorization': getAccessToken()
          };
        const fetchData = async() =>{
            await axios.get(`http://localhost:8000/posts`,{
                params: { category: category },
                headers: headers
              })
            .then(response => {
              if(response.status === 200){
                    setPosts(response.data);
              }
            })
            .catch(error => {
              console.error('Error during loading posts:', error);
            });
        }
        fetchData();
    },[category])
    
    return(
        <>
        <Grid container spacing={2} style={{color:'#878787', margin:'30px 50px', fontSize: 18}}>
            {
                (posts && posts.length > 0) ? posts.map((post)=> {
                    return(
                          <Grid item lg={3} sm={3} xs={12}>
                            <Link to={`details/${post._id}`} style={{textDecoration:'none', color:'inherit'}}>
                                <Post post={post}/>
                              </Link>
                          </Grid>
                      
                      )
            }) : <div>No Data Available To Display</div>
             }
          </Grid>,
        </>
    )
}

export default Posts;