import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import ImageGallery from "../components/ImageGallery"

const NoteView = () => {
    return (
        <Grid container direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
            
            <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item>
                    <Typography fontSize={28} fontWeight='light' alignItems='center'>
                        20 de Noviembre, 2023
                    </Typography>
                </Grid>

                <Grid item>
                    <Button color="primary" sx={{padding: 2}}>
                        <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
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
                    sx={{border: 'none', mb: 1}}
                /> 

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="What happened today?"
                    minRows={5}
                /> 
            </Grid>

            <ImageGallery />

        </Grid>
    )
}

export default NoteView
