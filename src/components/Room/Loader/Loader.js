import React from 'react'

function Loader({message}) {
    return (
        <div>
            {message}
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
