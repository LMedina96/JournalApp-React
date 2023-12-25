import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import ImageGallery from "../components/ImageGallery"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

const NoteView = () => {

    const dispatch = useDispatch()
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, date, onInputChange, formState } = useForm(note)

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    }, [date])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return

        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch(startDeletingNote())
    }

    return (
        <Grid container direction='row' justifyContent='space-between' sx={{ mb: 1 }}>

            <Grid
                className="animate__animated animate__fadeIn animate__faster"
                container alignItems='center'
                justifyContent='space-between'>
                <Grid item>
                    <Typography fontSize={28} fontWeight='light' alignItems='center'>
                        {dateString}
                    </Typography>
                </Grid>

                <Grid item>
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={onFileInputChange}
                        style={{ display: 'none' }}
                    />

                    <IconButton color="primary" disabled={isSaving} onClick={() => fileInputRef.current.click()}>
                        <UploadOutlined />
                    </IconButton>

                    <Button
                        disabled={isSaving}
                        onClick={onSaveNote}
                        color="primary"
                        sx={{ padding: 2 }}
                    >
                        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    </Button>
                </Grid>
            </Grid>


            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Enter a title"
                    label='title'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="What happened today?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{mt: 2}}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            <ImageGallery 
                images={note.imageUrls}
            />

        </Grid>
    )
}

export default NoteView
