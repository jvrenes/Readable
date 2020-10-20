import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Dashboard from './Dashboard'
import Create from  './Create'
import Post from './Post'
import Edit from './Edit'
import Error from './Error'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return (
            <Router>
                <div className='container-sm'>
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route exact path='/category/:category'  component={Dashboard} />
                        <Route exact path='/:category/:id'  component={Post} />
                        <Route exact path='/add' component={Create} />
                        <Route exact path='/post/edit/:id' component={Edit} />
                        <Route component={Error} />
                    </Switch>    
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
