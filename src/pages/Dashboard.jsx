
import React, { useState} from 'react';
import validator from 'validator';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import View from '../componenets/View';






const getDatafromLS=()=>{
  const data = localStorage.getItem('userinfos');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}


function Dashboard() {
  const[userinfo,setuserinfo]=useState(getDatafromLS());
  const initialValue={username:"",email:"",pasword:"",phoneNo:""};
  const [foamValue, setFormValue]= useState(initialValue);
  const [userError, setUserError]= useState('');
  const [emailError, setEmailError]= useState('');
  const [paswordError, setPaswordError]= useState('');
  const [phoneError, setPhoneError]= useState('');
  const [issubmit, setissubmit]= useState(false);
  const [visible, setvisible]= useState(false);
  
  
  const handleOnChange=(e)=>{
    const {name,value}=e.target;
    setFormValue({...foamValue,[name]:value});
    console.log(foamValue);
  }
 
 
  const handleupclick=(e)=>{
      e.preventDefault(); 

    

      
      if(foamValue.username===""){
        
        setUserError ('enter user name');
        issubmit(false);
      }
      else{
        setUserError ('');
        setissubmit(true);
      }
      if(validator.isEmail(foamValue.email)) {
        setEmailError('')
        setissubmit(true);
      } else {
        setEmailError('Enter valid Email!')
        issubmit(false);
      }
      if(foamValue.pasword.length<5){
        setPaswordError('pasword must be six character')
        issubmit(false);
      }else{
      setPaswordError('')
      setissubmit(true);
      }
      if(foamValue.phoneNo===""){
        setPhoneError('Phone# is required')
        issubmit(false);
      }
      else{
        setPhoneError('')
        setissubmit(true);
      }
      if(issubmit===false){
        //alert("some thing is missing")

      }
      else{
        const userNames=foamValue.username;
        const useremails=foamValue.email;
        const userpass=foamValue.pasword;
        const userphone=foamValue.phoneNo;
        let userinformation={
          userNames,
          useremails,
          userpass,
          userphone
        }
        setuserinfo([...userinfo,userinformation])
       // alert("entered sucessfully")
        localStorage.setItem("userinfos",JSON.stringify(userinfo)); 
        setvisible(false) ; 
      }
    }
   
      
  

  
  
  return (
    <div className="container">
   
       {visible &&
      <div className="foamcontainer">

    <Form>
    <h1> Registration Form</h1>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="username" name= "username" placeholder="Enter User Name" value={foamValue.username} onChange={handleOnChange}/>
      
      </Form.Group>
      <span style={{
          fontSize:15,
          color: 'red',
        }}>{userError}</span>
      

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        
        <Form.Control type="email" name= "email" placeholder="Enter email" value={foamValue.email} onChange={handleOnChange}/>

        <span style={{
          fontSize:15,
          color: 'red',
        }}>{emailError}</span>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        
        <Form.Control type="password" name= "pasword" placeholder="password" value={foamValue.pasword} onChange={handleOnChange}/>

        <span style={{
          fontSize:15,
          color: 'red',
        }}>{paswordError}</span>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="phoneNo" name= "phoneNo" placeholder="phoneNo" value={foamValue.phoneNo} onChange={handleOnChange}/>
        <span style={{
          fontSize:15,
          color: 'red',
        }}>{phoneError}</span>
      </Form.Group>
    
      <Button variant="primary" className="submitbtn" type="submit" on onClick={handleupclick} style={{
         margin:10,
         marginLeft:40
      }}>
        Submit
      </Button>
      
      <Button variant="primary" type="submit" >
        Cancel
      </Button>
      
    </Form>
    </div> 
}
   {!visible &&
    <div className="view_container">

    <div className='table_cont'>
    {userinfo.length>0&&<>
            <div className='table-responsive'>
              <table border={3} width="30px" cellPadding={10} className='table'>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  <View userinfo={userinfo}/>
                </tbody>
              </table>
            </div>

          </>}
          </div>
          <div className="tablebtn">
          {/* {userinfo.length < 1 && <div>No User Added</div>} */}
          <Button variant="primary" className="adduserbtn" type="adduserbtn" onClick={()=>setvisible(true)} style={{
         
       marginLeft:10
      }}>
        Add New User 
      </Button>
      
      </div>
    </div>
}
    </div> 
    
    

  )
}

export default Dashboard
