import ErrorText from "../../../utilities/ErrorText";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../AuthContext';
import {CircularProgress} from "@mui/material";
import * as Realm from "realm-web";
import signInStyles from "./SignInStyles";
import getUserInfo from "../../../utilities/getUserInfo";
import { useUserID } from "../UserContext";
import { useUserInfo } from "../UserInfoContext";


function checkEmail(value) {
    try {
        if (!value) {
            return { emailHelper: "* Provide an email!", emailError: true };
        } else if (!value.includes("@")) {
            return { emailHelper: "* Provide a valid email!", emailError: true };
        }
        return { emailHelper: "", emailError: false };
    } catch (e) {
        console.log(e);
        return { emailHelper: "Incorrect input!", emailError: true };
    }
}

function checkPassword(value) {
    try {
        if (!value) {
            return { passwordHelper: "* Provide a password!", passwordError: true };
        } else if (value.length < 8) {
            return { passwordHelper: "* Password should be at least 8 letters long!", passwordError: true };
        }
        return { passwordHelper: "", passwordError: false };
    } catch (e) { // Wrong data type
        console.log(e);
        return { passwordHelper: "Incorrect input!", passwordError: true };
    }
}

async function login(userInfo) {
    try {
        const app = new Realm.App({ id: "application-0-xzfrv" });

        const credentials = Realm.Credentials.anonymous();
        const connectedUser = await app.logIn(credentials);

        console.assert(connectedUser.id === app.currentUser.id);

        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("film_whisper_db").collection("users");

        // Check if user with such email exists
        const check = await collection.find({ email: userInfo.email });
        if (!check || check.length < 1) {
            return [false, "-1", "Wrong password or email!"];
        }
        if (check[0].password === userInfo.password) {
            return [true, check[0]._id, "Success!"];
        }
        return [false, "-1", "Wrong password or email!"];
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return [false, "-1", "Something went wrong!"];
    }
}


export default function SignIn() {
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [helperTexts, setHelperTexts] = React.useState({
        emailHelper: "",
        passwordHelper: ""
    });
    const [fieldsErrors, setFieldsErrors] = React.useState({
        emailError: false,
        passwordError: false
    });
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const { setUserID } = useUserID();
    const { setUserInfo } = useUserInfo();

    const handleSubmit = async (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        const { emailHelper, emailError } = checkEmail(email);
        const { passwordHelper, passwordError } = checkPassword(password);

        const newFieldsErrors = {
            emailError: emailError,
            passwordError: passwordError
        };
        const newHelperTexts = {
            emailHelper: emailHelper,
            passwordHelper: passwordHelper
        };
        setFieldsErrors(newFieldsErrors);
        setHelperTexts(newHelperTexts);

        if (emailError || passwordError) {
            setErrorMessage("");
            return;
        }

        setLoading(true);

        const userInfo = {
            password: password,
            email: email
        };
        const [status, userId, errorMessageLocal] = await login(userInfo);

        setLoading(false);

        if (status) {
            setIsAuthenticated(true);
            setUserID(userId);
            setUserInfo(getUserInfo(userId)[1] || {});
            navigate("/user-account");
        }
        setError(true);
        setErrorMessage(errorMessageLocal);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={signInStyles.container}>
                <Avatar sx={signInStyles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={signInStyles.form}
                >
                    <TextField
                        error={fieldsErrors.emailError}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        helperText={helperTexts.emailHelper}
                    />
                    <TextField
                        error={fieldsErrors.passwordError}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText={helperTexts.passwordHelper}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    {error && <ErrorText message={errorMessage} />}
                    {loading && <CircularProgress />}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={signInStyles.submitButton}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                to="sign-up"
                                variant="body2"
                                onClick={() => navigate("/sign-up")}
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                to="sign-up"
                                variant="body2"
                                onClick={() => navigate("/sign-up")}
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
