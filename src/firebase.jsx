import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrwaUZ7r6oq1M61R6GCNR4syZQn_lNJ1c",
  authDomain: "fileupload-b75c3.firebaseapp.com",
  projectId: "fileupload-b75c3",
  storageBucket: "fileupload-b75c3.appspot.com",
  messagingSenderId: "889843824386",
  appId: "1:889843824386:web:0372e103bd82b39804741b",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);