import referentielReducer from './referentielReducer';

import crossReducer from './crossReducer';
import dataReducer from './dataReducer';
import pmaxReducer from './pmaxReducer';
import bilanReducer from './bilanReducer';

export default {
  referentiel: referentielReducer,
  data: dataReducer,
  pmax: pmaxReducer,
  cross: crossReducer,
  bilan: bilanReducer,
};
