const roomReducer = (state = {roomData: null}, action)=>{
    switch(action.type){
        case "JOIN ROOM":
            return {...state, roomData: action.data};
        case "LEAVE ROOM":
            return {...state, roomData:null};
        default: 
            return state;
    }
}

export default roomReducer;