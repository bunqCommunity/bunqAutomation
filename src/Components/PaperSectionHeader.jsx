import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import Refresh from "@material-ui/icons/Refresh";

const styles = () => ({
    paper: {
        padding: 16,
        height: 416
    },
    paperHeaderSection: {
        display: "flex",
        margin: 8
    },
    paperHeaderText: {
        marginLeft: 8
    },
    paperHeaderFill: {
        flexGrow: 1
    },
    paperHeaderSecondaryIcon: {
        cursor: "pointer"
    }
});

const PaperSectionHeader = ({ classes, title, icon, secondaryIcon, loading, onClick, ...otherProps }) => {
    let SecondaryIcon = null;
    let Icon = null;

    if (secondaryIcon) {
        if (secondaryIcon !== true || !loading) {
            // if true, default to refresh
            SecondaryIcon = secondaryIcon === true ? Refresh : secondaryIcon;
            // wrap the icon in svg icon with the onClick handler
            SecondaryIcon = (
                <SvgIcon className={classes.paperHeaderSecondaryIcon} onClick={onClick} color="action">
                    <SecondaryIcon />
                </SvgIcon>
            );
        } else {
            SecondaryIcon = <CircularProgress size={24} />;
        }
    }

    if (icon) {
        Icon = icon;
    }

    return (
        <div className={classes.paperHeaderSection} {...otherProps}>
            {Icon && (
                <SvgIcon color="action">
                    <Icon />
                </SvgIcon>
            )}

            <Typography className={classes.paperHeaderText} variant="subtitle1">
                {title}
            </Typography>

            {SecondaryIcon && (
                <React.Fragment>
                    <span className={classes.paperHeaderFill} />
                    {SecondaryIcon}
                </React.Fragment>
            )}
        </div>
    );
};

PaperSectionHeader.defaultProps = {
    onClick: () => {},
    icon: false,
    loading: false,
    secondaryIcon: false
};

export default withStyles(styles)(PaperSectionHeader);
