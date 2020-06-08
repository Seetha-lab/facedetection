import React, { Component } from 'react';
import './App.css';
import Signin from './components/UserNavigation/Signin';
import Signout from './components/UserNavigation/Signout';
import Register from './components/UserNavigation/Register';
import Logo from './components/Logo/Logo';
import Particles from 'react-particles-js';
import FaceDetection from './components/FaceDetection/FaceDetection';
import FaceDetectionFunctionality from './components/FaceDetectionFunctionality/FaceDetectionFunctionality';
import Rank from './components/Rank/Rank';




const particleoptions = {
         particles: {
          number: {
            value: 75,
          density: {
            enable: true,
            value_area: 500

                }
           }
        }
    }

const initialstate = {
  inputurl: '',
  imageurl: '',
  boundingbox: {
    left_col: 0,
    right_col: 0,
    top_row: 0,
    bottom_row: 0 
  },
  onpage: "signin",
  user : {
    name: "",
    email: "",
    id: "",
    entries: 0,
    joined: ""
  },
     
  
  }

class App extends Component {
  constructor() {
    super();
    this.state = initialstate;

  }

  loadUser = (userdata) => {
    this.setState( { 
      user: {
        name: userdata.name,
        email: userdata.email,
        id: userdata.id,
        entries: userdata.entries,
        joined: userdata.joined

      }
    })


  } 

   calculatefacevalue = (data) =>
  {
   const apiboxval = data.outputs[0].data.regions[0].region_info.bounding_box;
   const imgdetail=document.getElementById("image");
   const imgwidth = Number(imgdetail.width);
   const imgheight = Number(imgdetail.height);
   const leftcol=apiboxval.left_col*imgwidth
   const toprow=apiboxval.top_row*imgheight;
   const rightcol=imgwidth - (apiboxval.right_col * imgwidth);
   const bottomrow=imgheight - (apiboxval.bottom_row * imgheight);
 
   this.displayboundingbox(leftcol,rightcol,toprow,bottomrow);

  }

  displayboundingbox = (leftcol,rightcol,toprow,bottomrow) => {
  this.setState(
   {
      boundingbox: {
        left_col: leftcol,
        right_col: rightcol,
        top_row: toprow,
        bottom_row: bottomrow 
      }
    }
 )
 }

  oninput = (event) => {
        this.setState( { inputurl: event.target.value} );
    }   

  onsubmit = (event) => {
    this.setState( { imageurl: this.state.inputurl} );
    fetch("http://localhost:3000/image", {
      method: "post",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({
        input: this.state.inputurl
      })
    }).then(response => response.json())
    .then(response => {
      if(response)
      {
        fetch("http://localhost:3000/image", {
          method: "put",
          headers: { "Content-Type" : "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        }).catch(err => response.json("ERROR fetching"));

      }
      
      this.calculatefacevalue(response)
    })
    .catch(err => console.log(err));
    }

   changepage = (onpage) => {

    if(onpage === "signin") {
      this.setState(initialstate);
    }
     
      this.setState({onpage: onpage})
    }


  render() {
    const {imageurl, boundingbox, onpage} = this.state;
          
      return (
    
    <div className="App">
      <Particles params={particleoptions} className="particles"/>
      {
     (onpage === "home") ?
     <div>
        <Signout changepage={this.changepage}/>
        <Logo /> 
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <FaceDetection oninput={this.oninput} onsubmit={this.onsubmit}/>
        <FaceDetectionFunctionality url={imageurl} boundingbox={boundingbox}/>
        </div>
      : ( (onpage === "register") ? 
           <Register loadUser={this.loadUser} changepage={this.changepage}/> 
          :  <Signin loadUser={this.loadUser} changepage={this.changepage}/> )
      }
      </div>
    
  );
}
}

export default App;
