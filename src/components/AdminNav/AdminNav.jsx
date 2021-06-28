import React from 'react';
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../classes'

const AdminNav = () => {

    const history = useHistory()
    const classes = useStyles()

    const toArtist = () => {
        history.push('/admin/artist')
    }

    const toCollection = () => {
        history.push('/admin/collection')
    }

    const toSponsor = () => {
        history.push('/admin/sponsor')
    }

    const toArtwork = () => {
        history.push('/admin/artwork')
    }

    const toAdventure = () => {
        history.push('/admin/art-adventure')
    }

    const toQuote = () => {
        history.push('/admin/quote')
    }


    return(
        <>
        <div className={classes.adminNav}>
        <Button onClick={() => toArtist()}>Artist</Button>
        <Button onClick={() => toCollection()}>Collection</Button>
        <Button onClick={() => toSponsor()}>Sponsor</Button>
        <Button onClick={() => toArtwork()}>Artwork</Button>
        <Button onClick={() => toAdventure()}>Art Adventure</Button>
        <Button onClick={() => toQuote()}>Quotes</Button>
        </div>
        </>
    )
}

export default AdminNav