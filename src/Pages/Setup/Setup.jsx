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
import BunqApiKeysOverview from "./BunqApiKeysOverview";

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
    authenticationLoading: state.authentication.loading,

    serverStatus: state.server_status.status,
    serverStatusChecked: state.server_status.checked
});

const Setup = ({ classes }) => {
    const { darkMode, serverStatus, serverStatusChecked, apiKey, authenticationLoading } = useMappedState(mapState);
    const [step, setStep] = useState(0);

    const [password, setPassword] = useState("testpassword1234");
    const [passwordConfirm, setPasswordConfirm] = useState("testpassword1234");

    const [bunqApiKey, setBunqApiKeyField] = useState("");
    const [deviceName, setDeviceName] = useState("bunqAutomation server");
    const [environment, setEnvironment] = useState(false);

    const nextStep = () => setStep(step + 1);
    const goToPassword = () => setStep(0);
    const goToApiKey = () => {
        setBunqApiKeyField("");
        setEnvironment(false);
        setStep(1);
    };
    const goToSettings = () => setStep(2);

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

    const step1Disabled = serverStatus !== "STATUS_UNINITIALIZED" && serverStatus !== "STATUS_FIRST_INSTALL";
    const step2Disabled = !step1Disabled;
    const step3Disabled = serverStatus !== "STATUS_API_READY";

    return (
        <MinimalContent title="bunqAutomation - Setup" alignTop={true}>
            <div className={classes.root}>
                <img className={classes.image} alt="bunqAutomation logo" src={themedLogo} />
                <Typography className={classes.title} variant="h5">
                    bunqAutomation
                </Typography>

                <Paper className={classes.content}>
                    <Stepper className={classes.stepper} activeStep={step} nonLinear alternativeLabel>
                        <Step>
                            <StepButton disabled={step1Disabled} onClick={goToPassword} completed={step > 0}>
                                <StepLabel>Set a password</StepLabel>
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton disabled={step2Disabled} onClick={goToApiKey} completed={step > 1}>
                                <StepLabel>Login with bunq</StepLabel>
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton disabled={step3Disabled} onClick={goToSettings} completed={step > 2}>
                                <StepLabel>Change settings</StepLabel>
                            </StepButton>
                        </Step>
                    </Stepper>

                    {step === 0 && (
                        <SetPasswordSection
                            nextStep={nextStep}
                            serverStatus={serverStatus}
                            apiKey={apiKey}
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

                {step === 1 && (
                    <Paper className={classes.content}>
                        <BunqApiKeysOverview />
                    </Paper>
                )}
            </div>
        </MinimalContent>
    );
};

export default withStyles(styles)(Setup);
