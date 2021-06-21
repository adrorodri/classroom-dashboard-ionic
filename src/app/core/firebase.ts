import firebase from 'firebase';
import {firebaseConfig} from '../firebase.config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
