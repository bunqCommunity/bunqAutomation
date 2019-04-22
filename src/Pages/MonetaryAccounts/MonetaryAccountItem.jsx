import React, { useState } from "react";
import { BlockPicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";

import PaletteIcon from "@material-ui/icons/Palette";

import UserBunqImage from "../../Components/AvatarBunqImage";
import { colors } from "../../Config/Colors";

const styles = theme => ({
    paper: {
        padding: 12,
        display: "flex",
        alignItems: "center"
    },
    userImage: {
        height: 50,
        width: 50,
        marginRight: 16
    },
    accountTitle: {
        width: 150
    },
    fillerDiv: {
        flexGrow: 1
    }
});

const colorPickerStyles = theme => ({
    colorPickerWrapper: {
        width: 40,
        height: 40,
        minWidth: 40,
        borderRadius: 4,
        position: "relative"
    },
    blockPickerDiv: {
        position: "absolute",
        zIndex: 2,
        top: 50
    },
    clickAwayDiv: {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
});

const ColorPickerSection = withStyles(colorPickerStyles)(({ classes, monetaryAccount }) => {
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState(monetaryAccount.color || false);

    const openColor = () => {
        if (!open) setOpen(true);
    };
    const closeColor = () => {
        if (color !== monetaryAccount.color) {
            updateApiColor();
        }
        if (open) setOpen(false);
    };
    const onChange = color => setColor(color.hex);

    const updateApiColor = () => {
        window.apiClient
            .post("/management/monetary-accounts/colors", {
                [monetaryAccount.id]: color
            })
            .then(() => {})
            .catch(console.error);
    };

    return (
        <Button
            className={classes.colorPickerWrapper}
            variant="outlined"
            style={{ backgroundColor: color }}
            onClick={openColor}
        >
            {open && (
                <div className={classes.blockPickerDiv}>
                    <div className={classes.clickAwayDiv} onClick={closeColor} />
                    <BlockPicker colors={colors} color={color} onChange={onChange} style={{ zIndex: 3 }} />
                </div>
            )}
            {!color && (
                <SvgIcon>
                    <PaletteIcon />
                </SvgIcon>
            )}
        </Button>
    );
});

const MonetaryAccountItem = ({ classes, monetaryAccount }) => {
    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <UserBunqImage className={classes.userImage} object={monetaryAccount} />
                <div className={classes.accountTitle}>
                    <Typography variant="body1">{monetaryAccount.description}</Typography>
                    <Typography variant="body2">{monetaryAccount.balance.toFormat()}</Typography>
                </div>

                <ColorPickerSection monetaryAccount={monetaryAccount} />

                <div className={classes.fillerDiv} />
            </Paper>
        </Grid>
    );
};

export default withStyles(styles)(MonetaryAccountItem);
