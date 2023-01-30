import React from 'react'

const View = ({userinfo}) => {
  return userinfo.map(userinformation=>(
    <tr key={userinformation.userNames}>
            <td>{userinformation.userNames}</td>
            <td>{userinformation.useremails}</td>
            
            <td>{userinformation.userphone}</td>
                   
        </tr>          
  ))
}

export default View
