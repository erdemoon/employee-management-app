import {getLanguage} from '../../store/actions';

import {en} from '../../lang/en';
import {tr} from '../../lang/tr';

// Map language codes to language objects
const Data = {
  en,
  tr,
};

export const getLocalizedData = (key) => {
  return Data[getLanguage()][key];
};

export const getSupportedLanguages = () => {
  return ['en', 'tr'];
};
