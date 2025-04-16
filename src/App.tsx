// import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"
import Layout from "./components/Layout"
import Home from "./components/Home"
import Admin from "./components/Admin"
import Editor from "./components/Editor"
import Lounge from "./components/Lounge"
import Unathorized from "./components/Unathorized"
import NotFound from "./components/NotFound"
import LinkPage from "./components/LinkPage"
import RequireAuth from "./components/RequireAuth"


function App() {
  
  return (
  <Routes>
    <Route path = "/" element = {<Layout/>}>

      <Route path="sign-up" element={<Register/>} />
      <Route path="login" element={<Login/>} />
      <Route path="/linkPage" element={<LinkPage/>} />

      <Route element={<RequireAuth/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/editor" element={<Editor/>} />
        <Route path="/lounge" element={<Lounge/>} />
        <Route path="/unathourized" element={<Unathorized/>} />            
      </Route>
      
      <Route path="*" element={<NotFound/>} />
    </Route>        
  </Routes>
  )
}

export default App
