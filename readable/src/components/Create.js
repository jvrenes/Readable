import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { generateId } from '../utils/api'
import { handleAddPost } from '../actions/posts'

class Create extends Component {

    state = {
        id: generateId(),
        timestamp: Date.now(),
        title: '',
        body: '',
        author: '',
        category: '',
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.dispatch(handleAddPost(this.state))
        
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

    render() {
        const { categoryNames } = this.props
        return(
            <div className="card shadow mt-4">
                <div className="card-header text-center">
                    <h1 className="text-primary font-weight-bold">Readable</h1>
                </div>
                <div className="card-body">
                    <h3 className="m-2 text-center">Create New Post</h3>
                    
                    <div className="card-deck m-4">
                        <Form className="col-md-12" onSubmit={this.handleSubmit}>
                            <Row className="mb-4">
                                <Col>
                                    <Form.Control onChange={this.handleAuthor} value={this.state.author} size="lg" placeholder="Author" required />
                                </Col>
                                <Col>
                                    <Form.Control onChange={this.handleCategory} as="select" size="lg" defaultValue="Choose category..." required>
                                        <option disabled>Choose category...</option>
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
                                    <Form.Control onChange={this.handleTitle} className="" size="lg" placeholder="Title" required/>
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                <Col>
                                    <Form.Control onChange={this.handleBody} as="textarea" heigth={"300px"} className="" size="lg" placeholder="Post content"/>
                                </Col>
                            </Row>
                           
                            <Button variant="primary" type="submit" size="lg">
                                Submit
                            </Button>
                        </Form>
                    </div> 
                </div>
            </div>
        )
    }
}

function mapStateToProps ({categories}) {
    const categoryNames = []
    Object.keys(categories).map((category) => (
        categoryNames.push(categories[category].name)
    ))
    return {
        categoryNames
    }
}

export default connect(mapStateToProps)(Create)