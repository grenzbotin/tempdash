import { useContext } from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';
import moment from 'moment';

import { GlobalTimeSelectionContext } from '../../../setup/GlobalTimeContextProvider';
import { getAreaThresholdLayer, getAxisBottomTicks, getColoredAxis, getCommonGraphProps } from './utils';

const DoubleYAxisGraph = ({
  graphData,
  source
}: {
  graphData: { data1: Serie; data2: Serie };
  source: string;
}): JSX.Element => {
  const { displayedRange } = useContext(GlobalTimeSelectionContext);

  return (
    <div className="wrapper">
      <div id={`${source}-1`} className="graphContainer">
        <ResponsiveLine
          data={[graphData.data1]}
          colors={graphData.data1.color}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: (e) => `${e}${graphData.data1.unit}`,
            legend: graphData.data1.name,
            legendOffset: -45,
            legendPosition: 'middle'
          }}
          yScale={{
            type: 'linear',
            min: graphData.data1.yScaleMin,
            max: graphData.data1.yScaleMax
          }}
          yFormat={(e) => `${e}${graphData.data1.unit}`}
          axisBottom={{
            ...getAxisBottomTicks(displayedRange),
            tickRotation: -50
          }}
          layers={['grid', 'axes', (e) => getAreaThresholdLayer(e, source, graphData.data1.id), 'lines']}
          theme={getColoredAxis(graphData.data1.color)}
          {...getCommonGraphProps(displayedRange)}
        />
      </div>
      <div id={`${source}-2`} className="secondGraph">
        <SecondGraph graphData={graphData} source={source} />
      </div>
    </div>
  );
};

const SecondGraph = ({
  graphData,
  source
}: {
  graphData: { data1: Serie; data2: Serie };
  source: string;
}): JSX.Element => {
  const { displayedRange } = useContext(GlobalTimeSelectionContext);
  const { data1, data2 } = graphData;
  const data1And2 = [{ ...data1 }, { ...data2 }];

  return (
    <ResponsiveLine
      data={data1And2}
      colors={['rgba(255, 255, 255, 0)', data2.color]}
      axisRight={{
        legend: data2.name,
        format: (e) => `${e}${data2.unit}`,
        legendPosition: 'middle',
        legendOffset: 45
      }}
      axisLeft={null}
      enableGridY={false}
      axisBottom={null}
      theme={getColoredAxis(data2.color)}
      yScale={{
        type: 'linear',
        min: data2.yScaleMin,
        max: data2.yScaleMax
      }}
      yFormat={(e) => `${parseFloat(`${e}`).toFixed(2)}${data2.unit}`}
      useMesh
      enableSlices="x"
      layers={['grid', 'axes', (e) => getAreaThresholdLayer(e, source, data2.id), 'lines', 'slices', 'crosshair']}
      sliceTooltip={({ slice }) => (
        <div
          style={{
            background: 'white',
            padding: '.5rem .7rem',
            border: '1px solid #ccc',
            boxShadow: '2px 2px 4px -3px #ccc'
          }}
        >
          <div>
            <strong style={{ color: '#8A8A8A' }}>{moment(slice.points[0].data.x).format('lll')}</strong>
          </div>
          <hr style={{ border: '1px solid #e8e8e8' }} />
          {slice.points.map((point) => (
            <div
              key={point.id}
              style={{
                color: point.serieColor === 'rgba(255, 255, 255, 0)' ? data1.color : point.serieColor,
                padding: '3px 0',
                lineHeight: '1.2rem'
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                {point.serieId === data1.id
                  ? `${parseFloat(`${point.data.y}`).toFixed(2)}${data1.unit}`
                  : point.data.yFormatted}
              </div>
              <div
                style={{
                  textTransform: 'capitalize',
                  fontSize: '.6rem'
                }}
              >
                {point.serieId}
              </div>
            </div>
          ))}
        </div>
      )}
      {...getCommonGraphProps(displayedRange)}
    />
  );
};

export default DoubleYAxisGraph;
