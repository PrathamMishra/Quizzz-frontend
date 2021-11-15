export const joinRoomAction = (roomData)=>{
    return {
        type: "JOIN ROOM",
        data: roomData
    }
}

export const leaveRoomAction = ()=>{
    return {
        type: "LEAVE ROOM",
        data: null
    }
}