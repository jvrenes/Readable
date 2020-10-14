import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AiFillDislike, AiFillLike } from 'react-icons/ai'

import { formatDate } from '../utils/api'

class Posts extends Component {
    render() {
        const { post } = this.props
        return(
            <div className="card shadow">
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="text-muted mb-0">
                        Score: {post.voteScore} &nbsp;&nbsp; 
                        {post.voteScore < 0 
                        ? <AiFillDislike/>
                        : <AiFillLike/>} </p>
                </div>
                <div className="card-footer">
                    <small className="text-muted ">{formatDate(post.timestamp)}</small>
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps({posts}, id) {
    const post = posts[id.id]
    console.log(post)
    return{
        post
    }
}

export default connect(mapStateToProps)(Posts)