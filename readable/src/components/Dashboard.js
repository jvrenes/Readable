import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import PostThumbnail from './PostThumbnail'

class Dashboard extends Component {
    
    render() {

        const { postsIdsByDate, postsIdsByScore, order, posts } = this.props
 
        return(
            <div className="card shadow mt-4">
                <div className="card-header text-center">
                    <h1 className="text-primary font-weight-bold">Readable</h1>
                </div>
                <div className="card-body container">
                    {/* <h3 className="m-2">Categories:</h3> */}
                    <Header />
                    <div className="card-deck row row-cols-3">
                        {
                            order === 'byDate'
                            ? postsIdsByDate.map((postId, index) => 
                                <PostThumbnail key={index} id={postId} /> )
                            : postsIdsByScore.map((postId, index) => 
                                <PostThumbnail key={index} id={postId} /> )
                        } 
                    </div> 
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    const {order, posts} = state
    return {
        order,
        postsIdsByDate: Object.keys(posts)
            .sort((a,b)=> posts[b].timestamp - posts[a].timestamp),
        postsIdsByScore: Object.keys(posts)
            .sort((a,b)=> posts[b].voteScore - posts[a].voteScore),
        posts,
    }
} 

export default connect(mapStateToProps)(Dashboard)
