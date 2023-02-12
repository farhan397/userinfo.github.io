
import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Users from './pages/Users';
import Messages from './pages/Messages';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Order from './pages/Order';
import Saved from './pages/Saved';
import Setting from './pages/Setting';
import Filemanagers from './pages/Filemanagers';
import Sidebar from './componenets/Sidebar';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import DashBoards from './pages/DashBoards';


// const bydefaultvisible=1;
const getDatafromLS=()=>{
  const data = localStorage.getItem('userinfos');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

function App() {
  
  const initialValue={email:"",pasword:""};
  const[userinfo,setuserinfo]=useState(getDatafromLS());
  const [foamValue, setFormValue]= useState(initialValue);
  const [visible, setvisible]= useState(1);
  const [emailErrors, setEmailErrors]= useState('');
  const [paswordErrors, setPaswordErrors]= useState('');
  
  const handleOnChange=(e)=>{
   
    const {name,value}=e.target;
    setFormValue({...foamValue,[name]:value});
    console.log(foamValue);
  }
  const handleupclick=(e)=>{
    
    const getDatafromLSS=()=>{
      const data = localStorage.getItem('userinfos');
      if(data){
        return JSON.parse(data);
      }
      else{
        return []
      }
    }
    setuserinfo(getDatafromLSS);
    console.log(userinfo)
   
    const userlogin = userinfo.filter(item => {
      return item.useremails === foamValue.email && item.userpass ===foamValue.pasword;
    });
    console.log(userlogin)
    console.log(userlogin.length)
    
    if(userlogin.length>0)
    {
      
      localStorage.setItem("logoutinfo",JSON.stringify(userlogin)); 
      
          setvisible(2);
    }
   else{
    const checkemail = userinfo.filter(item => {
      return item.useremails === foamValue.email;
      console.log(checkemail.length)
    });
    if(checkemail.length>0)
    {
      setPaswordErrors("invalid password")
      setEmailErrors("")
    }
    else
    {
      setEmailErrors("invalid Email")
      setPaswordErrors("")
      
    }
    
   }
}

// useEffect(() => { 
//   // setuserinfo(getDatafromLSS);
      
//   const getDatafromLSS=()=>{
//       const data = localStorage.getItem('userinfos');
//       if(data){
//         return JSON.parse(data);
//       }
//       else{
//         return []
//       }
//     }
//     //  setuserinfo(getDatafromLSS);


//   });

  return (
    <>
    { visible===1 &&
    <div className="loginsection">
    <section>
        {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
        <h1 style ={{
          textAlign:'center'
          
        }}>Sign In</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Email</Form.Label>
        <Form.Control id='email' type="email" name= "email" placeholder="Enter email" 
         value={foamValue.email} onChange={handleOnChange}
        />
      
      </Form.Group>
      <p style={{
          fontSize:15,
          color: 'red',
        }}>
         {emailErrors}
          </p>
      

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Password</Form.Label>
        
        
        <Form.Control id='paswords' type="password" name= "pasword" placeholder="Enter Password" 
        value={foamValue.pasword} onChange={handleOnChange}
        />

        <p style={{
          fontSize:15,
          color: 'red',
        }}>
          {paswordErrors} 
          </p>
        
      </Form.Group>
       
         <button style={{
          fontSize:15,
          width:"75%",
          padding:2,
          marginLeft:25,
          
          
          color: 'blue',
          
        }} on onClick={handleupclick}>Sign In</button>
        
          <p style={{color: 'black'}}> Need an Account?<br /> </p>
          {/* <span className="line"> */}
          
            <button className="signupbtn" style={{
             fontSize:15,
             width:"75%",
             padding:2,
             marginLeft:25,
             color: 'blue',
        }} on onClick={()=>{
              setvisible(3); 
              
            }}>Sign Up</button> 
           
                  
            {/* </span> */}
             
             
    </section>
    </div>
   }
    
     <Router>
     {visible===2 &&
      <Sidebar>
      <Routes>
        <Route path="/" element={<DashBoards />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/analytics" element={<Analytics />}></Route>
        <Route path="/file-manager" element={<Filemanagers/>}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/saved" element={<Saved />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
        
        {/* <Route path="/Dashboard" element={<Dashboard/>}></Route> */}
      </Routes>
      
      </Sidebar>

     }
     
      </Router>
     
     
   

   {visible===3 &&
   <Dashboard/>
   }
    </>
  );
}

export default App;
