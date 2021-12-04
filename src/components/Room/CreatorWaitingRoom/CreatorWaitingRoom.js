import React from 'react'
import InvigilatorPage from './InvigilatorPage/InvigilatorPage'

function CreatorWaitingRoom({started,setStarted}) {
    return (
        started?
            <InvigilatorPage />
        :
            <div>
                Waiting Room
            </div>
    )
}

export default CreatorWaitingRoom
