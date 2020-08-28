import React, {Component} from 'react';
import axios from "axios";
import Create from  "./Create";
import View from "./ViewNotes";
import Signup from "./Auth";
import Home from './Home';

export default class Auth extends Component {
    constructor() {
      super();
      this.state = {
          id:"",
          name:"",
          login:false,
          stat:false,
          signupdisplay:false,
          logindisplay:false,
          email:"",
          password:"",
          //name:"",
          Users:[],
          Notes:[],
          viewdisplay:false
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target=event.target;
        const name=target.name;
        const value=target.value;

        this.setState({
            [name]:value,
      })};

    async handleSubmit () {
        console.log(this.state);
        let res=await axios.post("./api/user/login",this.state);
        console.log("response is--",res.data.message, "name is-", res.data.name);
        this.setState({id:res.data.message, name:res.data.name});
        this.setState({stat:res.status});
        console.log(this.state.stat);
        if(this.state.stat===200)
        {
            this.setState({login:true});            
        }
        console.log("login is--",this.state.login);
        console.log("final state-",this.state);
    }


    render(){
        const setlogindisplay =() => {
            this.setState({logindisplay:!this.state.logindisplay});
        }
        if(this.state.login === true)
        {
            return(
                <Home id={this.state.id} login={this.state.login} creatorname={this.state.name} />
            )
        }else{
            return(
                
            <React.Fragment>
            {/* loginpart */}          
            <h6>Click here to Login!</h6>
            <button onClick={setlogindisplay}>LOGIN</button>
            {this.state.logindisplay?
            <>
            <div className="card">
            <form name="loggingin">
                email:
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange} /><br/><hr/>
              password:
              <input type="text" name="password" value={this.state.password} onChange={this.handleChange} /><br/><hr/>
              </form>
          <button color="danger" onClick={this.handleSubmit}>LOGIN</button>
            </div>
            </>:<></>
            }
        {
            <>
            {/* // signuppart */}
            <h6>New User?Click here to Signup!</h6><Signup />
            </>
        }
            </React.Fragment>
            )
        }
  }
    } 