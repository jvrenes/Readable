import React, { Component } from 'react' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { generateId } from '../utils/api'
import { handleAddComment } from '../actions/comments'
import { Button } from 'react-bootstrap'

class CreateComment extends Component {

    state = {
        id: generateId(),
        timestamp: Date.now(),
        body: '',
        author: '',
        parentId: '',
    }

    updateBody = (e) => {
        e.preventDefault()
        const value = e.target.value
        this.setState(() =>({
            body: value
        }))
    }

    updateAuthor = (e) => {
        e.preventDefault()
        const value = e.target.value
        this.setState(() => ({
            author: value
        }))
    }

    sendComment = (e) => {
        e.preventDefault()
        const { parentId, dispatch } = this.props
        this.setState(() => ({
            id: generateId(),
            timestamp: Date.now(),
            parentId: parentId, 
        }))
        dispatch(handleAddComment(this.state))
        this.setState(() => ({
            body: '',
            author: '',
            timestamp: Date.now(),
            id: generateId(),
        }))
    }

    componentDidMount() {
        const { parentId } = this.props
        this.setState(() => ({
            parentId: parentId
        }))
    }
  
    render() {
        return(
            <div>
                <div className="row ml-0 mt-4 text-primary">
                    <h5 className="d-inline">Add comment</h5>
                </div>
                <div>   
                    <form onSubmit={this.sendComment}>
                        <textarea className="form-control" type="textarea" onChange={(e) => this.updateBody(e)} value={this.state.body} placeholder="Post Content" rows={3} required />
                        <input type="text" className="form-control mt-2"  placeholder="Author name" onChange={(e) => {this.updateAuthor(e)}} value={this.state.author} required ></input>
                        <Button type="submit" className="mt-2">Submit</Button>
                    </form>

                </div>
            </div>
        )
    }
}

function mapStateToProps({state}, {match}) {
    return {
        parentId : match.params.id
    }
}

export default withRouter(connect(mapStateToProps)(CreateComment))