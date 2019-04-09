import { formatMoney } from "../../../Functions/AmountFormatting";

export default {
    beforeDraw: chart => {
        if (chart.chart.chart.config.type === "doughnut") {
            const width = chart.chart.width;
            const height = chart.chart.height;
            const ctx = chart.chart.ctx;
            ctx.restore();

            const fontSize = (height / 140).toFixed(2);
            ctx.fillStyle = chart.options.tooltips.bodyFontColor;
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";

            // Ensure your first data is the percentage data in your dataset
            const totalAmount = chart.chart.chart.data.datasets[0].data.reduce((total, value) => total + value, 0);

            const text = formatMoney(totalAmount);
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }
};
