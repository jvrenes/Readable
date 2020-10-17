import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/api'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { Button } from 'react-bootstrap'


class Post extends Component {
    render() {
        const { post, id } = this.props
        return (
            <div className="card shadow mt-4">
                <div className="card-header text-center">
                    <h1 className="text-primary font-weight-bold"><Link to='/'>Readable</Link></h1>
                </div>
                <div className="card-body container fluid">
                    <div className="card-deck row">
                        <div className="card shadow mt-4">
                            <div className="card-header text-center">
                                <h3 className="text-primary float-left font-weight-bold d-inline">Post details</h3>
                                <div className="float-right">
                                    <Button>Edit</Button>
                                    <Button className="ml-2">Delete</Button>
                                </div>
                            </div>
                            <div className="card-body">
                                <p>Title: {post.title}</p>
                                <p>Category: {post.category}</p>
                                <p>Author: {post.author}</p>
                                <p>Body: {post.body}</p>
                                <p>Date: {formatDate(post.timestamp)}</p>
                                <p>
                                Score: {post.voteScore} &nbsp;&nbsp; 
                                {post.voteScore < 0 
                                ? <AiFillDislike/>
                                : <AiFillLike/>}
                                </p>
                            </div>
                        </div>
                    </div> 
                </div> 
            </div>
        )
    }
}

function mapStateToProps({posts}, props) {
    const { id } = props.match.params
    const post = posts[id]
    console.log(id)
    
    return{
        post,
        id,
    }
}

export default connect(mapStateToProps)(Post)