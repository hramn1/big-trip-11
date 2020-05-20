import {default as AbstractSmartComponent} from "./abstract-smart";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
const TRANSFER_EVENT_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`
];
const COLOR = {
  textColor: `#232323`,
  bgColor: `#69c0f1`,
  bgColorHover: `#3299e9`
};
const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const getUniqItemCount = (array, item) => {
  return array.filter((it) => it.item === item).length;
};

const convertTimeDiffToHours = (timeDiff) => {
  return Math.ceil(timeDiff / (3600 * 1000));
};

// ширина столбика горизонтальной диаграммы
const BAR_HEIGHT = 55;
const ICON_SIZE = 20;
const ICON_PADDING = ICON_SIZE;

// рисует иконки
const chartCallback = (animation) => {
  const chart = animation.chart;
  const axisY = chart.scales[`y-axis-0`];
  const ticks = axisY.ticks;
  const fontSize = axisY.options.ticks.fontSize;

  if (axisY.getPixelForTick(ticks.length - 1)) {
    ticks.forEach((tick, idx) => {

      const onLoadImage = (evt) => {
        const textParams = chart.ctx.font;
        chart.ctx.font = `normal ${fontSize}px sans-serif`;
        const tickWidth = chart.ctx.measureText(tick).width;
        chart.ctx.font = textParams;

        const tickY = axisY.getPixelForTick(idx) - fontSize;
        const tickX = axisY.right - tickWidth - ICON_SIZE - ICON_PADDING;

        chart.ctx.drawImage(evt.target, tickX, tickY, ICON_SIZE, ICON_SIZE);
        evt.target.removeEventListener(`load`, onLoadImage);
      };

      const tickIcon = new Image();
      tickIcon.addEventListener(`load`, onLoadImage);
      tickIcon.src = `img/icons/${tick.toLowerCase()}.png`;
    });
  }
};


const renderMoneyChart = (chartCtx, tripEvents) => {
  const chartLabels = tripEvents.map((tripEvent) => tripEvent.type)
    .filter(getUniqItems);

  const chartData = chartLabels.map((eventType) => tripEvents
    .reduce((sum, tripEvent) => (tripEvent.type === eventType) ? sum + tripEvent.price : sum, 0));

  // высота канваса
  chartCtx.height = BAR_HEIGHT * chartLabels.length;

  return new Chart(chartCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartLabels.map((text) => text.toUpperCase()),
      datasets: [{
        data: chartData,
        backgroundColor: COLOR.bgColor,
        hoverBackgroundColor: COLOR.bgColorHover,
        anchor: `start`
      }]
    },
    options: {
      events: [`click`],
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: COLOR.textColor,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: COLOR.textColor,
        fontSize: 23,
        position: `left`,
        padding: ICON_SIZE + ICON_PADDING / 2,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: COLOR.textColor,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false

      },
      tooltips: {
        enabled: false,
      },
      animation: {
        duration: 2000,
        onComplete: chartCallback
      }
    }
  });
}; // renderMoneyChart

const renderTransportChart = (chartCtx, tripEvents) => {
  const chartLabels = tripEvents.map((tripEvent) => tripEvent.type.toLowerCase())
    .filter((eventType) => TRANSFER_EVENT_TYPES.includes(eventType))
    .filter(getUniqItems);
  const chartData = chartLabels.map((label) => getUniqItemCount(tripEvents
    .filter((tripEvent) => tripEvent.type.toLowerCase() === label)));

  chartCtx.height = BAR_HEIGHT * chartLabels.length;

  return new Chart(chartCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartLabels.map((text) => text.toUpperCase()),
      datasets: [{
        data: chartData,
        backgroundColor: COLOR.bgColor,
        hoverBackgroundColor: COLOR.bgColorHover,
        anchor: `start`
      }]
    },
    options: {
      events: [`click`],
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: COLOR.textColor,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: COLOR.textColor,
        fontSize: 23,
        position: `left`,
        padding: ICON_SIZE + ICON_PADDING / 2,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: COLOR.textColor,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      },
      animation: {
        duration: 2500,
        onComplete: chartCallback
      }
    }
  });
}; // renderTransportChart


const renderTimeSpendChart = (chartCtx, tripEvents) => {
  const chartLabels = tripEvents.map((tripEvent) => tripEvent.city)
    .filter(getUniqItems);
  const chartData = chartLabels.map((label) => tripEvents
    .reduce((sum, tripEvent) => (tripEvent.city === label) ? sum + (tripEvent.tripDateEnd - tripEvent.tripDate) : sum, 0))
    .map(convertTimeDiffToHours);

  chartCtx.height = BAR_HEIGHT * chartLabels.length;

  return new Chart(chartCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartLabels.map((text) => `TO ${text.toUpperCase()}`),
      datasets: [{
        data: chartData,
        backgroundColor: COLOR.bgColor,
        hoverBackgroundColor: COLOR.bgColorHover,
        anchor: `start`
      }]
    },
    options: {
      events: [`click`],
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: COLOR.textColor,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPEND`,
        fontColor: COLOR.textColor,
        fontSize: 23,
        position: `left`,
        padding: ICON_SIZE + ICON_PADDING / 2,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: COLOR.textColor,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      },
    }
  });
};

const createStatisticsTemplate = () => {

  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>

    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();
    this.rerender(this._pointsModel);
  }

  recoveryListeners() {}

  rerender(pointsModel) {
    this._pointsModel = pointsModel;
    super.rerender();
    this._renderCharts();
  }

  _renderCharts() {
    const moneyCtx = this._element.querySelector(`.statistics__chart--money`);
    const transportCtx = document.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = document.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCtx, this._pointsModel.getPointsAllAscOrdered());

    this._transportChart = renderTransportChart(transportCtx, this._pointsModel.getPointsAllAscOrdered());

    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, this._pointsModel.getPointsAllAscOrdered());
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpendChart) {
      this._timeSpendChart.destroy();
      this._timeSpendChart = null;
    }
  }
}
