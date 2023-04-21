import React from 'react';
import { Row, Spin } from 'antd';
import styled from '@emotion/styled';

const StyledRow = styled(Row)`
  height: calc(100vh - 158px);
  background-color: #19252a;
  .ant-spin {
    color: white;
    font-size: 33px;
  }
  .ant-spin-dot {
    font-size: 50px;
    color: white;
  }
  .ant-spin-dot i {
    height: 20px;
    width: 20px;
  }
  .ant-spin-dot-item {
    background-color: white;
  }
`;
function Loading() {
  return (
    <StyledRow justify="space-around" align="middle">
      <Spin size="large" tip="Chargement des données de production..." />
    </StyledRow>
  );
}

export default Loading;
