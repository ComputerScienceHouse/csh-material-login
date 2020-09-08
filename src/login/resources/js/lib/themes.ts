import type { Theme, ThemeBackground } from "./types";
import galleryManifest from "../../themes/manifest.json";

function getResourcesDir(): string {
  const tag = document.querySelector('script[src*="login"]');
  const bundlePath = tag?.getAttribute("src");

  if (!bundlePath) {
    throw new Error(
      "getResourcesDir: Unable to obtain resource URL from script tag"
    );
  }

  const bundleName = bundlePath.split("/").pop();
  return bundlePath.replace(`js/${bundleName}`, "");
}

function getThemesDir(): string {
  return `${getResourcesDir()}themes`;
}

function themeRelativeToAbsoluteUrl(themeId: string, url: string): string {
  const absPat = /^https?:\/\/|^\/\//i;
  if (absPat.test(url)) {
    // Already absolute, nothing to do
    return url;
  }

  // Relative image URL, build the absolute URL
  return `${getThemesDir()}/${themeId}/${url}`;
}

function getBackgroundFromManifest(theme: Theme): ThemeBackground {
  if (theme.backgroundUrl) {
    return {
      color: theme.background?.color,
      image: `url('${themeRelativeToAbsoluteUrl(
        theme.id,
        theme.backgroundUrl
      )}')`,
      size: theme.background?.size ?? "cover",
      repeat: theme.background?.size ?? "no-repeat",
    };
  }

  return theme.background ?? {};
}

function getStylesheetsFromManifest(theme: Theme): string[] {
  const stylesheets = theme.stylesheets ?? [];
  return stylesheets.map((stylesheet) =>
    themeRelativeToAbsoluteUrl(theme.id, stylesheet)
  );
}

function getLogoFromManifest(theme: Theme): string {
  return theme.logo
    ? themeRelativeToAbsoluteUrl(theme.id, theme.logo)
    : `${getResourcesDir()}/img/logo.svg`;
}

function mapManifestToTheme(manifest: Theme): Theme {
  return {
    id: manifest.id,
    name: manifest.name,
    authorUsername: manifest.authorUsername,
    authorName: manifest.authorName,
    dark: manifest.dark,
    logo: getLogoFromManifest(manifest),
    stylesheets: getStylesheetsFromManifest(manifest),
    background: getBackgroundFromManifest(manifest),
  };
}

export default function getThemeGallery(): Theme[] {
  return (galleryManifest as Theme[])?.map(mapManifestToTheme) ?? [];
}
