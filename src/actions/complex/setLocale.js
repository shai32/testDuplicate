import { addLocaleData } from 'react-intl';
import { getLocaleData } from 'grommet/utils/Locale';
import get from 'lodash/get';
import split from 'lodash/split';
import { setLocalData } from '../base';

let load = {
  en: Promise.all([import('../../translations/en'), import(`react-intl/locale-data/en`)]),
  he: Promise.all([import('../../translations/he'), import(`react-intl/locale-data/he`)])
};

export default function(locale) {
  return async dispatch => {
    try {
      const lang = get(split(locale, '-'), 0);
      const [translations, localeData] = await get(load, lang, load.en);
      addLocaleData(localeData);
      const localData = getLocaleData(translations, locale);
      localData.lang = lang;
      dispatch(setLocalData(localData));
    } catch (e) {
      console.error(e);
    }
  };
}
