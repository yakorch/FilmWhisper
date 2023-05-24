import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import signUpStyles from "./SignUpStyles";
import { useAuth } from "../AuthContext";
import ErrorText from "../../../utilities/ErrorText";
import * as Realm from "realm-web";
import { CircularProgress } from "@mui/material";
import { useUserID } from "../UserContext";

const {
    BSON: { ObjectId }
} = Realm;


function checkFirstName(value) {
    try {
        if (!value) {
            return { firstNameHelper: "* Provide a first name!", firstNameError: true };
        } else if (value.length < 2) {
            return { firstNameHelper: "* First name should be at least 2 letters long!", firstNameError: true };
        }
        return { firstNameHelper: "", firstNameError: false };
    } catch (e) { // Wrong data type
        console.log(e);
        return { firstNameHelper: "Incorrect input!", firstNameError: true };
    }
}

function checkLastName(value) {
    try {
        if (!value) {
            return { lastNameHelper: "* Provide a last name!", lastNameError: true };
        } else if (value.length < 2) {
            return { lastNameHelper: "* Last name should be at least 2 letters long!", lastNameError: true };
        }
        return { lastNameHelper: "", lastNameError: false };
    } catch (e) { // Wrong data type
        console.log(e);
        return { lastNameHelper: "Incorrect input!", lastNameError: true };
    }
}

function checkEmail(value) {
    try {
        if (!value) {
            return { emailHelper: "* Provide an email!", emailError: true };
        } else if (!value.includes("@")) {
            return { emailHelper: "* Provide a valid email!", emailError: true };
        }
        return { emailHelper: "", emailError: false };
    } catch (e) { // Wrong data type
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

async function register(userToRegister) {
    try {
        const app = new Realm.App({ id: "application-0-xzfrv" });

        const credentials = Realm.Credentials.anonymous();
        const connectedUser = await app.logIn(credentials);

        console.assert(connectedUser.id === app.currentUser.id);

        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("film_whisper_db").collection("users");

        // Check if user with such email exists
        const check = await collection.find({ email: userToRegister.email });
        if (!check || check.length > 0) {
            return [false, "-1", "This email is already used!"];
        }
        // Insert the new document
        const result = await collection.insertOne(userToRegister);
        if (result){
            return [true, result.insertedId, "All's OK!"];
        }
        return [false, "-1", "Something went wrong!"];
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return [false, "-1", "Something went wrong!"];
    }
}

export default function SignUp() {
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [helperTexts, setHelperTexts] = React.useState({
        firstNameHelper: "",
        lastNameHelper: "",
        emailHelper: "",
        passwordHelper: ""
    });
    const [fieldsErrors, setFieldsErrors] = React.useState({
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false
    });
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const { setUserID } = useUserID();

    const handleSubmit = async (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");
        const firstName = data.get("firstName");
        const lastName = data.get("lastName");

        const { firstNameHelper, firstNameError } = checkFirstName(firstName);
        const { lastNameHelper, lastNameError } = checkLastName(lastName);
        const { emailHelper, emailError } = checkEmail(email);
        const { passwordHelper, passwordError } = checkPassword(password);
        const allowExtraEmails = data.has("allowExtraEmails")
            ? data.get("allowExtraEmails") === "on"
            : false;

        const newFieldsErrors = {
            firstNameError: firstNameError,
            lastNameError: lastNameError,
            emailError: emailError,
            passwordError: passwordError
        };
        const newHelperTexts = {
            firstNameHelper: firstNameHelper,
            lastNameHelper: lastNameHelper,
            emailHelper: emailHelper,
            passwordHelper: passwordHelper
        };
        setFieldsErrors(newFieldsErrors);
        setHelperTexts(newHelperTexts);


        if (firstNameError || lastNameError || emailError || passwordError) {
            return;
        }

        setLoading(true);

        // Create a new user
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
            notifConsent: allowExtraEmails,
            to_watch: [],
            watched: [],
            favourites: []
        };
        const [status, userId, errorMessageLocal] = await register(newUser);

        setLoading(false);

        if (status) {
            setIsAuthenticated(true);
            setUserID(userId);
            navigate("/user-account");
            return;
        }

        setError(true);
        setErrorMessage(errorMessageLocal);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={signUpStyles.container}>
                <Avatar sx={signUpStyles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={signUpStyles.form}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={fieldsErrors.firstNameError}
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                helperText={helperTexts.firstNameHelper}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={fieldsErrors.lastNameError}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                helperText={helperTexts.lastNameHelper}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={fieldsErrors.emailError}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                helperText={helperTexts.emailHelper}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={fieldsErrors.passwordError}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                helperText={helperTexts.passwordHelper}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    {error ? <ErrorText message={errorMessage} /> : <></>}
                    {loading && <CircularProgress />}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={signUpStyles.submitButton}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                to="sign-in"
                                variant="body2"
                                onClick={() => navigate("/sign-in")}
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
