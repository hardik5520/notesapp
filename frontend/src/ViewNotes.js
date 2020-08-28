import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import "./Auth";
import Update from './Updatenote';

class ViewNotes extends Component {
  constructor() {
    super();
    this.state = {
      flag:false,
      id:"",
      Notes: [],
      login:false,
      viewdisplay:false
    };
  }
  componentDidMount=(props)=>{
    this.setState({id:this.props.id, login:this.props.login});
  }

  viewnotesbyid = (props) => {
    console.log(this.props.id);
    this.setState({id:this.props.id, login:this.props.login,flag:this.props.flag});
    console.log("stateis==",this.props.flag);
    //console.log(`./api/note/${this.state.id}`);
    axios
  .get(`/api/note/${this.state.id}`)
  .then((response) => {
    const Notes=response.data.note;
    this.setState({ Notes});
    //console.log(this.state.Notes);
  })
  .catch((err) => {
    console.log(err);
  });
}
handleDelete = (_id) => {
    axios.delete(`/api/note/${_id} `);
    console.log("Note Deleted ", { _id });
  };


  render() {
    const setviewdisplay =() => {
      this.setState({viewdisplay:!this.state.viewdisplay});
  }
    return (

      <React.Fragment>
        
        <button onClick={() => {this.viewnotesbyid(); setviewdisplay();}}>VIEW</button>
        {this.state.viewdisplay?
        <>
        {this.state.Notes.map((obj, idx) => (
            <div key={idx} className="card">
            <h5>{`${obj.title}`}</h5>
            <h6>{`${obj.descreption}`}</h6>
            <div>
             <button onClick={() => {
                 this.handleDelete(obj._id);
                   }}>DELETE</button>
           </div>
           <div><Update id={obj._id} title={obj.title} descreption={obj.descreption} /></div>
         </div>
       ))}
       </>:<></>
  }
    </React.Fragment>
    )
  }
}

  export default ViewNotes;