import React from "react";
import { connect } from "react-redux";

export const Counter = ({ counter, increment, decrement }) => {
  return (
    <div>
      <p className="counter_title">Counter: {counter}</p>
      <button className="button" onClick={increment}>
        Increment
      </button>
      <button className="button" onClick={decrement}>
        Decrement
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  counter: state.counter.counter 
  //  Use 'counter: state.counter.counter' and replace the above line if you are using combineReducers to ensure that 'counter' matches the correct key in your store.
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: "INCREMENT" }),
  decrement: () => dispatch({ type: "DECREMENT" })
});


// This creates a higher-order component (HOC) that:
// Passes the mapped state and dispatch functions as props to the Counter component.
// Keeps the component in sync with the Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(Counter);