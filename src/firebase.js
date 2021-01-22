import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAMDnnzWWvwwtLlZY2fa7s4Nd7c5sdmYjY",
    authDomain: "gameting.firebaseapp.com",
    databaseURL: "https://gameting-default-rtdb.firebaseio.com",
    projectId: "gameting",
    storageBucket: "gameting.appspot.com",
    messagingSenderId: "382413651672",
    appId: "1:382413651672:web:ffa1f98934883463c3e1ad",
    measurementId: "G-W7ZG5BVHM2"
   /* apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID*/
})

export const auth = app.auth()
export const firestore = firebase.firestore()
export default app