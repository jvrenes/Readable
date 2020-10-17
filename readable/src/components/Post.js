import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { formatDate } from '../utils/api'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { Button } from 'react-bootstrap'


class Post extends Component {
    render() {
        const { post, id } = this.props

        if (post === undefined) {
            return <Redirect to='/' />
        } else {
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
                                        <Link to={`/post/edit/${id}`}><Button className="btn m-2 btn-primary">Edit</Button></Link>
                                        <Button className="ml-2">Delete</Button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h4 className="mb-4 mt-2">{post.title}</h4>
                                    <h5 className="mb-4">{post.body}</h5>
                                    <p>Category: {post.category}</p>
                                    <p>Author: {post.author}</p>

                                </div>
                                <div className="card-footer">
                                    <small className="text-muted ">{formatDate(post.timestamp)}</small>
                                    <p className="d-block float-right">
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