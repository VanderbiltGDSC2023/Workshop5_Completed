// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, query, setDoc, getDoc, getDocs, doc, deleteDoc, loadBundle, where
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOdvX-iWDhXiSf9UU0sAHzIcup0OR0-hQ",
  authDomain: "workshop5-d2900.firebaseapp.com",
  projectId: "workshop5-d2900",
  storageBucket: "workshop5-d2900.appspot.com",
  messagingSenderId: "1051380990442",
  appId: "1:1051380990442:web:4865c90dae99e58a5f7293",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//add a person
const submitButton = document.querySelector("button");

submitButton.addEventListener('click', async ()=> {

    const name = document.getElementById("name").value;
    const month = document.getElementById("month").value.toLowerCase();
    const day = document.getElementById("day").value;
    const year = document.getElementById("year").value;

    document.getElementById('form').reset();

    await setDoc(doc(db, 'people', name), {
        month: month,
        day: day,
        year: year
    })


    updateMonth(month);
})

async function updateMonth(month) {
    const colRef = collection(db, 'people');

    const q = query(colRef, where('month', '==', month));

    try {
        const querySnapshot = await getDocs(q);
        const box = document.getElementById(`${month}`);
        box.innerHTML ='';

        querySnapshot.forEach((doc)=> {

            const monthName = month.charAt(0).toUpperCase() + month.slice(1);
            if(box) {
                const element = document.createElement('div');
                element.textContent = doc.id + ' ' + monthName + ' ' + doc.data().day + ', ' + doc.data().year;
                box.appendChild(element);
            }
        })
    } catch (error) {
        console.error('Error fetching data', error);
    }
}

document.getElementById('delete-button').addEventListener('click', async ()=> {
    console.log("bye");
    const name = document.getElementById('delete-field').value;
    const itemRef = doc(db, 'people', name);
    
    try {
        const itemDoc = await getDoc(itemRef);

        const month = itemDoc.data().month;

        await deleteDoc(itemRef);
        document.getElementById('delete-form').reset();
        updateMonth(month);

    } catch (error) {
        console.error('error deleting document: ', error);
    }
})

updateMonth('january');
updateMonth('february');
updateMonth('march');
updateMonth('april');
updateMonth('may');
updateMonth('june');
updateMonth('july');
updateMonth('august');
updateMonth('september');
updateMonth('october');
updateMonth('november')
updateMonth('december');