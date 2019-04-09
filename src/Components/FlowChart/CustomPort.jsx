import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon/index";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CheckCircle from "@material-ui/icons/CheckCircle";

const PortCustom = ({ port }) => {
    let portIcon = null;
    if (port.properties && port.properties.icon) {
        switch (port.properties.icon) {
            case "arrow-right":
                portIcon = <ArrowRightIcon />;
                break;
            case "arrow-left":
                portIcon = <ArrowLeftIcon />;
                break;
            default:
                portIcon = <CheckCircle />;
                break;
        }
    }

    return (
        <div
            style={{
                width: 24,
                height: 24,
                background: "cornflowerblue",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <SvgIcon color="action">{portIcon}</SvgIcon>
        </div>
    );
};

export default PortCustom;
