import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import teal from "@material-ui/core/colors/teal";
import purple from "@material-ui/core/colors/purple";
import blueGrey from "@material-ui/core/es/colors/blueGrey";
import indigo from "@material-ui/core/es/colors/indigo";

export const lightThem = {
    palette: {
        primary: blue,
        secondary: pink
    },
    typography: {
        useNextVariants: true
    }
};

// export const darkTheme = {
//     palette: {
//         type: "dark",
//         primary: {
//             main: "#2979ff"
//         },
//         secondary: deepPurple
//     },
//     typography: {
//         useNextVariants: true
//     }
// };

export const darkTheme = {
    palette: {
        type: "dark",
        primary: indigo,
        secondary: teal,
        error: red,
        background: blueGrey
    },
    typography: {
        useNextVariants: true
    }
};

// export const darkTheme = {
//     palette: {
//         type: "dark",
//         primary: {
//             main: "#2979ff"
//         },
//         secondary:deepPurple,
//         error: {
//             light: "#e57373",
//             main: "#f44336",
//             dark: "#d32f2f",
//             contrastText: "#fff"
//         },
//         grey: {
//             "50": "#fafafa",
//             "100": "#f5f5f5",
//             "200": "#eeeeee",
//             "300": "#e0e0e0",
//             "400": "#bdbdbd",
//             "500": "#9e9e9e",
//             "600": "#757575",
//             "700": "#616161",
//             "800": "#424242",
//             "900": "#212121",
//             A100: "#d5d5d5",
//             A200: "#aaaaaa",
//             A400: "#303030",
//             A700: "#616161"
//         },
//         contrastThreshold: 3,
//         tonalOffset: 0.2,
//         text: {
//             primary: "#fff",
//             secondary: "rgba(255, 255, 255, 0.7)",
//             disabled: "rgba(255, 255, 255, 0.5)",
//             hint: "rgba(255, 255, 255, 0.5)",
//             icon: "rgba(255, 255, 255, 0.5)"
//         },
//         divider: "rgba(255, 255, 255, 0.12)",
//         background: {
//             paper: "#34495e",
//             default: "#2c3e50"
//             // default: "#2c3e50"
//         },
//         action: {
//             active: "#fff",
//             hover: "rgba(255, 255, 255, 0.1)",
//             hoverOpacity: 0.1,
//             selected: "rgba(255, 255, 255, 0.2)",
//             disabled: "rgba(255, 255, 255, 0.3)",
//             disabledBackground: "rgba(255, 255, 255, 0.12)"
//         }
//     },
//     typography: {
//         useNextVariants: true
//     }
// };

export default {
    light: lightThem,
    dark: darkTheme
};
