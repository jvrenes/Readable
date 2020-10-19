import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetComments } from '../actions/comments'
import { handleInitialData } from '../actions/shared'
 
import Header from './Header'
import PostThumbnail from './PostThumbnail'

class Dashboard extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
        this.props.dispatch(resetComments())
    }

    render() {

        const { order, selectedCategory, postsIdsByDate, postsIdsByScore, posts } = this.props
        let postsToRender = []
        
        if ( order === 'byDate' && selectedCategory !== undefined) {
            postsToRender = postsIdsByDate.filter(id => posts[id].category === selectedCategory)
        } else if ( order === 'byScore' && selectedCategory !== undefined) {
            postsToRender = postsIdsByScore.filter(id => posts[id].category === selectedCategory)
        } else if (order === 'byDate' && selectedCategory === undefined) {
            postsToRender = postsIdsByDate
        } else if (order === 'byScore' && selectedCategory === undefined) {
            postsToRender = postsIdsByScore
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
                        postsToRender.length > 0     
                            ? postsToRender.map((postId, index) => 
                                posts[postId].deleted === false
                                ? <PostThumbnail key={index} id={postId} />
                                : null
                                )
                            : <h3>no results</h3>

                    
                        } 
                    </div> 
                </div>
            </div>
        )
    }
}

function mapStateToProps (state, props) {

    const { order, posts } = state
    const selectedCategory = props.match.params.category
    

    return {
        order,
        selectedCategory,
        posts, 
        postsIdsByDate: Object.keys(posts).sort((a,b)=> posts[b].timestamp - posts[a].timestamp),
        postsIdsByScore: Object.keys(posts).sort((a,b)=> posts[b].voteScore - posts[a].voteScore)
    }
} 
export default connect(mapStateToProps)(Dashboard)
