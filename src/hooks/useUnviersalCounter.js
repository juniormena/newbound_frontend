import {useContext, useEffect} from "react";
import {CounterContext} from "../components/Counter/CounterProvider";


function useUniversalCounter(initialCounter=10){
    const {counter, setCounter} = useContext(CounterContext);

    useEffect(()=>{
        setCounter(initialCounter);
    },[])

    function decrement(){
        setCounter(prevCounter=>(prevCounter-1))
    }

    return [counter, decrement, setCounter];

}


export default useUniversalCounter;