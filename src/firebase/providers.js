import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider)
        // const credential = GoogleAuthProvider.credentialFromResult(result)

        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {
    try {
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        const { uid, photoURL } = resp.user
        
        await updateProfile(firebaseAuth.currentUser, {displayName})


        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) { 
        return {ok: false, errorMessage: error.message}
    }
}

export const loginWithEmailPassword = async({email, password}) => {
    try {
            const resp = await signInWithEmailAndPassword(firebaseAuth, email, password)
            const {uid, photoURL, displayName} = resp.user

            return {
                ok: true,
                uid, photoURL, displayName
            }
        }
        
    catch (error) { 
        return {ok: false, errorMessage: error.message}
    }
}

export const logoutFirebase = async() => {
    return await firebaseAuth.signOut()
}