import { AnimatePresence, motion } from 'framer-motion'
import React, {useEffect,useState } from 'react'
import{FaBars, FaHome,FaUser} from 'react-icons/fa'
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiColorFill, BiSearch} from "react-icons/bi";
import {AiTwotoneFileExclamation,AiFillHeart } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import App from '../App';


const Loginuserdetail=()=>{
    const data = localStorage.getItem('logoutinfo');
    if(data){
      return JSON.parse(data);
    }
    else{
      return []
    }
  }
  
const routes=[
    {
        path:"/",
        name:"Home",
        icon:<FaHome/>
    },
   
    {
        path: "/users",
        name: "Users",
        icon: <FaUser />,
      },
      {
        path: "/messages",
        name: "Messages",
        icon: <MdMessage />,
      },
      {
        path: "/analytics",
        name: "Analytics",
        icon: <BiAnalyse />,
      },
      {
        path: "/file-manager",
        name: "File Manager",
        icon: <AiTwotoneFileExclamation />,
        },
      {
        path: "/order",
        name: "Order",
        icon: <BsCartCheck />,
      },
      {
        path: "/saved",
        name: "Saved",
        icon: <AiFillHeart />,
      },
]
const Sidebar = ({children}) => {

    const [visible, setvisible]= useState(false);
    const [name, setname]= useState("");
    const [phone, setphone]= useState("");
    const[userinfo,setuserinfo]=useState(Loginuserdetail());
    const navigate = useNavigate();


    const [isOpen,setIsOpen]=useState(false);

    useEffect(() => { userinfo.map(item=>(
         setname(item.userNames.toUpperCase()),
        setphone(item.userphone)
       ))  });
    


    const toggle=()=>setIsOpen(!isOpen);
     const inputAnimation={
        hidden:{
            width:0,
            padding:0,
            opacity:0,
            transition:{
                duration:0.2,
            }
        },
        show:{
            width:"140px",
            opacity:1,
            padding:"5px 15px",
            
            transition:{
                duration:0.2,
            },
        },
    };

        const showAnimation ={
            hidden:{
                width:0,
                opacity:0,
                transition:{
                    duration:0.5,
                }
            },
            show:{
                width:"auto",
                opacity:1,
                transition:{
                    duration:0.5,
                },
            },
        };
       

        const handlelogout=(e)=>{
            e.preventDefault(); 
            setvisible(true);
            localStorage.removeItem("logoutinfo")
            navigate("/");
            window.location.reload(true)


    
        }

  return (
        <div className="main-container">
            
            <motion.div animate={{width:isOpen ? "200px" :"40px" ,
          transition:{
            duration:0.5,
            type:"spring",
            damping:11,
              },
              }} className="sidebar">
                 <div className="top_section">
                    {isOpen && <h1 className="logo">Side bar</h1>}
                    
                    <div className="bars">
                        <FaBars onClick={toggle }/>
                    </div>
                 </div>
                 <div className="search">
                    <div className="search_icon">
                        <BiSearch/> 
                    </div>
                    <AnimatePresence>
                    {isOpen && <motion.input
                      initial="hidden"
                      animate="show"
                       exist="hidden" 
                       variants={inputAnimation} 
                       placeholder="search..."/>
                   }
                    </AnimatePresence>
                    
                    
                 </div>
                <section className="routes">
                    {
                        routes.map((route)=>(
                            
                        <NavLink to={route.path} key={route.name} className="link">
                            <div className="icon">{route.icon}</div>
                            <AnimatePresence>
                            {isOpen && <motion.div 
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exist="hidden"
                            className="link_text">{route.name}</motion.div>
                            }
                            </AnimatePresence>
                            
                        </NavLink>
                       
                        ))}
                </section>
                

            </motion.div>

            <main>
                <header>
			
			     
				<nav className="profile" style={{

                    // backgroundColor:'rgb(10, 2, 41)',
                    padding:2,
                    marginRight:40,
                    borderRadius:'12px',
                    color:'white'

                }}>
                   {name}<br/>
                 Phone# {phone}
                </nav>
                
					
           
			<button className="nav-btn" on onClick={handlelogout} style={{
                padding:'12px 28px',
                backgroundColor:'rgb(10, 2, 41)',
                borderRadius: '12px',
                borderColor:'rgb(10, 2, 41)',
                color:'white'
                }}>
				Log out
			</button>
		</header>
                
                
                
                {children}</main>
                {/* {visible &&

                    
                 
                  window.location.reload(true)
               
                } */}

        </div>
  )
}

export default Sidebar
