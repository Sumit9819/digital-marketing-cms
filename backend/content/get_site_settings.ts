import { api } from "encore.dev/api";
import { contentDB } from "./db";
import type { SiteSetting } from "./types";

interface GetSiteSettingsResponse {
  settings: Record<string, string>;
}

// Retrieves all site settings.
export const getSiteSettings = api<void, GetSiteSettingsResponse>(
  { expose: true, method: "GET", path: "/settings" },
  async () => {
    const settings = await contentDB.queryAll<SiteSetting>`
      SELECT key, value FROM site_settings
    `;

    const settingsMap: Record<string, string> = {};
    for (const setting of settings) {
      settingsMap[setting.key] = setting.value || '';
    }

    return { settings: settingsMap };
  }
);
