import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmo6Wz-UU23dJb45gqlPBMybBVsC4gyjM",
    authDomain: "global-eco-creadit.firebaseapp.com",
    projectId: "global-eco-creadit",
    storageBucket: "global-eco-creadit.firebasestorage.app",
    messagingSenderId: "855016235607",
    appId: "1:855016235607:web:de6ee0c0c79e9bb0e87912"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
