import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { handleModifyPost } from '../actions/posts'
import { withRouter, Link, Redirect } from 'react-router-dom'

class Create extends Component {

    state = {
        id: '',
        timestamp: '',
        title: '',
        body: '',
        author: '',
        category: '',
    }

    handleSubmit = (e, post) => {
        e.preventDefault()
        this.props.dispatch(handleModifyPost(this.state))
        this.props.history.push(`/`)
        
    }

    handleAuthor = (e) => {
        e.preventDefault()
        const author = e.target.value
        this.setState(() => ({
            author: author,
        }))
    }

    handleCategory = (e) => {
        e.preventDefault()
        const category = e.target.value
        this.setState(() => ({
            category: category,
        }))
    } 

    handleTitle = (e) => {
        e.preventDefault()
        const title = e.target.value
        this.setState(() => ({
            title: title,
        }))
    } 

    handleBody = (e) => {
        e.preventDefault()
        const body = e.target.value
        this.setState(() => ({
            body: body
        }))
    }

    componentDidMount() {
        const { post } = this.props
        this.setState(() => ({
            id: post.id,
            timestamp: post.timestamp,
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category,

        }))
    }

    render() {
        const { categoryNames, post } = this.props
        if (post === undefined) {
            return <Redirect to='/' />
        }
        
        return(
            
            <div className="card shadow mt-4">
                <div className="card-header text-center">
                    <h1 className="text-primary font-weight-bold"><Link to='/'>Readable</Link></h1>
                </div>
                <div className="card-body">
                    <h3 className="m-2 text-center">Edit Post</h3>
                    <div className="card-deck m-4">
                        <Form className="col-md-12" onSubmit={(e) =>this.handleSubmit(e, post)}>
                            <Row className="mb-4">
                                <Col>
                                    <Form.Control onChange={this.handleAuthor} value={this.state.author} size="lg"  />
                                </Col>
                                <Col>
                                    
                                    <Form.Control onChange={this.handleCategory} as="select" size="lg" value={post.category} selected={post.category} >
                                        <option disabled>{this.state.category}</option>
                                        {
                                            categoryNames.map((category, index) => {
                                                return <option key={index} value={category}>{category}</option>
                                            })
                                        }
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control onChange={this.handleTitle} value={this.state.title} size="lg"/>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col>
                                    <Form.Label>Post Content</Form.Label>
                                    <Form.Control onChange={this.handleBody} as="textarea" heigth={"300px"} className="" size="lg" value={this.state.body} />
                                </Col>
                            </Row>
                                    
                            <Button variant="primary" type="submit" size="lg">
                                Confirm
                            </Button>
                        </Form>
                    </div> 
                </div>
            </div>
        )
    }
}

function mapStateToProps ({categories, posts}, props) {
    const categoryNames = []
    const { id } = props.match.params 
    const post = posts[id]
    Object.keys(categories).map((category) => (
        categoryNames.push(categories[category].name)
    ))
    
    return {
        categoryNames,
        post,
        id
    }
}

export default withRouter(connect(mapStateToProps)(Create))