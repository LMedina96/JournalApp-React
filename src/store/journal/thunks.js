import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { firebaseDB } from "../../firebase/config"
import { addNewEmptyNote, deleteNoteById, noteUpdated, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from "./journalSlice"
import { loadNotes } from "../../helpers/loadNotes"
import { fileUpload } from "../../helpers/fileUpload"

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote())

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`))
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        if (!uid) throw new Error('El UID del usuario no existe')

        const notes = await loadNotes(uid)

        dispatch(setNotes(notes))

    }
}

export const loadListNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        if (!uid) throw new Error('El UID del usuario no existe')

        const noteClicked = note

        dispatch(setNotes(noteClicked))
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
    
        const docRef = doc( firebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch( noteUpdated( note ) );
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())

        const fileUploadPromises = []

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises)
        
        dispatch(setPhotosToActiveNote(photosUrls))
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth
        const {active: note} = getState().journal

        const docRef = doc( firebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await deleteDoc(docRef)

        dispatch(deleteNoteById(note.id))
        const notes = await loadNotes( uid );
        dispatch(setNotes(notes))
    }
}