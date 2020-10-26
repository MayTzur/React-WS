import * as firebase from "firebase";
import "firebase/firestore";

const config = {
    apiKey: " ... ",
    authDomain: " ... ",
    databaseURL: " ... ",
    projectId: "david-mey-tal",
    storageBucket: " ... ",
    messagingSenderId: " ... ",
    appId: " ... ",
    measurementId: " ... "
};

firebase.initializeApp(config);
const storage = firebase.storage();
const firestore = firebase.firestore();

export { storage, firestore }
