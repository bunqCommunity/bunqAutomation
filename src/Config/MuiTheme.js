import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";

export const lightThem = {
    palette: {
        type: "light",
        primary: blue,
        secondary: pink,
        error: red
    },
    typography: {
        useNextVariants: true
    }
};

export const darkTheme = {
    palette: {
        type: "dark",
        primary: {
            main: "#1eb980"
        },
        secondary: {
            main: "#ff6859"
        },
        error: {
            main: "#f44336"
        },
        background: {
            paper: "#33333d",
            default: "#424250"
        },
        action: {
            active: "#fff",
            hover: "rgba(255, 255, 255, 0.1)",
            hoverOpacity: 0.1,
            selected: "rgba(255, 255, 255, 0.2)",
            disabled: "rgba(255, 255, 255, 0.3)",
            disabledBackground: "rgba(255, 255, 255, 0.12)"
        }
    },
    typography: {
        useNextVariants: true
    }
};

export default {
    light: lightThem,
    dark: darkTheme
};
