import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from 'firebase/app';
import 'firebase/database';

import './assets/index.css';
import App from './App';
import firebaseConfig from './setup/firebaseConfig';

ReactDOM.render(
  <>
    <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
      <App />
    </FirebaseDatabaseProvider>
  </>,
  document.getElementById('root')
);
