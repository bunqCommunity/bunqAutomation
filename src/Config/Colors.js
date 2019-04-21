export const red = "#E6261F";
export const salmon = "#FF6859";
export const yellow = "#F7D038";
export const lightGreen = "#A3E048";
export const green = "#1EB980";
export const darkGreen = "#045D56";
export const uclaBlue = "#577399";
export const grey = "#A5ADB2";
export const lightBlue = "#72DEFF";
export const blue = "#34BBE6";
export const darkBlue = "#4355DB";
export const darkPurple = "#B15DFF";
export const purple = "#D23BE7";
export const white = "#EFEFEF";
export const black = "#000000";

export const colors = [
    red,
    salmon,
    yellow,
    lightGreen,
    green,
    darkGreen,
    uclaBlue,
    grey,
    lightBlue,
    blue,
    darkBlue,
    darkPurple,
    purple,
    white,
    black
];

export const mainColorPalette = [salmon, green, lightBlue, purple, lightGreen, red, lightGreen, darkBlue, yellow, blue];

const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;
const randomIndex = () => getRandomNumber(0, colors.length);

// return the same color for the index
export const getColorByIndex = index => {
    const colorIndex = index % (colors.length - 1);
    return colors[colorIndex];
};

// random color from the color list
export const getRandomColor = () => colors[randomIndex()];
