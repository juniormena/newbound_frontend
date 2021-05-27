import {REGISTER_SIP} from "../actions/PhoneTypes";


const jsSIP = {sipStatus: '',success: false}

const phoneReducer = (state = jsSIP, action)=>{
    switch(action.type){
        case REGISTER_SIP:
            return Object.assign({}, state, action.payload)
        default: return state;
    }

}


export default phoneReducer;