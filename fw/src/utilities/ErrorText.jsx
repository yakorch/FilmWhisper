import React from 'react';
import Typography from '@mui/material/Typography';

const ErrorText = ({ message }) => {
    return (
        <Typography variant="body2" color="error">
            {message}
        </Typography>
    );
};

export default ErrorText;