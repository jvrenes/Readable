import React, { Component } from 'react'
import { connect } from 'react-redux'

import Comment from './Comment'

class Comments extends Component {

    render() {
        const { comments } = this.props
        return(
            <div className="mt-2 ml-2 mr-2">
                <div className="card-body">
                    <h4 className="text-primary font-weight-bold">Comments</h4>
                    {
                        Object.keys(comments).map((id, index) => (
                            comments[id].deleted === false 
                            ? <Comment key={index} id={id} />
                            : null
                        ))
                    }
                </div>
            </div>
        )
    }
}

function mapStateToPros ({comments}, {parentID}) {
return {
    comments,
    parentID
}
}
 
export default connect(mapStateToPros)(Comments)