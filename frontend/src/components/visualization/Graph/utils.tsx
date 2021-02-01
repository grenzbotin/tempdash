/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { area, curveMonotoneX } from 'd3-shape';

import { SENSOR_SETTINGS, getThresholds } from '../../../setup/settings';

const getAxisBottomTicks = (range: number[] | number): { axisBottom?: { format?: string; tickValues?: string } } => {
  const differenceInHours = moment.unix(range[1]).diff(moment.unix(range[0]), 'hours');
  let axisBottom = {};

  switch (true) {
    case differenceInHours >= 6000:
      axisBottom = {
        format: '%m/%Y',
        tickValues: 'every month'
      };
      break;
    case differenceInHours >= 5000:
      axisBottom = {
        format: '%d.%m',
        tickValues: 'every 2 weeks'
      };
      break;
    case differenceInHours >= 1032:
      axisBottom = {
        format: '%d.%m',
        tickValues: 'every 7 days'
      };
      break;
    case differenceInHours >= 504:
      axisBottom = {
        format: '%d.%m',
        tickValues: 'every 2 days'
      };
      break;
    case differenceInHours >= 336:
      axisBottom = {
        format: '%d.%m',
        tickValues: 'every day'
      };
      break;
    case differenceInHours >= 167:
      axisBottom = {
        format: '%d.%m, %H:%M',
        tickValues: 'every day'
      };
      break;
    case differenceInHours >= 70:
      axisBottom = {
        format: '%d.%m, %H:%M',
        tickValues: 'every 12 hours'
      };
      break;
    case differenceInHours >= 47:
      axisBottom = {
        format: '%d.%m, %H:%M',
        tickValues: 'every 6 hours'
      };
      break;
    case differenceInHours >= 10:
      axisBottom = {
        format: '%H:%M',
        tickValues: 'every 4 hours'
      };
      break;
    case differenceInHours > 0:
      axisBottom = {
        format: '%H:%M',
        tickValues: 'every 1 hour'
      };
      break;
    default:
      axisBottom = {
        format: '%d.%m',
        tickValues: 'every day'
      };
  }

  return axisBottom;
};

const getCommonGraphProps = (range: number[] | number): any => ({
  margin: {
    top: 20,
    right: 70,
    bottom: 60,
    left: 70
  },
  xScale: {
    type: 'time',
    format: '%s',
    precision: 'minute',
    min: range[0],
    max: range[1]
  },
  enableGridX: false,
  axisTop: null,
  curve: 'monotoneX',
  pointSize: 0
});

const getColoredAxis = (color: string): { axis: Record<undefined, undefined> } => ({
  axis: {
    ticks: {
      text: { fill: '#8A8A8A' }
    },
    legend: {
      text: {
        fill: color
      }
    }
  }
});

interface ThresholdLayer {
  points: any;
  xScale: (_value: number) => number;
  yScale: (_value: number) => number;
}

const getAreaThresholdLayer = (
  { points, xScale, yScale }: ThresholdLayer,
  source: string,
  sensorType: any
): React.SVGProps<SVGPathElement> => {
  const areaGenerator = area()
    .x((d: any) => xScale(d.data.x))
    .y0(() => yScale(getThresholds(source)[sensorType].min))
    .y1(() => yScale(getThresholds(source)[sensorType].max))
    .curve(curveMonotoneX);

  return <path d={areaGenerator(points)} fill={`${SENSOR_SETTINGS[sensorType].color}26`} />;
};

export { getAxisBottomTicks, getCommonGraphProps, getColoredAxis, getAreaThresholdLayer };
