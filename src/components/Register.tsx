import { useEffect, useRef, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { CgDanger } from "react-icons/cg";
// import axios from "./api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = '/sign-up';

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState('');
  const [validUser, setValidUser]  = useState(false);
  const [userFocus, setUserFocus]  = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidpwd]  = useState(false);
  const [pwdFocus, setPwdFocus]  = useState(false);

  const [matchpwd, setMatchpwd] = useState('');
  const [validMatch, setValidMatch]  = useState(false);
  const [matchFocus, setMatchFocus]  = useState(false);

  const [show , setShow] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  console.log(errMsg)

  useEffect(()=>{
    userRef.current?.focus()
  },[])

  useEffect(()=>{
    setValidUser(()=>USER_REGEX.test(user))
  },[user])

  useEffect(()=>{
    setValidpwd(()=>PWD_REGEX.test(pwd))
    if(pwd === '' && matchpwd===''){
      setValidMatch(false)
    }else{
      setValidMatch(()=>pwd === matchpwd)
    }
  },[pwd,matchpwd])


  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if(!v1 || !v2 || !validMatch) return;

    try{
      // const res = await axios.post(REGISTER_URL,
      //   JSON.stringify({ user, pwd }),
      //   {
      //     headers: { 'Content-Type': 'application/json' },
      //     withCredentials: true
      //   }
      // )

      const res = await fetch("https://backend-practice-five.vercel.app/api/sign-up",{
        method: 'POST',
        headers:{
          'Content-Type': 'appliaction/json'
        },
        body: JSON.stringify({user,pwd})
      })
  
      if(!res.ok) throw {res}
      
      setSuccess(true)
    }catch(err:any){
      if (!err?.res) {
        setErrMsg('No Server Response');
      } else if (err.res?.status === 409) {
          setErrMsg('Username Taken');
      } else {
          setErrMsg('Registration Failed')
      }
    }
    
  }


  return (
    <>
    {success ? (
      <section className="min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-3xl">Signed up successfully</h1>
          <button 
            onClick={()=>window.location.href="/login"}
          className="text-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:ring-2 w-28 
            py-3 rounded-md mt-7">Sign In</button>
      </section>
            ):
      <section className="min-h-screen flex justify-center items-center">
        <form 
            onSubmit={handleSubmit}
            className=" w-[400px] flex flex-col bg-[#08172c] p-7 rounded-md inset-0 shadow-[0px_0px_1px_0px_]">

          {errMsg? 
            <span className="text-2xl text-red-500 font-semibold flex gap-2 items-center mb-4">
              <span><CgDanger /></span> <span>{errMsg}</span> 
            </span> : ""}
            
          <div>
            <h1 className="text-3xl font-bold font-mono mb-5">Registration Form</h1>
          </div>
          <label htmlFor="userName">
            Username : 
              {user && !validUser ? "❌" : user ? "✔️" : ""}
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

              aria-invalid={validUser ? "false" : "true"}
              aria-describedby="uidnote"

              onFocus={()=>setUserFocus(true)}
              onBlur={()=>setUserFocus(false)}

              className="outline-none border-2 rounded-md py-1 px-2 mt-1 text-black focus:ring-2 
                ring-orange-200 transition-all duration-300 mb-3 w-full"
            />

          <p id="uidnote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
              <FaCircleInfo  className="inline mx-1"/>
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
          </p>
          
          <label htmlFor="pwd">
            Password : 
              {pwd && !validPwd ? "❌" : pwd ? "✔️" : ""}
          </label>
          <div className="relative">
            <input 
              type={!show ? "password" : "text"} 
              id="pwd"
              required
              onChange={(e)=>{
                setPwd(e.target.value),
                setErrMsg('')}}

              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"

              onFocus={()=>setPwdFocus(true)}
              onBlur={()=>setPwdFocus(false)}

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

          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FaCircleInfo  className="inline mx-1"/>
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>

          <label htmlFor="matchpwd">
            Confirm Password : 
          </label>
          <input 
            type="password" 
            id="matchpwd"
            required
            onChange={(e)=>{
              setMatchpwd(e.target.value),
              setErrMsg('')
            }}

            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="pwdnote"

            onFocus={()=>setMatchFocus(true)}
            onBlur={()=>setMatchFocus(false)}

            className="outline-none border-2 rounded-md py-1 px-2 mt-1 text-black focus:ring-2 
              ring-orange-200 transition-all duration-300 mb-3 w-full"
          />

          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FaCircleInfo  className="inline mx-1"/>
              Must match the first password input field.
          </p>

          <div className="text-center">
              <button 
                
                className="text-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:ring-2 w-28 
                  py-2 rounded-md mt-7 cursor-pointer">SignUp
              </button>          
          </div>

          <p className="mt-2">
            Already registered?<br />
            <span className="line">
            {/*put router link here*/}
            <a href="/login" className="underline">Sign In</a>
            </span>
          </p>
        </form>      
      </section>

      
     }
  </>
  )
}

export default Register
