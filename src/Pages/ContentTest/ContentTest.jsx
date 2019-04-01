import React from "react";
import { withStyles } from "@material-ui/core/styles";

import MinimalContent from "../../Components/MinimalContent/MinimalContent";
import ContentTestComponent from "../../Components/ContentTest";

const styles = () => ({
    root: {
        width: 380,
        textAlign: "center"
    },
    image: {
        width: "60%"
    }
});

const ContentTest = ({ classes }) => {
    return (
        <MinimalContent title="bunqAutomation - Content test">
            <div className={classes.root}>
                <ContentTestComponent />
            </div>
        </MinimalContent>
    );
};

export default withStyles(styles)(ContentTest);
