import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { AiFillDislike, AiFillLike } from 'react-icons/ai'

import { formatDate } from '../utils/api'

class Posts extends Component {
    render() {
        const { post } = this.props
        return(
            <div className="card p-0 mb-2 " >
                <Link to={`/post/${post.id}`} className="">
                    <div className="card-body">
                        <h5 className="card-title ">{post.title}</h5>
                            <p className="text-muted mb-0 ">
                                Score: {post.voteScore} &nbsp;&nbsp; 
                                {post.voteScore < 0 
                                ? <AiFillDislike/>
                                : <AiFillLike/>}
                            </p>  
                    </div>
                    <div className="card-footer mb-auto">
                        <small className="text-muted ">{formatDate(post.timestamp)}</small>
                                
                    </div>
                </Link>
            </div>
                        
        )
    }
}

function mapStateToProps({posts}, {id}) {
    const post = posts[id]
    return{
        post
    }
}

export default connect(mapStateToProps)(Posts)
