
const initialState = {
    entities: [],
    status: "idle",
}



function userReducer(state = initialState, action) {
    switch (action.type) {
        case "user/userAdded":
            return {
                ...state,
                entities: [...state.entities, action.payload]
            };
        
    }
}


export default userReducer;