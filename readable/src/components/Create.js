import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'

class Create extends Component {

    state = {
        post: {
            
        }
    }

    handleSubmit = () => {
        console.log("HANDELING SUBMIT")
        //TODO: handle submit
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
                        <Form className="col-md-12">
                            <Row className="mb-4">
                                <Col>
                                    <Form.Control size="lg" placeholder="Author" />
                                </Col>
                                <Col>
                                    <Form.Control as="select" size="lg" defaultValue="Choose category...">
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
                                    <Form.Control className="" size="lg" placeholder="Title"/>
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                <Col>
                                    <Form.Control as="textarea" heigth={"300px"} className="" size="lg" placeholder="Post content"/>
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
    Object.keys(categories).map((category) => {
        categoryNames.push(categories[category].name)
    })
    return {
        categoryNames
    }
}

export default connect(mapStateToProps)(Create)