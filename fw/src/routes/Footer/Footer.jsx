import { AppBar, Toolbar, Typography, IconButton, Box, Container } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const styles = {
    footer: {
        top: "auto",
        bottom: 0,
        marginTop: "auto",
        backgroundColor: "primary",
    },
    grow: {
        flexGrow: 1,
    },
};

export function Footer() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                {/* Your page content goes here */}
            </Container>
            <AppBar position="static" color="primary" style={styles.footer}>
                <Toolbar>
                    <IconButton
                        href="https://github.com/your-github-repo"
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
