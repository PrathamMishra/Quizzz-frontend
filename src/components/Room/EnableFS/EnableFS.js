import React from 'react'

function EnableFS({fullScreenHandler}) {
    return (
        <div>
            <button className="btn btn-primary btn-lg" onClick={fullScreenHandler.enter} >Enable FullScreen</button>
        </div>
    )
}

export default EnableFS