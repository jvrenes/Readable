import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Dashboard from './Dashboard'
import Create from  './Create'
import Post from './Post'
import Edit from './Edit'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return (
            <Router>
                <div className='container-sm'>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/post/:id' exact component={Post} />
                    <Route path='/category/:category' exact component={Dashboard} />
                    <Route exact path='/add' component={Create} />
                    <Route exact path='/post/edit/:id' component={Edit} />
                </div>
            </Router>
        )
    }
}

function mapStateToProps(categories){
    return {
        categories
    }
}

export default connect(mapStateToProps)(App);
