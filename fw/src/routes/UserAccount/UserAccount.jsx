import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export function UserAccount() {
    // Replace these values with actual data from your backend or state
    const user = {
        photo: 'userPhoto.png',
        username: 'Jim Carrey',
        likedFilms: 42,
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            {/*<Typography variant="h4" component="h1" gutterBottom>*/}
            {/*    User Account Page*/}
            {/*</Typography>*/}
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={12} md={12}>
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            // alignItems: 'center',
                            padding: 2,
                        }}
                    >
                        <Avatar
                            alt={user.username}
                            src={user.photo}
                            sx={{ width: 200, height: 200 }}
                        />
                        <Typography variant="h5" component="h2" gutterBottom>
                            {user.username}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Liked Films: {user.likedFilms}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
