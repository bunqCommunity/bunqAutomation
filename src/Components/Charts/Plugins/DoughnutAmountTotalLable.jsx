import { formatMoney } from "../../../Functions/AmountFormatting";

export default {
    beforeDraw: chart => {
        if (chart.chart.chart.config.type === "doughnut") {
            if (chart.chart.chart.data.datasets[0].data.length === 0) return;

            const width = chart.chart.width;
            const height = chart.chart.height;
            const ctx = chart.chart.ctx;
            ctx.restore();

            const divideByValue = 150;
            const fontSizeH = (height / divideByValue).toFixed(2);
            const fontSizeW = (width / divideByValue).toFixed(2);

            // get smallest one so lower width still works
            const fontSize = fontSizeH < fontSizeW ? fontSizeH : fontSizeW;

            ctx.fillStyle = chart.options.tooltips.bodyFontColor;
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";

            // Ensure your first data is the percentage data in your dataset
            const totalAmount = chart.chart.chart.data.datasets[0].data.reduce((total, value) => total + value, 0);

            const text = formatMoney(totalAmount);
            const textSize = ctx.measureText(text);
            const textX = Math.round((width - textSize.width) / 2);
            const textY = height / 2 - 10;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }
};
