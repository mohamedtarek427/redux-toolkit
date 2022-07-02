import { useSelector , useDispatch } from "react-redux";
import { increase, decrease } from '../store/counterSlice';
import {  logIn, logOut } from '../store/authSlice';
import { useCallback , useEffect } from "react";
const Counter = () => { 
const globalState = useSelector((state) =>  state );
const dispatch = useDispatch();
const counterHandler = useCallback((type, value) => {
    if(type === 'increase') {
        dispatch(increase(value))
    }
    else {
        dispatch(decrease(value))
    }
}, [dispatch])

useEffect(() => {
    counterHandler('increase', 0)
}, [counterHandler])

const isLoggedIn = () => {
    return globalState.auth.isLoggedIn
}
const loginHandler = (status) => {
    if(status) {  
        dispatch(logOut())
    }
    else {
        dispatch(logIn())
    } 
};
return (
    <div className="App">
    {
        isLoggedIn() && (
        <div>
        <div className="counter"> counter : {globalState.counter.value}</div>
        <div>
        <button className="btn" onClick={() => counterHandler("increase", 5)} >
        increase +
        </button>
        <button className="btn" onClick={() => counterHandler("decrease", 5) } >
        decrease -
        </button>
        </div>
        </div>
    )}
     <div>
        <button className="btn" onClick={() => loginHandler(isLoggedIn())}> {isLoggedIn() ? 'Logout' : 'Login'} </button>
        </div>
        </div>
        );
    };
export default Counter