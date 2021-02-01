import { Card } from 'antd';
import React from 'react';

interface CustomCardProps {
  loading: boolean;
  title?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
}

const CustomCard = ({ loading, title, extra, children }: CustomCardProps): React.ReactElement => (
  <Card
    loading={loading}
    extra={extra}
    title={title}
    headStyle={{ background: '#fafafa', padding: '.3rem 1rem', fontSize: '.8rem' }}
    style={{ margin: '1rem 0', boxShadow: '1px 1px 1px 0px rgba(0,0,0,.12)' }}
  >
    {children}
  </Card>
);

export default CustomCard;
