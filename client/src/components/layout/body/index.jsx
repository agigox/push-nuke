/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Loading from './Loading';
import Dashboard from './dashboard';
import Error from './Error';
import { useGetDataQuery } from '../../../api';

function Body() {
  const [loadingUI, setLoadingUI] = useState(true);
  const [errorUI, setErrorUI] = useState(undefined);
  const [dataUI, setDataUI] = useState(undefined);
  const {
    data: dataReferentiel,
    error: errorReferentiel,
    isFetching: isReferentielLoading,
  } = useGetDataQuery('referentiel');

  const {
    data: dataItems,
    error: errorItems,
    isFetching: isItemsLaoding,
  } = useGetDataQuery('data');
  const {
    data: dataPmax,
    error: errorPmax,
    isFetching: isPmaxLoading,
  } = useGetDataQuery('pmax');
  const data = dataItems && dataReferentiel && dataPmax;
  const error = errorItems && errorReferentiel && errorPmax;
  const loading = isItemsLaoding && isReferentielLoading && isPmaxLoading;

  useEffect(() => {
    setLoadingUI(loading);
    setErrorUI(error);
    setDataUI(data);
  }, [loading, error, data]);
  return (
    <>
      {errorUI ? (
        <Error />
      ) : loadingUI ? (
        <Loading />
      ) : dataUI ? (
        <Dashboard />
      ) : null}
    </>
  );
}

export default Body;
