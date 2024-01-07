import {Box, Typography , styled} from "@mui/material";

const Container = styled(Box)`
margin-top:60px;
background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
width:100%;
height:50vh;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`;

const Heading = styled(Typography)`
    font-size:70px;
    color:white;
    line-height:1;
`;

const SubHeading = styled(Typography)`
    font-size:20px;
    background:#fff;
`

const Banner = () =>{
    return(
        <Container>
            <Heading>Blog</Heading>
            <SubHeading>ParasSehwag</SubHeading>
        </Container>
    )
}

export default Banner;