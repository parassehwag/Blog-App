import {useState} from "react";

import DataProvider from "../context/DataProvider";
import {BrowserRouter, Routes, Route , Outlet , Navigate} from "react-router-dom";

//Components
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import CreatePost from "./create/CreatePost";

const PrivateRoute = ({authStatus ,...props}) =>{
   return authStatus ?
   <>
      <Header />
      <Outlet />
   </>
   :
   <Navigate replace to="/login" />
}

function App() {

   const [authStatus,setAuthStatus] = useState(false);

  return (
    <DataProvider>
       <BrowserRouter>
          <Routes>
             <Route path='/login' element={<Login setAuthStatus={setAuthStatus} />} />

             <Route path="/" element={<PrivateRoute authStatus={authStatus} />} >
                <Route path='/' element={<Home />} />
             </Route>

             <Route path="/create" element={<PrivateRoute authStatus={authStatus} />} >
                <Route path='/create' element={<CreatePost />} />
             </Route>

          </Routes>
       </BrowserRouter>
    </DataProvider>
  );
}

export default App;
