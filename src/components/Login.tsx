import { useState,useRef, useEffect } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { CgDanger } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const {setAuth} = useAuth();
    const [show , setShow] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const [user, setUser] = useState('');

    const [pwd, setPwd] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    useEffect(()=>{
        userRef.current?.focus()
    },[])

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
  
      try{
        // const res = await axios.post(REGISTER_URL,
        //   JSON.stringify({ user, pwd }),
        //   {
        //     headers: { 'Content-Type': 'application/json' },
        //     withCredentials: true
        //   }
        // )
  
        const res = await fetch("https://backend-practice-five.vercel.app/api/login",{
          method: 'POST',
          headers:{
            'Content-Type': 'appliaction/json'
          },
          body: JSON.stringify({user,pwd})
        })
    
        if(!res.ok) throw {res}

        const data = await res.json();
        
        setAuth({user : data.user,
          pwd: data.pwd,
          accessToken : data.accessToken,
          roles: data.roles
        })

        navigate(from,{replace:true});
      }catch(err:any){
        if (!err?.res) {
          setErrMsg('No Server Response');
        } else if (err.res?.status === 400) {
            setErrMsg('Invalid credentials');
        }else if (err.res?.status === 401) {
          setErrMsg('Unathourized');
        } else {
            setErrMsg('Registration Failed')
        }
      }
      
    }

return (

  <section className="min-h-screen flex justify-center items-center">
    <form 
        onSubmit={handleSubmit}
        className=" w-[400px] flex flex-col bg-[#08172c] p-7 rounded-md inset-0 shadow-[0px_0px_1px_0px_]">

      {errMsg? 
        <span className="text-2xl text-red-500 font-semibold flex gap-2 items-center mb-4">
          <span><CgDanger /></span> <span>{errMsg}</span> 
        </span> : ""}
        
      <div>
        <h1 className="text-3xl font-bold font-mono mb-5">Sign In Form</h1>
      </div>
      <label htmlFor="userName">
        Username : 
      </label>
      
        <input 
          type="text" 
          id="userName"
          autoComplete="off"
          required
          ref={userRef}

          onChange={(e)=>{
            setUser(e.target.value),
            setErrMsg('')
          }}

          aria-describedby="uidnote"

          className="outline-none border-2 rounded-md py-1 px-2 mt-1 text-black focus:ring-2 
            ring-orange-200 transition-all duration-300 mb-3 w-full"
        />
      
      <label htmlFor="pwd">
        Password : 
      </label>
      <div className="relative">
        <input 
          type={!show ? "password" : "text"} 
          id="pwd"
          required
          onChange={(e)=>{
            setPwd(e.target.value);
            setErrMsg('');
          }}

          aria-describedby="pwdnote"

          className="outline-none border-2 rounded-md py-1 px-2 mt-1 text-black focus:ring-2 
            ring-orange-200 transition-all duration-300 mb-3 w-full"
        />

        {show ? 
        <IoMdEye
          onClick={()=>setShow(!show)}
          className="absolute top-3 right-2 text-xl text-black cursor-pointer"
        /> :
        <IoMdEyeOff 
          onClick={()=>setShow(!show)}
          className="absolute top-3 right-2 text-xl text-black cursor-pointer"
        />
        }
      </div>

      <div className="text-center">
        <button 
        className="text-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:ring-2 w-28 
          py-2 rounded-md mt-7">Sign In</button>
      </div>

      <p className="mt-2">
        Create an account?<br />
        <span className="line">
        <a href="/sign-up" className="underline">Sign Up</a>
        </span>
      </p>
    </form>      
  </section>

  )
}

export default Login
