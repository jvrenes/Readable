import React, { Component } from 'react'
import { connect } from 'react-redux'
import selectCategory from '../actions/selectCategory'

import Header from './Header'
import PostThumbnail from './PostThumbnail'

class Dashboard extends Component {
    
    render() {
        console.log("PROPSSSSSS: ", this.props)
        const { postsIdsByDate, postsIdsByScore, order, selectedPosts } = this.props

        if (selectedPosts.length > 0) {
            console.log(selectedPosts)
            return (
                <div className="card shadow mt-4">
                    <div className="card-header text-center">
                        <h1 className="text-primary font-weight-bold">Readable</h1>
                    </div>
                    <div className="card-body container">
                        {/* <h3 className="m-2">Categories:</h3> */}
                        <Header />
                        <div className="card-deck row row-cols-3">
                            {
                                selectedPosts.map((post, index) =>
                                    <PostThumbnail key={index} id={post.id} />
                                )
                            }
                        </div> 
                    </div>
                </div>
            )
        }
 
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

function mapStateToProps (state, props) {
    console.log(props)
    const {order, posts} = state
    const selectCategory = props.match.params.category

    // posts.forEach(post => {
    //     console.log(post)
    // })

    return {
        order,
        postsIdsByDate: Object.keys(posts)
            .sort((a,b)=> posts[b].timestamp - posts[a].timestamp),
        postsIdsByScore: Object.keys(posts)
            .sort((a,b)=> posts[b].voteScore - posts[a].voteScore),
        posts,
        selectedPosts: Object.values(posts).filter(post => post.category === selectCategory)
    }
} 
export default connect(mapStateToProps)(Dashboard)
