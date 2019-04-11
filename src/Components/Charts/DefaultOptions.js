import { formatMoney } from "../../Functions/AmountFormatting";

export const yAxesDefault = (theme, stacked = false) => {
    const textColor = theme ? theme.palette.text.primary : "#ffffff";

    return {
        stacked: stacked,
        fontColor: textColor,
        ticks: {
            fontColor: textColor,
            beginAtZero: true,
            callback: function(value, index, values) {
                return formatMoney(value);
            }
        }
    };
};

export const xAxesSeries = (theme, type = "time") => {
    const textColor = theme ? theme.palette.text.primary : "#ffffff";

    return {
        fontColor: textColor,
        type: type,
        distribution: "series",
        bounds: "ticks",
        ticks: {
            fontColor: textColor
        },
        time: {
            unit: "month"
        }
    };
};

export const doughnutOptions = (theme, customOptions = {}, type = "money") => {
    const textColor = theme ? theme.palette.text.primary : "#ffffff";

    return {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            mode: "label",
            intersect: false,
            callbacks: {
                label: function(tooltipItem, data) {
                    const index = tooltipItem.index;
                    const dataSet = data.datasets[0].data;

                    return type === "money" ? formatMoney(dataSet[index]) : parseFloat(dataSet[index]).toLocaleString();
                }
            }
        },
        plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
                color: textColor
            }
        },
        legend: {
            display: false,
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
