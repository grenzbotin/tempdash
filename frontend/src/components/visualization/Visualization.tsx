import { useContext, useState } from 'react';
import {
  CameraFilled,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LineChartOutlined,
  TableOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';

import CustomCard from '../elements/CustomCard';
import { getRoomName } from '../../setup/rooms';
import DoubleYAxisGraph from './Graph/DoubleYAxisGraph';
import Table from './Table';
import { DataProps, getGraphData, getTableData } from './utils';
import { GlobalTimeSelectionContext } from '../../setup/GlobalTimeContextProvider';
import { calculateImageSize, clone, downloadImage, IMAGE_DOWNLOAD_OPTIONS } from './imageDownload';
import { GlobalUiSelectionContext } from '../../setup/GlobalUiContextProvider';
import TableDownload from './TableDownload';

const Visualization = ({
  source,
  isLoading,
  data
}: {
  source: string;
  isLoading: boolean;
  data: DataProps;
}): JSX.Element => {
  const { displayedRange } = useContext(GlobalTimeSelectionContext);
  const { graphFullView, toggleGraphFullView } = useContext(GlobalUiSelectionContext);
  const [mode, setMode] = useState('graph');

  const handleImageDownloadClick: MenuClickEventHandler = ({ key }): void => {
    const { width, height, scale } = calculateImageSize(key.toString(), source);
    const cloned = clone(scale, source);
    downloadImage(cloned, width, height, source, displayedRange);
  };

  const imageDownloadMenu = (
    <Menu onClick={handleImageDownloadClick}>
      {IMAGE_DOWNLOAD_OPTIONS.map((option) => (
        <Menu.Item key={option[1]}>{option[0]}</Menu.Item>
      ))}
    </Menu>
  );

  const modeRender = {
    graph: <DoubleYAxisGraph source={source} graphData={getGraphData(data, displayedRange)} />,
    table: <Table data={getTableData(data, displayedRange)} />
  };

  const actionRender = {
    graph: (
      <Dropdown overlay={imageDownloadMenu} trigger={['click']}>
        <Button icon={<CameraFilled />} style={{ marginLeft: '.5rem' }} />
      </Dropdown>
    ),
    table: <TableDownload data={getTableData(data, displayedRange)} source={source} />
  };

  return (
    <CustomCard
      extra={
        <>
          <Button
            icon={mode === 'graph' ? <TableOutlined /> : <LineChartOutlined />}
            onClick={() => setMode(mode === 'graph' ? 'table' : 'graph')}
          />
          <Button
            icon={!graphFullView ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
            onClick={toggleGraphFullView}
            style={{ marginLeft: '.5rem' }}
          />
          {actionRender[mode]}
        </>
      }
      title={getRoomName(source)}
      loading={isLoading}
    >
      {modeRender[mode]}
    </CustomCard>
  );
};

export default Visualization;
