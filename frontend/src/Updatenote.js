import React, {Component} from 'react';
import axios from "axios";

export default class Update extends Component {
    constructor() {
      super();
      this.state = {
          title:"",
          descreption:"",
          creator:"",
          updatedisplay:false,
          olddesc:"",
          oldtitle:""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
    }
   componentDidMount=(props)=>{
        console.log("received title=",this.props.title);
        console.log("received desc=",this.props.descreption);
        this.setState({creator:this.props.id, title:this.props.title, descreption:this.props.descreption}, ()=>{
            console.log("check==",this.state.title);
        });
        console.log("DIDmount",this.state);
    }
    async handleChange(event) {
        const target=event.target;
        const name=target.name;
        const value=target.value;
        this.setState({
            [name]:value,
      })
    };

      async handleSubmit ()  {
          console.log("submit check=",this.state);
        let res=await axios.patch(`/api/note/${this.props.id}`,this.state);
        console.log(res.status); 
        //window.location.reload();   
    }

    render(){
        const setupdatedisplay =() => {
            this.setState({updatedisplay:!this.state.updatedisplay});
        }
        
        return(
        <React.Fragment>
            <div>
            <button onClick={setupdatedisplay}>UPDATE</button>
                {
                    this.state.updatedisplay?
                    <>          
                      <div className="card">
                      <form name="update">
                        Title:
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                        Descreption:
                        <input type="text" name="descreption" value={this.state.descreption} onChange={this.handleChange} />
                        </form>
                    <button color="danger" onClick={this.handleSubmit}>COMMIT CHANGES</button>
                      </div>
                      </>:<></>
                }
            </div>
          </React.Fragment>)
        }
}
          

