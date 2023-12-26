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
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                dispatch(startDeletingNote())
            }
        });
    }

    return (
        <Grid container direction='row' justifyContent='space-between'>

            <Grid
                className="animate__animated animate__fadeIn animate__faster"
                container >
                <Grid container>
                    <Grid item>
                        <Typography fontSize={28} fontWeight='light' alignItems='center'>
                            {dateString}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{ mb: 1 }}>

                    <Grid item>
                        <Button
                            onClick={onDelete}
                            color='error'
                        >
                            <DeleteOutline />
                            Delete
                        </Button>
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



            <ImageGallery
                images={note.imageUrls}
            />

        </Grid>
    )
}

export default NoteView
