import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import toggleOrder from '../actions/order'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



class Header extends Component {
    state = {
        order: 'byDate'
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState(() => ({
            order: this.state.order === 'byDate' ? 'byScore' : 'byDate'
        }))
        this.props.dispatch(toggleOrder(this.state.order === 'byDate' ? 'byScore' : 'byDate'))
    }

    render() {
        const { categories } = this.props

        return (
            <Fragment>
                <div className="d-flex justify-content-between">
                    <div>
                        {
                        Object.keys(categories).map((key, index) => {
                            return <button key={index} type="button" className="btn m-2 btn-primary btn-lg">{categories[key].name}</button>
                        })
                        }
                    </div>
                    <div>
                        <Link to='/add'><button type="button" className="btn m-2 btn-outline-primary btn-lg">+ new</button></Link>
                    </div>
                </div>

                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.order === 'byDate' ? true : false}
                                onChange={this.handleChange}
                                name="checkedA" 
                                color="primary"
                            />
                        }
                        label="By date"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                              checked={this.state.order === 'byScore' ? true : false}
                              onChange={this.handleChange}
                              name="checkedB"
                              color="primary"
                            />
                        }
                        label="By score"
                    />
                    </FormGroup>

               
            </Fragment>
        )
    }
}

function mapStateToProps ({categories, order}) {
    return {
        categories,
        order
    }
}

export default connect(mapStateToProps)(Header)