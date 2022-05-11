import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, compose, createStore } from "redux";
import { Provider} from "react-redux";
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import { BrowserRouter as Router, Route, Routes, Navigate, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import AppWordGame from './WordGame/AppWordGame';
import AppNumberGame from './NumberGame/AppNumberGame';
import AppRoutes from './AppRoutes';
import AppExpenseTracker from './ExpenseTracker/AppExpenseTracker';
import TransactionReducer from './ExpenseTracker/TransactionReducer';
import WordsReducer from './LearnWords/WordsReducer';
import AppLearnWords from './LearnWords/AppLearnWords';

const saveState = (listWords) => {
  console.log(listWords)
  try {
    const listWordsString = JSON.stringify(listWords);
    localStorage.setItem('listWords', listWordsString);
  } catch(err) {
    console.log(err);
  }
};

const logger = createLogger({
});

const store = createStore(
  WordsReducer,
  compose(
    applyMiddleware(logger, thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  saveState(store.getState().listWords);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <AppRoutes />
    </Provider>  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
