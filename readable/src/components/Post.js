import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/api'
import { AiOutlineDislike, AiOutlineLike, AiFillDislike, AiFillLike } from 'react-icons/ai'
import { Button } from 'react-bootstrap'
import { handleChangeVote, handleDeletePost, handleGetPost } from '../actions/posts'
import { handleComments } from '../actions/comments'
import Comments from './Comments'
import Error from './Error'
import { getPost } from '../utils/api'


class Post extends Component {

    state = {
        post: null,
        toHome: false
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
        const { post } = this.state
        this.props.dispatch(handleDeletePost(post))
        this.setState(() => ({
            toHome: true
        }))
    }

    componentDidMount () {
        const { id, dispatch, post } = this.props
        dispatch(handleComments(id))
        if (post === null) {
            dispatch(handleGetPost(id))
                getPost(id)
                    .then((data) => {
                        if(data.error === "There was an error.") {
                            this.setState(() => ({
                                post: 'error'
                            }))
                        } else {
                            this.setState(() => ({
                                post: data
                            }))
                        }
                    })
        } else {
            this.setState(() => ({
                post: post
            }))
        }
    }

    render() {
        const { id } = this.props
        const { post } = this.state
        if (post === 'error' || post === null) {
            return (
                <Error />
            )
        } else {
            return (
                <div className="card shadow mt-4">
                    <div className="card-header text-center">
                        <h1 className="text-primary font-weight-bold"><Link to='/'>Readable</Link></h1>
                    </div>
                    <div className="card-body container fluid">
                        <div className="card-deck row d-flex flex-column ">
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
                            <Comments parentId={id} /> 
                        </div> 
                    </div> 
                </div>
            ) 
        }
    }
}

function mapStateToProps( {posts}, props) {
    const { id } = props.match.params
    const post = posts[id] ? posts[id] : null
    return{
        id,
        post
    }
}

export default connect(mapStateToProps)(Post)