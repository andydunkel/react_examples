import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function MainView () {

    async function handleLoadList() {
        const url = "https://api.laut.fm/listeners";

        const resp =  await axios.get(url).catch(error => {
            console.log(error);
        });

        if (resp !== undefined) {
            console.log(resp);
        }
    }

    return (
        <div>
            <Button variant="contained" onClick={handleLoadList}>Lade Liste</Button>
        </div>
    )
}

export default MainView;
