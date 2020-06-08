import React from 'react';


class Signin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      signinemail: "",
      signinpwd: ""
    }
      
  }

 
  onemailchange = (event) => {
  this.setState({signinemail: event.target.value})
   }

  onpwdchange = (event) => {
    this.setState({signinpwd: event.target.value})
  }

  onsubmit = () => {
     fetch('http://localhost:3000/signin',  {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: this.state.signinemail,
        pwd: this.state.signinpwd
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
      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
        type="email" 
        name="email-address"  
        id="email-address" 
        onChange={this.onemailchange}/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" 
        type="password" 
        name="password"  
        id="password" 
        onChange={this.onpwdchange} />
      </div>
      </fieldset>
    <div className="">
      <input onClick={this.onsubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit" value="Sign In" />
    </div>
    <div className="lh-copy mt3">
      <p className="b br3 pa4"> New User? 
    <input onClick={() => this.props.changepage("register")} className="b ml3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit" value="Register" />
      </p>
    </div>
  </div>
</main>
</article>
 </div>

)

    }
}

export default Signin;