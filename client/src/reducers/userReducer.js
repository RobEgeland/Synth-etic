
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
        

        case "cats/catAdd/pending":
            return {
                ...state,
                status: "loading",
            };
        case "cats/catAdd/fu"
    }
}


export default userReducer;