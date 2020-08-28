import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class nav extends Component{

    render(){
        return(
            <div>
                <Link to='/create'>Create</Link><br/><hr/>
                <Link to='/view'>View</Link>
            </div>
            );
    }


};

