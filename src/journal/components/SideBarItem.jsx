import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'

const SideBarItem = ({title = '', body, id, date, imageUrls = []}) => {

    const dispatch = useDispatch()
    const { isSaving } = useSelector(state => state.journal)

    const onClickNote = () => {
        dispatch(setActiveNote({title, body, id, date, imageUrls}))
    }

    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    }, [title])

  return (
    !isSaving ? 
                <ListItem disablePadding>
                    <ListItemButton onClick={onClickNote}>
                        <ListItemIcon>
                            <TurnedInNot />
                        </ListItemIcon>
                        <Grid container>
                            <ListItemText primary={newTitle} sx={{width: '100%'}}/>
                            <ListItemText secondary={body}/>
                        </Grid>
                    </ListItemButton>
                </ListItem>
            : <Skeleton variant="rectangular" animation="wave" width={210} height={40} sx={{margin: '0.5rem'}} />
  )
}

export default SideBarItem
