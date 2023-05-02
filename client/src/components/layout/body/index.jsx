/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { loadPmaxFail, loadPmaxSuccess } from 'redux/reducers/pmaxReducer';
import { loadDataFail, loadDataSuccess } from 'redux/reducers/dataReducer';
import {
  loadReferentielFail,
  loadReferentielSuccess,
} from 'redux/reducers/referentielReducer';
import { useDispatch } from 'react-redux';
import {
  REACT_APP_ANALYSETDONNES_RTE_PROD,
  REACT_APP_DATA_CLOUD_RTE_PROD,
  REACT_APP_DATA_DEV_RTE,
  REACT_APP_DATA_DEV_RTE_PROD,
  REACT_APP_DATA_RTE_PROD,
  REACT_APP_DEV,
  REACT_APP_PREPROD_DATA,
} from 'utils/constants';
import Loading from './Loading';
import Dashboard from './dashboard';
import Error from './Error';
import { useGetDataQuery } from '../../../api';

const env = (prod) => {
  if (process.env.NODE_ENV !== 'production') {
    prod.map((envDev) => {
      return envDev;
    });
  }
};

export const envDev = env([
  `
	${REACT_APP_PREPROD_DATA},
	${REACT_APP_DATA_CLOUD_RTE_PROD},
	${REACT_APP_ANALYSETDONNES_RTE_PROD},
	${REACT_APP_DATA_RTE_PROD},
	${REACT_APP_DATA_DEV_RTE_PROD},
	${REACT_APP_DATA_DEV_RTE},
	${REACT_APP_DEV}
	`,
]);

const { REACT_APP_NUKE_API } = process.env;
function Body() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);

  const fetchData = async () => {
    await axios
      .get(`${REACT_APP_NUKE_API}/data`, {
        headers: {
          'Access-Control-Allow-Origin': `${envDev}`,
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        dispatch(loadDataSuccess(response.data));
      });
    await axios
      .get(`${REACT_APP_NUKE_API}/referentiel`, {
        headers: {
          'Access-Control-Allow-Origin': `${envDev}`,
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        dispatch(loadReferentielSuccess(response.data));
      });
    await axios
      .get(`${REACT_APP_NUKE_API}/pmax`, {
        headers: {
          'Access-Control-Allow-Origin': `${envDev}`,
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        dispatch(loadPmaxSuccess(response.data));
      })
      .finally(() => {
        setLoad(false);
      });
  };

  useEffect(async () => {
    fetchData();
  }, []);

  return <>{load ? <Loading /> : <Dashboard />}</>;
}

export default Body;
