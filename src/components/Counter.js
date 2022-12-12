import React, { createContext, useCallback, useContext, useState } from 'react'

const initState = {counter: 0};
const StateContext = createContext();

function reducer(state, action){
    switch(action.type){
        case 'inc':
            return {counter: state.counter + 1};
        case 'dec':
            return {counter: state.counter - 1};
        default:
            return {counter: state}
    }
}

function useReducer(reducer, initState){
    const[state, setState] = useState(initState);

    const dispatch = useCallback((action)=>{
        const newState = reducer(state, action);
        setState(newState);
    }, [setState, state]);
    return [state, dispatch];
}
export default function Counter() {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <StateContext.Provider value={state.counter}>
            <div className='grid grid-rows-2 border border-3'>
                <div className='text-center font-bold'>
                    Counter Component
                </div>
                <div className='grid grid-cols-3 mb-6 border-2'>
                    <div className='justify-self-center'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type='button' onClick={() => dispatch({type: 'inc'})}>
                            Add ( + ) Button
                        </button>
                    </div>
                    <div className='text-center'>
                        Counter Value : {state.counter}
                    </div>
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type='button' onClick={() => dispatch({type: 'dec'})} >
                            Subtract ( - ) Button
                        </button>
                    </div>
                </div>
            </div>
            <Multiplier/>
            <Divider/>
            <Subtractor/>
        </StateContext.Provider>
    )
}

function Multiplier(){
    const stateValue = useContext(StateContext)
    return(
        <>
            <div>
                <div className='grid grid-cols-2 border border-1 mb-6 p-6'>
                    <div>
                        Multiplyer Component:  -5 * {stateValue}
                    </div>
                    <div className=''>
                        New Value: {-5 * stateValue}
                    </div>
                </div>
            </div>
        </>
    )
}

function Divider() {
    const stateValue = useContext(StateContext)
    return (
        <>
            <div>
                <div className='grid grid-cols-2 border border-1 mb-6 p-6'>
                    <div>
                        Divider Component: 6 / {stateValue}
                    </div>
                    <div className=''>
                        New Value: {stateValue === 0 ? 0 : 6 / stateValue}
                    </div>
                </div>
            </div>
        </>
    )
}

function Subtractor(){
    const stateValue = useContext(StateContext);
    return (
        <>
            <div>
                <div className='grid grid-cols-2 border border-1 mb-6 p-6'>
                    <div>
                        Subtraction Component: 4 - {stateValue}
                    </div>
                    <div className=''>
                        New Value: { 4 - stateValue}
                    </div>
                </div>
            </div>
        </>
    )
}