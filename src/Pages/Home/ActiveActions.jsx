import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";

import CheckIcon from "@material-ui/icons/Check";
import SavingsIcon from "@material-ui/icons/Save";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import MailIcon from "@material-ui/icons/Mail";
import NotificationIcon from "@material-ui/icons/NotificationImportant";
import AccountCheck from "../../Components/Icons/AccountCheck";

import { formatMoney } from "../../Functions/AmountFormatting";
import { darkGreen, green, lightBlue, purple, salmon } from "../../Config/Colors";

import PaperSectionHeader from "../../Components/PaperSectionHeader";

const styles = theme => ({
    headerWrapper: {
        display: "flex",
        alignItems: "center",
        margin: 8
    },
    headerWrapperText: {
        marginLeft: 8
    },
    secondaryHeader: {
        marginLeft: 40,
        marginBottom: 8
    },
    paper: {
        padding: 8
    },

    list: {
        width: "100%",
        paddingTop: 0,
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
        height: 400
    },
    listSection: {
        backgroundColor: "inherit"
    },
    ul: {
        backgroundColor: "inherit",
        padding: 0
    }
});

const ActionHistoryOverview = ({ classes, itemXs = 12, itemSm = 6, itemMd = 4 }) => {
    const activeActions = [
        {
            Icon: AccountCheck,
            primary: `Monthly request for ${formatMoney(5)}`,
            secondary: "To mikey122@example.com",
            color: salmon
        },
        {
            Icon: CallSplitIcon,
            primary: "Split salary across 4 accounts",
            secondary: `Payments, Savings and 2 other accounts`,
            color: lightBlue
        },
        {
            Icon: MailIcon,
            primary: "Send monthly invoice to 3 people",
            secondary: `mikey122@example.com and 2 others`,
            color: green
        },
        {
            Icon: NotificationIcon,
            primary: `Warn if balance falls below ${formatMoney(50)}`,
            secondary: "Subscriptions and payments",
            color: darkGreen
        },
        {
            Icon: SavingsIcon,
            primary: "Auto save 2% of each payment",
            secondary: "Enabled for Payments and Shopping",
            color: purple
        }
    ];

    const activeActionComponents = activeActions.map((activeAction, index) => {
        const Icon = activeAction.Icon;
        const inlineStyle = {
            borderLeft: `6px solid ${activeAction.color}`
        };
        return (
            <Grid item xs={itemXs} sm={itemSm} md={itemMd} key={index}>
                <Paper className={classes.paper} style={inlineStyle}>
                    <div className={classes.headerWrapper}>
                        <SvgIcon color="action">
                            <Icon />
                        </SvgIcon>
                        <Typography className={classes.headerWrapperText} variant="subtitle1">
                            {activeAction.primary}
                        </Typography>
                    </div>
                    {activeAction.secondary && (
                        <Typography className={classes.secondaryHeader} variant="subtitle2">
                            {activeAction.secondary}
                        </Typography>
                    )}
                </Paper>
            </Grid>
        );
    });

    return (
        <React.Fragment>
            <PaperSectionHeader title="Active actions" icon={CheckIcon} />

            <Grid container spacing={16}>
                {activeActionComponents}
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(ActionHistoryOverview);
