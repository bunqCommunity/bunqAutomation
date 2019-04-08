import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import Finance from "../../Components/Icons/Finance";

import { formatMoney } from "../../Functions/AmountFormatting";

const styles = theme => ({
    paper: {
        padding: 8,
        height: 416
    },
    paperHeader: {
        display: "flex",
        margin: 8
    },
    paperHeaderText: {
        marginLeft: 8
    }
});

const getOptions = theme => {
    const textColor = theme.palette.text.primary;
    return {
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    stacked: true,
                    fontColor: textColor,
                    ticks: {
                        fontColor: textColor,
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return formatMoney(value);
                        }
                    }
                }
            ],
            xAxes: [
                {
                    fontColor: textColor,
                    type: "time",
                    distribution: "series",
                    bounds: "ticks",
                    ticks: {
                        fontColor: textColor
                    },
                    time: {
                        unit: "month"
                    }
                }
            ]
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
        }
    };
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;
const getRandomData = (itemCount, customOptions = { min: -100, max: 300, start: 2000 }) => {
    const defaultOptions = { min: -100, max: 300, start: 2000 };
    const options = { ...defaultOptions, ...customOptions };
    const dataSet = [];
    let previousNumber = options.start;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - itemCount);

    for (let i = 0; i < itemCount; i++) {
        const x = startDate.setDate(startDate.getDate() + 1);

        dataSet.push({ x: x, y: previousNumber });
        let changeAmount = getRandomNumber(options.min, options.max);
        if (previousNumber + changeAmount < 0) {
            changeAmount = getRandomNumber(options.min, options.max);
        }
        previousNumber += changeAmount;
    }

    return dataSet;
};

const BalanceGraph = ({ classes, theme }) => {
    console.log(theme);
    const randomData = getRandomData(30);
    const randomData2 = getRandomData(30);
    const randomData3 = getRandomData(30, { min: -200 });
    const options = getOptions(theme);

    return (
        <React.Fragment>
            <div className={classes.paperHeader}>
                <SvgIcon color="action">
                    <Finance />
                </SvgIcon>
                <Typography className={classes.paperHeaderText} variant="subtitle1">
                    Balance history
                </Typography>
            </div>

            <Paper className={classes.paper}>
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                data: randomData,
                                backgroundColor: "rgba(0, 255, 151, 0.8)",
                                label: "Payments"
                            },
                            {
                                data: randomData2,
                                backgroundColor: "rgba(255, 0, 18, 0.8)",
                                label: "Savings"
                            },
                            {
                                data: randomData3,
                                backgroundColor: "rgba(6,162,255,0.8)",
                                label: "Subscriptions"
                            }
                        ]
                    }}
                />
            </Paper>
        </React.Fragment>
    );
};

export default withTheme()(withStyles(styles)(BalanceGraph));
