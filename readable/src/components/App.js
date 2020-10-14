import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';

import Dashboard from './Dashboard'
import Create from  './Create'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return (
            <div className='container-sm'>
                {/* <Dashboard /> */}
                <Create />
            </div>
        )
    }
}

function mapStateToProps(categories){
    return {
        categories
    }
}

export default connect(mapStateToProps)(App);
