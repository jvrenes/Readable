import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/api'
import { AiOutlineDislike, AiOutlineLike, AiFillDislike, AiFillLike } from 'react-icons/ai'
import { handleDeleteComment, handleUpdateScore } from '../actions/comments'

class Comment extends Component {

    handleVoteUp = () => {
        const {id, dispatch} = this.props
        const vote = 'upVote'
        dispatch(handleUpdateScore(vote, id))
    }

    handleVoteDown = () => {
        const {id, dispatch} = this.props
        const vote = 'downVote'
        dispatch(handleUpdateScore(vote, id))
    }

    handleDelete = () => {
        const { id, dispatch } = this.props
        dispatch(handleDeleteComment(id))
    }

    render() {
        const { comments, id } = this.props
        return(
            <div className="d-flex flex-row comment-row mt-4">
                <div className="comment-text w-100">
                    <h6 className="font-medium">{comments[id].author} </h6>
                    <span className="float-right text-muted">{comments[id].voteScore}{comments[id].voteScore < 0 ? <AiFillDislike/> : <AiFillLike/>}
                    </span>
                    <span className="m-b-15 d-block">This is awesome website. I would love to comeback again. </span>
                    <AiOutlineLike onClick={this.handleVoteUp} size={25} className="vote"/>
                    <AiOutlineDislike onClick={this.handleVoteDown} size={25} className="vote"/>
                    <div className="comment-footer mt-2">
                        <span className="text-muted float-right">{formatDate(comments[id].timestamp)}</span>

                        <button type="button" className="btn btn-outline-primary btn-sm mr-2">Edit</button>
                        <button type="button" onClick={this.handleDelete} className="btn btn-outline-primary btn-sm">Delete</button> 
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({comments}, {id}) {

    return {
        comments,
        id
    }
}

export default connect(mapStateToProps)(Comment)