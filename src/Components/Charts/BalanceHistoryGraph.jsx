import React, { useState, useEffect } from "react";
import { withTheme } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";

import { formatMoney } from "../../Functions/AmountFormatting";
import { yellow, purple, lightBlue } from "../../Config/Colors";

import { xAxesSeries, yAxesDefault } from "./DefaultOptions";

const getOptions = theme => {
    const textColor = theme.palette.text.primary;

    const yAxes = [yAxesDefault(theme, true)];
    const xAxes = [xAxesSeries(theme)];

    return {
        maintainAspectRatio: false,
        scales: {
            yAxes: yAxes,
            xAxes: xAxes
        },
        tooltips: {
            mode: "label",
            intersect: false,
            label: "mylabel",
            callbacks: {
                label: function(tooltipItem, data) {
                    return formatMoney(tooltipItem.yLabel);
                }
            }
        },
        legend: {
            labels: {
                fontColor: textColor
            }
        },
        animation: {
            animateScale: false
        }
    };
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

const getRandomData = (itemCount, customOptions = { min: 100, max: 300, start: 2000 }) => {
    const defaultOptions = { min: 100, max: 300, start: 2000 };
    const options = { ...defaultOptions, ...customOptions };
    const dataSet = [];
    let previousNumber = options.start;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - itemCount);

    for (let i = 0; i < itemCount; i++) {
        const x = startDate.setDate(startDate.getDate() + 1);

        dataSet.push({ x: x, y: previousNumber });
        let changeAmount = getRandomNumber(options.min, options.max);
        if (getRandomNumber(0, 10) < 5) changeAmount = changeAmount * -1;

        previousNumber += changeAmount;
        if (previousNumber < 0) previousNumber = 500;
    }

    return dataSet;
};

const BalanceHistoryGraph = ({ forceUpdate = false, theme }) => {
    const [dataSet1, setDataSet1] = useState([]);
    const [dataSet2, setDataSet2] = useState([]);
    const [dataSet3, setDataSet3] = useState([]);

    useEffect(() => {
        setDataSet1(getRandomData(30, { start: getRandomNumber(500, 1000) }));
        setDataSet2(getRandomData(30, { start: getRandomNumber(1000, 2000) }));
        setDataSet3(getRandomData(30, { start: getRandomNumber(250, 500) }));
    }, [forceUpdate]);

    const options = getOptions(theme);

    return (
        <Line
            key={JSON.stringify(options)}
            options={options}
            data={{
                datasets: [
                    {
                        data: dataSet1,
                        backgroundColor: yellow,
                        label: "Payments"
                    },
                    {
                        data: dataSet2,
                        backgroundColor: purple,
                        label: "Savings"
                    },
                    {
                        data: dataSet3,
                        backgroundColor: lightBlue,
                        label: "Subscriptions"
                    }
                ]
            }}
        />
    );
};

export default withTheme()(BalanceHistoryGraph);
