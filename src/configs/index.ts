import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyB8YHBPhgNw3e6oHh8lGDZD0u_H0GTWc1I',
    authDomain: 'cms-ticket-appli.firebaseapp.com',
    projectId: 'cms-ticket-appli',
    storageBucket: 'cms-ticket-appli.appspot.com',
    messagingSenderId: '673662551135',
    appId: '1:673662551135:web:f36e643888a2ebcf2407ea',
    measurementId: 'G-9ZHWRJRPRK',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
