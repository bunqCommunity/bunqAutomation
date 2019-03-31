import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
import { useMappedState } from "redux-react-hook";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import logo from "../../Images/logo-256.png";

import MinimalContent from "../../Components/MinimalContent/MinimalContent";
import SetPasswordSection from "./SetPasswordSection";
import SetBunqKeySection from "./SetBunqKeySection";
import SetSettingsSection from "./SetSettingsSection";

const styles = theme => ({
    root: {
        width: 480,
        textAlign: "center"
    },
    title: {
        marginBottom: 12
    },
    stepper: {
        marginBottom: 8,
        padding: "16px 0px"
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

const getStepValue = serverStatus => {
    switch (serverStatus) {
        case "STATUS_PASSWORD_READY":
            return 1;
        case "STATUS_API_READY":
            return 2;
        default:
        case "STATUS_FIRST_INSTALL":
        case "STATUS_UNINITIALIZED":
            return 0;
    }
};

const Setup = ({ classes, history }) => {
    const { serverStatus } = useMappedState(mapState);
    const [step, setStep] = useState(getStepValue(serverStatus));

    useEffect(
        () => {
            const newStepIndex = getStepValue(serverStatus);

            if (step !== newStepIndex) setStep(newStepIndex);
        },
        [serverStatus]
    );

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
                            <StepLabel>Set a password</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Login with bunq</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Change settings</StepLabel>
                        </Step>
                    </Stepper>

                    {step === 0 && <SetPasswordSection />}
                    {step === 1 && <SetBunqKeySection />}
                    {step === 2 && <SetSettingsSection />}
                </Paper>

                <Typography variant="h6" style={{ position: "absolute", bottom: 5 }}>
                    {serverStatus}
                </Typography>
            </div>
        </MinimalContent>
    );
};

export default withStyles(styles)(Setup);
