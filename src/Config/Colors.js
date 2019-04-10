export const lightBlue = "#72DEFF";
export const purple = "#B15DFF";
export const salmon = "#FF6859";
export const green = "#1EB980";
export const uclaBLue = "#577399";
export const sunsetOrange = "#FE5F55";
export const yellow = "#FFCF44";
export const darkGreen = "#045D56";
export const richBlack = "#0A122A";

export const colors = [lightBlue, purple, salmon, green, uclaBLue, sunsetOrange, yellow, darkGreen, richBlack];

const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;
const randomIndex = () => getRandomNumber(0, colors.length);

// return the same color for the index
export const getColorByIndex = index => {
    const colorIndex = index % (colors.length - 1);
    console.log(colorIndex);
    return colors[colorIndex];
};

// random color from the color list
export const randomColor = () => colors[randomIndex()];
