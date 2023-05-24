import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loadDataSuccess } from 'redux/reducers/dataReducer';
import { loadReferentielSuccess } from 'redux/reducers/referentielReducer';
import { loadPmaxSuccess } from 'redux/reducers/pmaxReducer';
import { RefreshIcon } from '../../../../../../utils/SVGs';
import Buttons from '../../../../../../utils/Buttons';
import RefreshText from './RefreshText';

const { REACT_APP_NUKE_API } = process.env;
function RefreshDate() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  async function fetchData() {
    setLoad(true);
    await axios.get(`${REACT_APP_NUKE_API}/data`).then((response) => {
      dispatch(loadDataSuccess(response.data));
    });
    await axios.get(`${REACT_APP_NUKE_API}/referentiel`).then((response) => {
      dispatch(loadReferentielSuccess(response.data));
    });
    await axios
      .get(`${REACT_APP_NUKE_API}/pmax`)
      .then((response) => {
        dispatch(loadPmaxSuccess(response.data));
      })
      .finally(() => {
        setLoad(false);
      });
  }
  const handleClick = () => {
    // TODO
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Row wrap={false} className="refresh" align="middle" gutter={[19, 0]}>
      <Col>
        <Buttons
          styling="refresh"
          icon={<RefreshIcon />}
          loading={load}
          clickHandler={() => {
            return handleClick();
          }}
        />
      </Col>
      <Col>
        <RefreshText />
      </Col>
    </Row>
  );
}

export default RefreshDate;
