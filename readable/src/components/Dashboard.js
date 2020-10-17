import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import PostThumbnail from './PostThumbnail'

class Dashboard extends Component {


    
    render() {

        console.log(this.props)

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
                                <PostThumbnail key={index} id={postId} />
                                )
                            : <h3>no results</h3>

                    
                        } 
                    </div> 
                </div>
            </div>
        )

        
        // if (categoryIdsByScore.length > 0 || categoryIdsByDate > 0) {
        //     return (
        //         <div className="card shadow mt-4">
        //             <div className="card-header text-center">
        //                 <h1 className="text-primary font-weight-bold">Readable</h1>
        //             </div>
        //             <div className="card-body container">
        //                 {/* <h3 className="m-2">Categories:</h3> */}
        //                 <Header />
        //                 <div className="card-deck row row-cols-3">
        //                     {
        //                         order === 'byDate'
        //                         ? categoryIdsByDate.map((postId, index) => 
        //                             <PostThumbnail key={index} id={postId} />)
        //                         : categoryIdsByScore.map((postId, index) =>
        //                             <PostThumbnail key={index} id={postId} />)    

        //                     }
        //                 </div> 
        //             </div>
        //         </div>
        //     )
        // } else if ( selectedCategory === undefined ){
        //     return(
        //         <div className="card shadow mt-4">
        //             <div className="card-header text-center">
        //                 <h1 className="text-primary font-weight-bold">Readable</h1>
        //             </div>
        //             <div className="card-body container">
        //                 {/* <h3 className="m-2">Categories:</h3> */}
        //                 <Header />
        //                 <div className="card-deck row row-cols-3">
        //                     {
        //                         order === 'byDate'
        //                         ? postsIdsByDate.map((postId, index) => 
        //                             <PostThumbnail key={index} id={postId} />
        //                              )
        //                         : postsIdsByScore.map((postId, index) => 
        //                             <PostThumbnail key={index} id={postId} /> )
        //                     } 
        //                 </div> 
        //             </div>
        //         </div>
        //     )    
        // } else {
        //     return(
        //         <div className="card shadow mt-4">
        //             <div className="card-header text-center">
        //                 <h1 className="text-primary font-weight-bold">Readable</h1>
        //             </div>
        //             <div className="card-body container">
        //                 {/* <h3 className="m-2">Categories:</h3> */}
        //                 <Header />
        //                 <h3 className="text-center">No posts found for <em>{selectedCategory}</em> category</h3> 
        //             </div>
        //         </div>
        //     )
        // }
    }
}

function mapStateToProps (state, props) {

    const { order, posts } = state
    const selectedCategory = props.match.params.category
    const postsNonDeleted = Object.keys(posts).filter((id) => posts[id].deleted === false)
    console.log("RAW POSTSTSSSS: ", postsNonDeleted)

    return {
        order,
        selectedCategory,
        posts, 
        postsIdsByDate: postsNonDeleted.sort((a,b)=> posts[b].timestamp - posts[a].timestamp),
        postsIdsByScore: postsNonDeleted.sort((a,b)=> posts[b].voteScore - posts[a].voteScore),
        postsNonDeleted
        
    }
} 
export default connect(mapStateToProps)(Dashboard)
