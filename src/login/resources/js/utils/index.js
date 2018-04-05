import 'core-js/fn/array/find';
import { THEME_TYPES } from '../actions';
import galleryManifest from '../../themes/manifest.json';

export const getThemeManifest = (type, id) => {
  let themeData = {};

  switch (type) {
    case THEME_TYPES.GALLERY:
      themeData = galleryManifest.find(theme => theme.id === id);
      break;
  }

  return themeData;
};

export const themeRelativeToAbsoluteUrl = (themeId, url) => {
  const absPat = /^https?:\/\/|^\/\//i;
  if (absPat.test(url)) {
    // Already absolute, nothing to do
    return url;
  } else {
    // Relative image URL, build the absolute URL
    return `${getThemesDir()}/${themeId}/${url}`;
  }
};

export const getThemeBackgroundFromManifest = (themeData) => {
  let background = themeData.background || {};
  let backgroundUrl = themeData.backgroundUrl;

  if (backgroundUrl) {
    backgroundUrl = themeRelativeToAbsoluteUrl(themeData.id, backgroundUrl);

    background.image = `url('${backgroundUrl}')`;
    background.size = background.size || 'cover';
    background.repeat = background.repeat || 'no-repeat';
  }

  return background;
};

export const getThemeBackgroundById = (type, id) =>
  getThemeBackgroundFromManifest(getThemeManifest(type, id));

export const getThemeStylesheetsFromManifest = (themeData) => {
  const stylesheets = themeData.stylesheets || [];
  return stylesheets.map((stylesheet) => themeRelativeToAbsoluteUrl(themeData.id, stylesheet));
};

export const getThemeStylesheetsById = (type, id) =>
  getThemeStylesheetsFromManifest(getThemeManifest(type, id));

export const getThemeLogoById = (type, id) => {
  const manifest = getThemeManifest(type, id);
  if (!!manifest.customLogo) {
    return themeRelativeToAbsoluteUrl(id, manifest.customLogo);
  }
  return `${getThemesDir()}/logo.svg`;
};

const getThemesDir = () => {
  const bundlePath = document.querySelector('script[src*="themes"]').getAttribute('src');
  const bundleName = bundlePath.split('/').pop();
  return `${bundlePath.replace(`js/${bundleName}`, '')}themes`;
};
