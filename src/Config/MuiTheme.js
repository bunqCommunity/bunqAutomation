import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import deepPurple from "@material-ui/core/colors/deepPurple";

export const lightThem = {
    palette: {
        primary: blue,
        secondary: pink,
    },
    typography: {
        useNextVariants: true
    }
};

export const darkTheme = {
    palette: {
        type: "dark",
        primary: {
            main: '#2979ff',
        },
        secondary: deepPurple,
    },
    typography: {
        useNextVariants: true
    }
};

export default {
    light: lightThem,
    dark: darkTheme
};
