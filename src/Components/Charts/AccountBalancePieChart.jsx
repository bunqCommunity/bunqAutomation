import React, { useEffect, useState } from "react";
import { withTheme } from "@material-ui/core/styles";
import { Doughnut } from "react-chartjs-2";

import { formatMoney } from "../../Functions/AmountFormatting";
import { getColorByIndex } from "../../Config/Colors";

import DoughtnutAmountTotalLabel from "./Plugins/DoughnutAmountTotalLable";

const getOptions = theme => {
    const textColor = theme.palette.text.primary;

    return {
        maintainAspectRatio: false,
        responsive: true,
        cutoutPercentage: 80,
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

const AccountBalancePieChart = ({ theme, monetaryAccounts }) => {
    const options = getOptions(theme);
    const [backgroundColors, setBackgroundColors] = useState([]);
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (monetaryAccounts) {
            // temporary arrays
            const tempBackgroundColors = [];
            const tempLabels = [];
            const tempData = [];

            // push a color/label/data to the arrays
            monetaryAccounts.forEach((monetaryAccount, index) => {
                tempBackgroundColors.push(getColorByIndex(index));
                tempLabels.push(monetaryAccount.description);
                tempData.push(parseFloat(monetaryAccount.balance.value));
            });

            setBackgroundColors(tempBackgroundColors);
            setLabels(tempLabels);
            setData(tempData);
        }
    }, [JSON.stringify(monetaryAccounts)]);

    console.log("");
    console.log(backgroundColors);
    console.log(labels);
    console.log(data);

    return (
        <Doughnut
            key={JSON.stringify(options)}
            options={options}
            plugins={[DoughtnutAmountTotalLabel]}
            data={{
                datasets: [
                    {
                        backgroundColor: backgroundColors,
                        labels: ["Account balances"],
                        data: data
                    }
                ],
                labels: labels
            }}
        />
    );
};

export default withTheme()(AccountBalancePieChart);
