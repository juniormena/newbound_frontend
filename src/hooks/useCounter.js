import {useState} from "react";



function useCounter(initialCounter=0, type){
    const [counter, setCounter] = useState(initialCounter);

    function increment(){
        setCounter(prevCounter=>(prevCounter+1))
    }

    function decrement(){
        setCounter(prevCounter=>(prevCounter-1))
    }

    if(type==="increment"){
        return [counter, increment];
    }
    else if(type==="decrement"){
        return [counter, decrement, setCounter];
    }
    else{
        return [counter, increment, decrement];
    }
}


export default useCounter;