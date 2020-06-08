import React from 'react';

const Signout = ({changepage}) => {
return(
 <div style={{display:'flex', justifyContent: 'flex-end'}}>
  <p onClick={() => changepage("signin")} className='pa2 mr2 underline pointer'> 
      Sign Out 
  </p>
 </div>

)
}


export default Signout;