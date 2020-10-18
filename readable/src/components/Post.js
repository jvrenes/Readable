import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { formatDate } from '../utils/api'
import { AiOutlineDislike, AiOutlineLike, AiFillDislike, AiFillLike } from 'react-icons/ai'
import { Button } from 'react-bootstrap'
import { handleChangeVote, handleDeletePost } from '../actions/posts'
import { handleComments } from '../actions/comments'


class Post extends Component {

    state = {
        toHome: false,
    }

    componentDidMount() {
        const { id } = this.props
        this.props.dispatch(handleComments(id))
    }

    handleVoteUp = () => {
        const { id } = this.props
        const vote = 'upVote'
        this.props.dispatch(handleChangeVote(vote, id))
    }

    handleVoteDown = () => {
        const { id } = this.props
        const vote = 'downVote'
        this.props.dispatch(handleChangeVote(vote, id))
    }

    handleDelete = () => {
        const { post } = this.props
        this.props.dispatch(handleDeletePost(post))
        this.setState(() => ({
            toHome: true
        }))
    }

    render() {
        const { post, id } = this.props

        if (post === undefined || this.state.toHome === true) {
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
                                        <Button onClick={this.handleDelete} className="ml-2">Delete</Button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h4 className="mb-4 mt-2">{post.title}</h4>
                                    <h5 className="mb-4">{post.body}</h5>
                                    <p>Category: {post.category}</p>
                                    <p>Author: {post.author}</p>
                                    <div>
                                        <AiOutlineLike onClick={this.handleVoteUp} size={25} className="vote"/>
                                        <AiOutlineDislike onClick={this.handleVoteDown} size={25} className="vote"/>
                                    </div>
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

function mapStateToProps({posts, comments}, props) {
    const { id } = props.match.params
    const post = posts[id]
    
    return{
        post,
        id,
    }
}

export default connect(mapStateToProps)(Post)