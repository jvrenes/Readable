import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateComment from './CreateComment'

import Comment from './Comment'

class Comments extends Component {

    render() {
        const { commentsIds, comments } = this.props
        return(
            <div className="mt-2 ml-4 mr-2">
                <div className="card-body">
                    <h4 className="text-primary font-weight-bold">Comments</h4>
                    {
                        commentsIds.map((id, index) => (
                            comments[id].deleted === false 
                            ? <Comment key={index} id={id} />
                            : null
                        ))
                    }
                    <CreateComment />
                </div>
            </div>
        )
    }
}

function mapStateToPros ({comments}, {parentID}) {

    return {
        commentsIds: Object.keys(comments)
        .sort((a,b)=> comments[b].timestamp - comments[a].timestamp),
        comments,
        parentID
    }
}
 
export default connect(mapStateToPros)(Comments)