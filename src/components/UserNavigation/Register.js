import React from 'react';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pwd: "",
      name: ""
    }
      
  }

  onemailchange = (event) => {
    this.setState({email: event.target.value})
     }
  
    onpwdchange = (event) => {
      this.setState({pwd: event.target.value})
    }


    onnamechange = (event) => {
      this.setState({name: event.target.value})
    }
  
    onsubmit = () => {
        fetch('https://secure-everglades-68119.herokuapp.com/register',  {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          pwd: this.state.pwd
          
        })
      })
      .then(response => response.json())
    .then(user => {
      if(user.email)
      {
        this.props.loadUser(user);
        this.props.changepage("home");
      }
  
    })
  
    }
  



render() {
return(

 
 
 <div className="center">
    <article className="br3 ba dark-gray shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw8">
     <main na="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f2 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
        type="text" name="username"  id="username"
        onChange={this.onnamechange} />
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
        type="email" name="email-address"  id="email-address" 
        onChange={this.onemailchange}/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
        type="password" name="password"  id="password"  
        onChange={this.onpwdchange}/>
      </div>
      </fieldset>
    <div className="mv3">
      <input onClick={this.onsubmit} className="b ph3 pv2 pa4 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit" value="Register" />
    </div>

    
  <p onClick={() => this.props.changepage("signin")} className='pa2 mr2 underline pointer'> 
      Wanna Signin?
  </p>


   </div>
</main>
</article>
 </div>
 
)


}
}

export default Register;