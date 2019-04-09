import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";

import SavingsIcon from "@material-ui/icons/Save";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import MailIcon from "@material-ui/icons/Mail";
import HistoryIcon from "@material-ui/icons/History";
import AccountCheck from "../../Components/Icons/AccountCheck";

import { formatMoney } from "../../Functions/AmountFormatting";
import { green, lightBlue, purple, salmon } from "../../Config/Colors";

const styles = theme => ({
    paperHeader: {
        display: "flex",
        alignItems: "center",
        margin: 8
    },
    paperHeaderText: {
        marginLeft: 8
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

const getListItemStyle = color => ({
    margin: "4px 0px",
    borderLeft: `4px solid ${color}`,
    borderRadius: "4px 0px 0px 4px"
});

const ActionHistoryOverview = ({ classes }) => {
    const groupedItems = [
        {
            date: "Today",
            items: [
                <ListItem button key={0} style={getListItemStyle(salmon)}>
                    <ListItemIcon>
                        <AccountCheck />
                    </ListItemIcon>
                    <ListItemText
                        primary={`Monthly request sent for ${formatMoney(5)}`}
                        secondary="mikey122@example.com"
                    />
                </ListItem>,
                <ListItem button key={1} style={getListItemStyle(lightBlue)}>
                    <ListItemIcon>
                        <CallSplitIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Split salary across 4 accounts"
                        secondary={`Total amount: ${formatMoney(3112.12)}`}
                    />
                </ListItem>,
                <ListItem button key={2} style={getListItemStyle(purple)}>
                    <ListItemIcon>
                        <SavingsIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Auto saved 2% for 1 payment"
                        secondary={`Total amount: ${formatMoney(1.35)}`}
                    />
                </ListItem>
            ]
        },
        {
            date: "Yesterday",
            items: [
                <ListItem button key={0} style={getListItemStyle(green)}>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Sent monthly invoice to 3 people"
                        secondary={`mikey122@example.com and 2 others`}
                    />
                </ListItem>,
                <ListItem button key={1} style={getListItemStyle(purple)}>
                    <ListItemIcon>
                        <SavingsIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Auto saved 2% for 3 payments"
                        secondary={`Total amount: ${formatMoney(7.12)}`}
                    />
                </ListItem>
            ]
        }
    ];

    return (
        <React.Fragment>
            <div className={classes.paperHeader}>
                <SvgIcon color="action">
                    <HistoryIcon />
                </SvgIcon>
                <Typography className={classes.paperHeaderText} variant="subtitle1">
                    Completed actions
                </Typography>
            </div>

            <Paper className={classes.paper}>
                <List className={classes.list}>
                    {groupedItems.map(groupedList => (
                        <li key={`section-${groupedList.date}`} className={classes.listSection}>
                            <ul className={classes.ul}>
                                <ListSubheader>{groupedList.date}</ListSubheader>
                                <Divider />

                                {groupedList.items}
                            </ul>
                        </li>
                    ))}
                </List>
            </Paper>
        </React.Fragment>
    );
};

export default withStyles(styles)(ActionHistoryOverview);
