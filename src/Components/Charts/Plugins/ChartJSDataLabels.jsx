import ChartJS from "chart.js";
import * as ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.plugins.unregister(ChartDataLabels);

export default ChartDataLabels;
