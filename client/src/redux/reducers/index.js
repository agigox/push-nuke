import referentielReducer from './referentielReducer';

import crossReducer from './crossReducer';
import dataReducer from './dataReducer';
import pmaxReducer from './pmaxReducer';

export default {
  referentiel: referentielReducer,
  data: dataReducer,
  pmax: pmaxReducer,
  cross: crossReducer,
};
