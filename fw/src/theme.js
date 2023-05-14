// theme.js
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6cd793', // green color
        },
        secondary: {
            main: '#000000', // black color
        },
        background: {
            default: '#ffffff', // white color
        },
    },
});

export default theme;