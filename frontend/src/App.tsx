import React from 'react';
import 'antd/dist/antd.compact.css';
import { Button } from 'antd';
import Layout, { Content, Footer } from 'antd/lib/layout/layout';

import { GlobalTimeContextProvider } from './setup/GlobalTimeContextProvider';
import { ReactComponent as VulpisLogo } from './assets/vulpis.svg';
import CustomHeader from './components/elements/CustomHeader';
import { GlobalUiContextProvider } from './setup/GlobalUiContextProvider';
import MainContent from './MainContent';

function App(): React.ReactElement {
  return (
    <GlobalTimeContextProvider>
      <GlobalUiContextProvider>
        <Layout>
          <CustomHeader />
          <Content style={{ padding: '1.5rem' }}>
            <MainContent />
          </Content>
          <Footer
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'right',
              padding: '1rem 1.5rem'
            }}
          >
            ©
            <VulpisLogo height={20} style={{ marginLeft: '.4rem' }} />
            <Button type="link" size="small" href="https://www.vulpis.dev" target="_blank">
              vulpis web development
            </Button>
          </Footer>
        </Layout>
      </GlobalUiContextProvider>
    </GlobalTimeContextProvider>
  );
}

export default App;
