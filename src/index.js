import React from 'react';
import ReactDOM from 'react-dom';

import memoryUtils from './utils/memoryUtils'
import localstoreUtils from './utils/localstoreUtils'

import App from './App';

const user = localstoreUtils.getUser()

if(user && user._id){
    memoryUtils.user = user
}




ReactDOM.render(<App />, document.getElementById('root'));

