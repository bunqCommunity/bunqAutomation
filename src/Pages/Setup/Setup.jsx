import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMappedState } from "redux-react-hook";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import logo from "../../Images/logo-256.png";

import MinimalContent from "../../Components/MinimalContent/MinimalContent";
import SetPasswordSection from "./SetPasswordSection";

const styles = theme => ({
    root: {
        width: 480,
        textAlign: "center"
    },
    title: {
        marginBottom: 12
    },
    stepper: {
        marginBottom: 8
    },
    content: {
        padding: "8px 16px",
        marginTop: 8
    },
    image: {
        maxWidth: 150
    },
    textField: {
        width: "100%",
        marginBottom: 8
    },
    button: {
        width: "100%",
        marginBottom: 8
    }
});

const mapState = state => ({
    apiKey: state.authentication.api_key,
    loading: state.authentication.loading,

    serverStatus: state.server_status.status
});

const Setup = ({ classes }) => {
    const {  serverStatus } = useMappedState(mapState);
    const [step, setStep] = useState(0);
    const nextStep = () =>         setStep(step + 1);

    return (
        <MinimalContent title="bunqAutomation - Setup" alignTop={true}>
            <div className={classes.root}>
                <img className={classes.image} alt="bunqAutomation logo" src={logo} />
                <Typography className={classes.title} variant="h5">
                    bunqAutomation
                </Typography>

                <Paper className={classes.content}>
                    <Stepper className={classes.stepper} activeStep={step} alternativeLabel>
                        <Step>
                            <StepLabel>Pick a password</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Login with bunq</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Change settings</StepLabel>
                        </Step>
                    </Stepper>

                    {serverStatus}

                    {step === 0 && <SetPasswordSection nextStep={nextStep} />}
                    {step === 1 && <SetPasswordSection nextStep={nextStep} />}
                    {step === 2 && <Typography>No settings for now, you are good to go</Typography>}
                </Paper>
            </div>
        </MinimalContent>
    );
};

export default withStyles(styles)(Setup);
