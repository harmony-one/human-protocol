import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, setDoc, doc, query, where, WhereFilterOp, getDoc, limitToLast, orderBy, addDoc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { FirebaseStorage, getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
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
    storage: FirebaseStorage;

    constructor() {
        // Initialize Firebase
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
        this.storage = getStorage(this.app);

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

    addAccount = async (data: {
        address: string,
        auth: Array<{
            nickname: string;
            type: string;
        }>
    }) => {
        await setDoc(doc(this.db, "accounts", data.address), {
            address: data.address,
            created: Math.floor(Date.now() / 1000),
            auth: []
        })
    }

    addAuth = async (address: string, auth: { nickname: string, type: string }) => {
        const snapshot = await getDoc(doc(this.db, "accounts", address));
        const data = snapshot.data();

        const authData: any[] = data?.auth;

        if (!authData.find(
            d => d.nickname === auth.nickname && d.type === auth.type
        )) {
            authData.push(auth);
        }

        await setDoc(doc(this.db, "accounts", address), {
            ...data,
            auth: authData,
            updated: Math.floor(Date.now() / 1000),
        })
    }

    getAccount = async (uid: string) => {
        const snapshot = await getDoc(doc(this.db, "accounts", uid));
        return snapshot.data();
    }

    getAccounts = (params?: GetListParams) => this.getList('accounts', params);

    getUsers = (params?: GetListParams) => this.getList('users', params);

    getActions = (params?: GetListParams) => this.getList('actions', params);

    addMessage = async (params: {
        text: string;
        address: string;
        locationData?: {
            address: string,
            latitude: string;
            longitude: string;
        }
    }) => {
        const { address, text, locationData } = params;

        const mentionRegex = /@(\w+)/g;
        const hashtagRegex = /#(\w+)/g;
        const mentions = [...text.matchAll(mentionRegex)].map(match => match[1]);
        const hashtags = [...text.matchAll(hashtagRegex)].map(match => match[1]);

        const displayName = this.auth.currentUser?.isAnonymous ?
            'Anonymous' : this.auth.currentUser?.displayName;

        const message = {
            user: {
                uid: this.auth.currentUser?.uid,
                displayName,
                address
            },
            text,
            location: {
                address: locationData?.address || '',
                latitude: locationData?.latitude || '',
                longitude: locationData?.longitude || '',
            },
            mentions,
            hashtags,
            created: Math.floor(Date.now() / 1000)
        };

        const newDoc = await addDoc(collection(this.db, "messages"), message);

        mentions.forEach(async (mention) => {
            const connection = {
                fromUser: '',
                toUser: mention,
                messageId: newDoc.id,
                created: Math.floor(Date.now() / 1000)
            };

            await addDoc(collection(this.db, "connections"), connection);
        });
    }

    getMessages = (params?: GetListParams) => this.getList('messages', params);
}

export const firebaseClient = new FirebaseClient();