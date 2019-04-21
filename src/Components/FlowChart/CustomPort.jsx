import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CheckCircle from "@material-ui/icons/CheckCircle";

const portSize = 24;

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
                width: portSize,
                height: portSize,
                opacity: 0,
                background: "cornflowerblue",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                borderRadius: portSize / 2,
                alignItems: "center"
            }}
        >
            <SvgIcon color="action">{portIcon}</SvgIcon>
        </div>
    );
};

export default PortCustom;
