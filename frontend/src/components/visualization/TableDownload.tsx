import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Button } from 'antd';
import { saveAs } from 'file-saver';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';

import DocumentPdf from './DocumentPdf';
import { getRoomName } from '../../setup/rooms';
import { DataItem } from './utils';

const TableDownload = ({ data, source }: { data: DataItem[]; source: string }): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const preparePDF = async (): Promise<Blob> => {
    const doc = <DocumentPdf data={data} source={source} />;
    const asPdf = pdf(doc);
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    return blob;
  };

  const handleButtonClick = (): void => {
    setLoading(true);
    // TODO - Downsampling: On big data sets this takes a lot of time
    setTimeout(() => {
      preparePDF().then((value) => {
        setLoading(false);
        saveAs(
          value,
          `${getRoomName(source)}-${moment.unix(data[0].time).format('LLL')}-${moment
            .unix(data[data.length - 1].time)
            .format('LLL')}.pdf`
        );
      });
    }, 0);
  };

  return (
    <Button
      onClick={handleButtonClick}
      icon={loading ? <LoadingOutlined /> : <DownloadOutlined />}
      style={{ marginLeft: '.5rem' }}
    />
  );
};

export default TableDownload;
