import React, {Component} from 'react';
import axios from "axios";
// import create from  "./Create";
// import viewnotes from "./ViewNotes";

export default class Auth extends Component {
    constructor() {
      super();
      this.state = {
          signupdisplay:false,
          logindisplay:false,
          email:"",
          password:"",
          name:"",
          Users:[],
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
    }
    viewallusers = () => {
        axios
          .get("/api/user")
          .then((response) => {
            this.setState({ Users: response.data.users});
            console.log("hello",this.state.Users);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
    handleChange(event) {
        const target=event.target;
        const name=target.name;
        const value=target.value;

        this.setState({
            [name]:value,
      })};

      async handleSubmit ()  {
        console.log(this.state);
        let res=await axios.post('/api/user/signup',this.state);
        console.log(res.status);    
        window.location.reload();
    }

    render(){
        const setsignupdisplay =() => {
            this.setState({signupdisplay:!this.state.signupdisplay});
        }
        
        return(
        <React.Fragment>
            <div>
            {/* signuppart */}
          <button onClick={setsignupdisplay}>SIGNUP</button>
          {this.state.signupdisplay?
          <>
          <div className="card">
          <form name="signingup">
            Name:<input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><hr/>
            Email:<input type="text" name="email" value={this.state.email} onChange={this.handleChange} /><hr/>
            password:<input type="text" name="password" value={this.state.password} onChange={this.handleChange} /><hr/>
            </form>
        <button color="danger" onClick={this.handleSubmit}>SIGNUP</button>
          </div>
          </>:<></>
    }
    </div>
          </React.Fragment>)
        }
}
          

