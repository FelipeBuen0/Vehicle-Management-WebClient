import React from 'react'
import './style.css';
export const NotFound = () => {
    return (
        <div className='notFound flex flex-column justify-content-center align-items-center'>
            <i className='pi pi-times-circle' style={{fontSize: '4rem'}}></i>
            <h1 className='error-no-margin'>Error 404</h1>
            <h3>Page not Found!</h3>
        </div>
    )
}
