import { firebaseClient } from ".";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, TwitterAuthProvider, UserCredential, FacebookAuthProvider } from 'firebase/auth';

export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(firebaseClient.auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error signing in with email and password", error);
    throw error;
  }
};

export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(firebaseClient.auth, provider);
};

export const signInWithTwitter = async (): Promise<UserCredential> => {
  const provider = new TwitterAuthProvider();
  return signInWithPopup(firebaseClient.auth, provider);
};

export const signInWithGithub = async (): Promise<UserCredential> => {
  const provider = new GithubAuthProvider();
  return signInWithPopup(firebaseClient.auth, provider);
};

export const signInWithFacebook = async (): Promise<UserCredential> => {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(firebaseClient.auth, provider);
};
