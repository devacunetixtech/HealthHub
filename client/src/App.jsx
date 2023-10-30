import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";

import Prelogin from "./pages/Prelogin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Preregister from "./pages/PreRegister";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Footer from "./components/Footer";


function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/prelogin" element={<Prelogin/>}/>
        <Route path="/preregister" element={<Preregister/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={user ? <Dashboard/> : <Login />}/>
        <Route path="/profile" element={user ? <Profile/> : <Login />}/>
        <Route path="/chat" element={user ? <Chat/> : <Login />}/>
        <Route path="*" element= {<Navigate to="/"/>} />
      </Routes>
      {/* <Footer></Footer> */}
    </>
  );
}

export default App;