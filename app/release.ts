/** Single source of truth for homepage / SEO release metadata. Bump VERSION for each GitHub Release. */
export const VERSION = "1.3.5";
export const GITHUB_REPO = "https://github.com/Wholiver/metis";
export const GITHUB_RELEASES = `${GITHUB_REPO}/releases`;
export const NPM_PACKAGE_URL = "https://www.npmjs.com/package/@wholiver_hu/metis";

export function releaseAssetUrl(filename: string): string {
  return `${GITHUB_RELEASES}/download/v${VERSION}/${filename}`;
}

export type DownloadOption = {
  id: string;
  platform: string;
  arch: string;
  file: string;
  url: string;
  badge: string;
};

/** Desktop installers that actually exist on the latest GitHub Release. */
export const downloadOptions: DownloadOption[] = [
  {
    id: "mac-arm64",
    platform: "macOS",
    arch: "Apple Silicon (M1/M2/M3/M4)",
    file: `Metis-${VERSION}-macos-arm64.dmg`,
    url: releaseAssetUrl(`Metis-${VERSION}-macos-arm64.dmg`),
    badge: "arm64",
  },
  {
    id: "windows-x64-setup",
    platform: "Windows",
    arch: "64-bit Installer",
    file: `Metis-${VERSION}-win-x64-setup.exe`,
    url: releaseAssetUrl(`Metis-${VERSION}-win-x64-setup.exe`),
    badge: "exe",
  },
  {
    id: "windows-x64-zip",
    platform: "Windows",
    arch: "64-bit Portable (zip)",
    file: `Metis-${VERSION}-win-x64.zip`,
    url: releaseAssetUrl(`Metis-${VERSION}-win-x64.zip`),
    badge: "zip",
  },
];

export const macArm64Download = downloadOptions[0];
export const windowsSetupDownload = downloadOptions[1];
