import React, { Component } from 'react'
import { connect } from 'react-redux'
import Categories from './Categories'

class Dashboard extends Component {
    render() {
        return(
            <div className="card">
                <div className="card-header text-center">
                    <h1>Readable</h1>
                </div>
                <div className="card-body">
                    <h3>Categories:</h3>
                    <Categories />
                </div>
            </div>
        )
    }
}

export default connect()(Dashboard)
