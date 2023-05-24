import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const styles = {
    footer: {
        position: "relative",
        top: "auto",
        bottom: 0,
        margin: "auto",
        padding: '1.5% 0 1.5%',
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        borderTop: '2px solid #6cd793',
    },
    grow: {
        flexGrow: 1
    }
};

export function Footer() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                {/* Your page content goes here */}
            </Container>
            <AppBar position="static" color="primary" elevation={0} style={styles.footer}>
                <Toolbar>
                    <IconButton
                        href="https://github.com/yakorch/FilmWhisper.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        edge="start"
                        color="inherit"
                        aria-label="GitHub"
                    >
                        <GitHubIcon />
                    </IconButton>
                    <div style={styles.grow} />
                    <Typography variant="subtitle2" color="inherit">
                        © 2023 Film Whisper. All rights reserved.
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
