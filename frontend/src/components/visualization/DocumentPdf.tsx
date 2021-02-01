import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';

import { getRoomName } from '../../setup/rooms';
import { SENSOR_SETTINGS } from '../../setup/settings';
import { DataItem } from './utils';

const BORDER_COLOR = '#f0f0f0';
const BORDER_STYLE = 'solid';
const COL1_WIDTH = 40;
const COLN_WIDTH = (100 - COL1_WIDTH) / 2;

// Create styles
const styles = StyleSheet.create({
  body: {
    padding: 20,
    backgroundColor: '#f0f2f5'
  },
  headerSection: {
    margin: 6
  },
  header: {
    fontSize: 12,
    fontWeight: 700
  },
  subHeader: {
    fontSize: 9,
    fontWeight: 500
  },
  table: {
    margin: 6,
    display: 'table',
    width: 'auto'
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    color: '#000'
  },
  tableCol1Header: {
    width: `${COL1_WIDTH}%`,
    backgroundColor: '#fafafa',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0
  },
  tableColHeader: {
    width: `${COLN_WIDTH}%`,
    backgroundColor: '#fafafa',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0
  },
  tableCol1: {
    width: `${COL1_WIDTH}%`,
    backgroundColor: '#fff',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0
  },
  tableCol: {
    width: `${COLN_WIDTH}%`,
    backgroundColor: '#fff',
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeader: {
    fontSize: 8,
    fontWeight: 500,
    padding: '10px 6px'
  },
  tableCell: {
    fontSize: 8,
    padding: '8px 6px'
  }
});

// Create Document Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DocumentPdf = ({ source, data }: { source: string; data: DataItem[] }): any => (
  <Document>
    <Page size="A4" style={styles.body}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>Sensor log</Text>
        <Text style={styles.subHeader}>Room: {getRoomName(source)}</Text>
        <Text style={styles.subHeader}>
          Time window: {moment.unix(data[0].time).format('LLL')} -{' '}
          {moment.unix(data[data.length - 1].time).format('LLL')}
        </Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1Header}>
            <Text style={styles.tableCellHeader}>Time</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Temperature</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Humidity</Text>
          </View>
        </View>
        {data.map((entry) => (
          <View key={entry.time} style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>{moment.unix(entry.time).format('LLL')}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {entry.temperature.toFixed(1)}
                {SENSOR_SETTINGS.temperature.unit}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {entry.humidity.toFixed(1)}
                {SENSOR_SETTINGS.humidity.unit}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default DocumentPdf;
