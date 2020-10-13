import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';

import  Dashboard from './Dashboard'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return (
            <div className='container-sm'>
                <Dashboard />
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
