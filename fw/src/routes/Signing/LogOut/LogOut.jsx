import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./LogOutStyles.css";

export default function LogOut() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogOut = () => {
        setIsAuthenticated(false);
        navigate("/");
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <Box className="logout-container">
            <Typography variant="h6" gutterBottom>
                Are you sure you want to log out?
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleLogOut}
                    sx={{ mr: 2 }}
                >
                    Yes
                </Button>
                <Button variant="contained" onClick={handleCancel}>
                    No
                </Button>
            </Box>
        </Box>
    );
}
