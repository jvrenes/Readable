import React, { Component } from 'react'
import { connect } from 'react-redux'

class Categories extends Component {
    render() {
        const { categories } = this.props

        return (
            <div>
                {
                    Object.keys(categories).map((key, index) => {
                        return <button key={index} type="button" class="btn btn-primary">{categories[key].name}</button>
                })
                }
            </div>
        )
    }
}

function mapStateToProps ({categories}) {
    return {
        categories
    }
}

export default connect(mapStateToProps)(Categories)