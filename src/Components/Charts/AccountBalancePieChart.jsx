import React, { useState, useEffect } from "react";
import { withTheme } from "@material-ui/core/styles";
import { Doughnut } from "react-chartjs-2";

import { formatMoney } from "../../Functions/AmountFormatting";
import { yellow, purple, lightBlue } from "./Colors";

const getOptions = theme => {
    const textColor = theme.palette.text.primary;

    return {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            mode: "label",
            intersect: false,
            label: "mylabel",
            callbacks: {
                label: function(tooltipItem, data) {
                    const index = tooltipItem.index;
                    const dataSet = data.datasets[0].data;

                    return formatMoney(dataSet[index]);
                }
            }
        },
        legend: {
            labels: {
                fontColor: textColor
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

const AccountBalancePieChart = ({ forceUpdate = false, theme }) => {
    const [accountBalance1, setAccountBalance1] = useState(0);
    const [accountBalance2, setAccountBalance2] = useState(0);
    const [accountBalance3, setAccountBalance3] = useState(0);

    useEffect(() => {
        setAccountBalance1(getRandomNumber(500, 1000));
        setAccountBalance2(getRandomNumber(1000, 2000));
        setAccountBalance3(getRandomNumber(250, 500));
    }, [forceUpdate]);

    const options = getOptions(theme);

    return (
        <Doughnut
            key={JSON.stringify(options)}
            options={options}
            data={{
                datasets: [
                    {
                        backgroundColor: [yellow, purple, lightBlue],
                        labels: ["Account balances"],
                        data: [accountBalance1, accountBalance2, accountBalance3]
                    }
                ],
                labels: ["Payments", "Savings", "Subscriptions"]
            }}
        />
    );
};

export default withTheme()(AccountBalancePieChart);
