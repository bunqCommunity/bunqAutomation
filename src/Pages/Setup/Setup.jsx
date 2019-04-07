import React, { useState, useEffect } from "react";
import { useMappedState } from "redux-react-hook";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";

import MinimalContent from "../../Components/MinimalContent/MinimalContent";
import ThemedLogo from "../../Components/ThemedLogo";

import SetPasswordSection from "./SetPasswordSection";
import SetBunqKeySection from "./SetBunqKeySection";
import SetSettingsSection from "./SetSettingsSection";
import ConfirmDetailsSection from "./ConfirmDetailsSection";

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
    darkMode: state.theme.darkMode,

    authenticationLoading: state.authentication.loading,

    serverStatus: state.server_status.status,
    serverStatusChecked: state.server_status.checked
});

const Setup = ({ classes }) => {
    const { darkMode, serverStatus, serverStatusChecked, authenticationLoading } = useMappedState(mapState);
    const [step, setStep] = useState(0);

    const [password, setPassword] = useState("testpassword1234");
    const [passwordConfirm, setPasswordConfirm] = useState("testpassword1234");

    const [bunqApiKey, setBunqApiKeyField] = useState("");
    const [deviceName, setDeviceName] = useState("bunqAutomation server");
    const [environment, setEnvironment] = useState(false);

    const nextStep = () => setStep(step + 1);
    const resetStep2 = () => {
        setBunqApiKeyField("");
        setEnvironment(false);
    };
    const themedLogo = ThemedLogo(darkMode);

    useEffect(() => {
        if (serverStatusChecked && serverStatus === "STATUS_PASSWORD_READY") {
            if (step < 1) setStep(1);
        } else if (
            serverStatusChecked &&
            (serverStatus === "STATUS_UNINITIALIZED" || serverStatus === "STATUS_FIRST_INSTALL")
        ) {
            if (step > 0) setStep(0);
        }
    }, [serverStatus, serverStatusChecked]);

    return (
        <MinimalContent title="bunqAutomation - Setup" alignTop={true}>
            <div className={classes.root}>
                <img className={classes.image} alt="bunqAutomation logo" src={themedLogo} />
                <Typography className={classes.title} variant="h5">
                    bunqAutomation
                </Typography>

                <Paper className={classes.content}>
                    <Stepper className={classes.stepper} activeStep={step} alternativeLabel>
                        <Step>
                            <StepLabel>Set a password</StepLabel>
                        </Step>
                        <Step>
                            <StepButton onClick={resetStep2}>
                                <StepLabel>Login with bunq</StepLabel>
                            </StepButton>
                        </Step>
                        <Step>
                            <StepLabel>Change settings</StepLabel>
                        </Step>
                    </Stepper>

                    {step === 0 && (
                        <SetPasswordSection
                            nextStep={nextStep}
                            serverStatus={serverStatus}
                            password={password}
                            setPassword={setPassword}
                            passwordConfirm={passwordConfirm}
                            setPasswordConfirm={setPasswordConfirm}
                        />
                    )}
                    {step === 1 && (
                        <SetBunqKeySection
                            nextStep={nextStep}
                            serverStatus={serverStatus}
                            authenticationLoading={authenticationLoading}
                            bunqApiKey={bunqApiKey}
                            setBunqApiKeyField={setBunqApiKeyField}
                            deviceName={deviceName}
                            setDeviceName={setDeviceName}
                            environment={environment}
                            setEnvironment={setEnvironment}
                        />
                    )}
                    {step === 2 && <SetSettingsSection serverStatus={serverStatus} nextStep={nextStep} />}
                    {step === 3 && <ConfirmDetailsSection serverStatus={serverStatus} />}
                </Paper>
            </div>
        </MinimalContent>
    );
};

export default withStyles(styles)(Setup);
