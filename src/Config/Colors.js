export const green = "#1EB980";
export const darkGreen = "#045D56";
export const salmon = "#FF6859";
export const yellow = "#FFCF44";
export const purple = "#B15DFF";
export const lightBlue = "#72DEFF";

export const colors = [green, darkGreen, salmon, yellow, purple, lightBlue];

const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;
const randomIndex = () => getRandomNumber(0, colors.length);

export const randomColor = () => colors[randomIndex()];
