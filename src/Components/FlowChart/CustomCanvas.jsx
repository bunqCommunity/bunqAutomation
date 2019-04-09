import React from "react";
import { withTheme } from "@material-ui/core/styles/index";

const CanvasCustom = ({ children, theme }) => {
    const darkTheme = theme.palette.type === "dark";
    const backgroundColor = darkTheme ? "#33333d" : "#d6d6d6";

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                cursor: "not-allowed",
                backgroundSize: "25px 25px",
                backgroundColor: backgroundColor,
                backgroundImage:
                    "linear-gradient(90deg,hsla(0,0%,100%,.1) 1px,transparent 0), linear-gradient(180deg,hsla(0,0%,100%,.1) 1px,transparent 0)"
            }}
        >
            {children}
        </div>
    );
};

export default withTheme()(CanvasCustom);
