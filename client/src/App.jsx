import React from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment-timezone';
import styled from '@emotion/styled';
import store from './redux/store';
import AppLayout from './components/layout/AppLayout';

moment.tz.setDefault('Europe/Paris');

const Wrapper = styled.div`
  width: 1440px;
  margin: 0 auto;
  @media only screen and (max-width: 767px) {
    width: 390px;
  }
`;
function App() {
  return (
    <Wrapper>
      <Provider store={store}>
        <AppLayout />
      </Provider>
    </Wrapper>
  );
}

export default App;
