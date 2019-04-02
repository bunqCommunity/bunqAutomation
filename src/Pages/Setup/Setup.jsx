import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMappedState } from "redux-react-hook";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import MinimalContent from "../../Components/MinimalContent/MinimalContent";
import ThemedLogo from "../../Components/ThemedLogo";

import SetPasswordSection from "./SetPasswordSection";
import SetBunqKeySection from "./SetBunqKeySection";
import SetSettingsSection from "./SetSettingsSection";
import ConfirmDetailsSection from "./ConfirmDetailsSection";

// import useAuthentication from "../../Redux/Actions/useAuthentication";

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

    apiKey: state.authentication.api_key,
    loading: state.authentication.loading,

    serverStatusChecked: state.server_status.checked,
    serverStatus: state.server_status.status
});

const Setup = ({ classes }) => {
    // const {  } = useAuthentication();
    const { darkMode, serverStatus, serverStatusChecked } = useMappedState(mapState);
    const [step, setStep] = useState(0);

    const [password, setPassword] = useState("testpassword1234");
    const [passwordConfirm, setPasswordConfirm] = useState("testpassword1234");

    const [bunqApiKey, setBunqApiKeyField] = useState("");
    const [deviceName, setDeviceName] = useState("bunqAutomation server");
    const [environment, setEnvironment] = useState(false);

    const nextStep = () => setStep(step + 1);
    const themedLogo = ThemedLogo(darkMode);

    if (serverStatusChecked) {
        if (serverStatus !== "STATUS_FIRST_INSTALL" && serverStatus !== "DISCONNECTED") {
            return <Redirect to="/login" />;
        }
    }
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
                            <StepLabel>Login with bunq</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Change settings</StepLabel>
                        </Step>
                    </Stepper>

                    {step === 0 && (
                        <SetPasswordSection
                            nextStep={nextStep}
                            password={password}
                            setPassword={setPassword}
                            passwordConfirm={passwordConfirm}
                            setPasswordConfirm={setPasswordConfirm}
                        />
                    )}
                    {step === 1 && (
                        <SetBunqKeySection
                            nextStep={nextStep}
                            bunqApiKey={bunqApiKey}
                            setBunqApiKeyField={setBunqApiKeyField}
                            deviceName={deviceName}
                            setDeviceName={setDeviceName}
                            environment={environment}
                            setEnvironment={setEnvironment}
                        />
                    )}
                    {step === 2 && <SetSettingsSection nextStep={nextStep} />}
                    {step === 3 && <ConfirmDetailsSection />}
                </Paper>
            </div>
        </MinimalContent>
    );
};

export default withStyles(styles)(Setup);
