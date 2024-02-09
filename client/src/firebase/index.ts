import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, setDoc, doc, query, where, WhereFilterOp, getDoc, limitToLast, orderBy } from 'firebase/firestore/lite';
import { getAuth, Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYDneFqjVr426MgnTiuwfgQO2nc-YYLn4",
    authDomain: "human-protocol-413614.firebaseapp.com",
    projectId: "human-protocol-413614",
    storageBucket: "human-protocol-413614.appspot.com",
    messagingSenderId: "202612542693",
    appId: "1:202612542693:web:30c2c9fdbc4166de5c180c",
    measurementId: "G-3VB7TC31EC"
};

interface GetListParams {
    filter?: { key: string, value: any, operation: WhereFilterOp },
    limit?: number;
    page?: number;
}

class FirebaseClient {
    app: FirebaseApp;
    db: Firestore;
    auth: Auth;

    constructor() {
        // Initialize Firebase
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
        //const analytics = getAnalytics(app);
    }

    getList = async (collectionName: string, params?: GetListParams) => {
        const { limit = 100, page = 0, filter } = params || {};

        const col = collection(this.db, collectionName);

        const snapshot = await getDocs(
            filter ?
                query(
                    col,
                    where(filter.key, filter.operation, filter.value),
                    orderBy('created', 'asc'),
                    limitToLast(limit)
                ) :
                query(
                    col,
                    orderBy('created', 'asc'),
                    limitToLast(limit)
                )
        );

        const list = snapshot.docs.map(doc => doc.data());

        return list;
    }

    addUser = async (data: any) => {
        await setDoc(doc(this.db, "users", data.id), {
            ...data,
            created: Math.floor(Date.now() / 1000)
        });
    }

    addAction = async (data: any) => {
        await setDoc(doc(this.db, "actions", data.id), {
            ...data,
            created: Math.floor(Date.now() / 1000)
        });
    }

    getUser = async (id: string) => {
        const snapshot = await getDoc(doc(this.db, "users", id))
        return snapshot.data();
    }

    addAccount = async (data: any) => {
        await setDoc(doc(this.db, "accounts", data.uid), {
            privateKey: data.privateKey,
            created: Math.floor(Date.now() / 1000)
        })
    }

    getAccount = async (uid: string) => {
        const snapshot = await getDoc(doc(this.db, "accounts", uid));
        return snapshot.data();
    }

    getUsers = (params?: GetListParams) => this.getList('users', params);

    getActions = (params?: GetListParams) => this.getList('actions', params);
}

export const firebaseClient = new FirebaseClient();