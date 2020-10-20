import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return(
        <div className="card shadow mt-4">
            <div className="card-header text-center">
                <h1 className="text-primary font-weight-bold"><Link to='/'>Readable</Link></h1>
            </div>
            <div className="card-body container">
                <div className="card-deck d-flex flex-column justify-content-between flex-wrap">
                    <h3>Error 404</h3>
                </div> 
            </div>
        </div>
    )

}

export default Error