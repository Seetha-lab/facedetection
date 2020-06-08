import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png';

const Logo = () => {
return(
 <div style={{display:'flex', justifyContents: 'flex-start'}}>
<Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 <div className="Tilt-inner pa2"> <img alt="logo" src={logo} /></div>
</Tilt>
 </div>

)


}

export default Logo;