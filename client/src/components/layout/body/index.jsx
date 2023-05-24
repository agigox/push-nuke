/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadPmaxSuccess } from 'redux/reducers/pmaxReducer';
import { loadDataSuccess } from 'redux/reducers/dataReducer';
import { loadReferentielSuccess } from 'redux/reducers/referentielReducer';
import { useDispatch } from 'react-redux';
import Loading from './Loading';
import Dashboard from './dashboard';

const { REACT_APP_NUKE_API } = process.env;
function Body() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function fetchData() {
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
    fetchData();
  }, []);

  return <>{load ? <Loading /> : <Dashboard />}</>;
}

export default Body;
