import React, {Component} from 'react';
import axios from 'axios';
//import {FaSpinner} from 'react-icons/fa';
export default class Create extends Component {
    constructor(){
        super();
        this.state = {
            displaycreate:'',
            title:'',
            descreption:'',
            creator:"",
            creatorname:""
          };
          this.handleChange=this.handleChange.bind(this);
          this.handleSubmit=this.handleSubmit.bind(this);
    }

  handleChange = (event,props) => {
    const creator=this.props.id;
    this.setState({creator:creator});
    const creatorname=this.props.creatorname;
    this.setState({creatorname:creatorname});

    const target=event.target;
    const name=target.name;
    const value=target.value;

    this.setState({
        [name]:value,
    });
    this.setState({creator:this.props.id, creatorname:this.props.creatorname});
  }
  
 async handleSubmit ()  {
     console.log("final state here=",this.state);
      await axios.post('/api/note',this.state).then().catch((err) => {console.log("ERROR=",err)});
      console.log("create state--",this.state);
  };
  
  render() {
    const setdisplaycreate=()=> {
        this.setState({displaycreate:!this.state.displaycreate})
    }

    return (
      <div>
          <button className="button-use" onClick={setdisplaycreate}>Create</button>
          {this.state.displaycreate?            
           <>
              <div className="card">
                  <form name="newNote">
                      title:
                      <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required /><br/>
                      descreption:
                      <input type="text" name="descreption" value={this.state.descreption} onChange={this.handleChange} required />
                      <br/>                   
                  </form>
                  <button color="danger" onClick={this.handleSubmit}>add</button>                  
              </div>
          </>:<></>}
      </div>
    );
  }
}
