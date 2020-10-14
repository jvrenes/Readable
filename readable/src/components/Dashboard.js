import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import PostThumbnail from './PostThumbnail'

class Dashboard extends Component {
    render() {

        const { postsIdsByDate, postsIdsByScore, order } = this.props

        return(
            <div className="card shadow mt-4">
                <div className="card-header text-center">
                    <h1>Readable</h1>
                </div>
                <div className="card-body">
                    <h3 className="m-2">Categories:</h3>
                    <Header />
                    <div className="card-deck">
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

function mapStateToProps ({posts, order}) {
    return {
        order,
        postsIdsByDate: Object.keys(posts)
            .sort((a,b)=> posts[b].timestamp - posts[a].timestamp),
        postsIdsByScore: Object.keys(posts)
            .sort((a,b)=> posts[b].voteScore - posts[a].voteScore),
    }
} 

export default connect(mapStateToProps)(Dashboard)
