import React, { useContext } from 'react';
import { Col, Row, Typography } from 'antd';

import Visualization from './components/visualization';
import RangeSlider from './components/elements/RangeSlider';
import Last from './components/Last';
import Weather from './components/Weather';
import { GlobalUiSelectionContext } from './setup/GlobalUiContextProvider';
import { ROOMS } from './setup/rooms';
import { CITIES } from './setup/settings';

const { Title } = Typography;

const MainContent = (): React.ReactElement => {
  const { current, graphFullView } = useContext(GlobalUiSelectionContext);

  const mainColProps = {
    xs: 24,
    sm: 24,
    md: current ? 16 : 24,
    lg: current ? 17 : 24,
    xl: current ? 19 : 24
  };

  return (
    <Row gutter={[16, 16]}>
      {current && (
        <Col xs={24} sm={24} md={8} lg={7} xl={5}>
          <Title level={3}>Climate</Title>
          {ROOMS.map((room) => (
            <Last key={room} source={room} />
          ))}
          <Title level={3} style={{ marginTop: '2rem' }}>
            Weather
          </Title>
          {CITIES.map((cityId) => (
            <Weather key={cityId} cityId={cityId} />
          ))}
        </Col>
      )}
      <Col {...mainColProps}>
        <Title level={3}>Historical Data</Title>
        <RangeSlider />
        <Row gutter={[16, 16]}>
          {ROOMS.map((room) => (
            <Col key={room} xl={graphFullView ? 24 : 12} lg={24} md={24} sm={24} xs={24}>
              <Visualization source={room} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default MainContent;
