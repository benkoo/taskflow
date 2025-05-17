// Re-export the BeforeInstallPromptEvent from global.d.ts
export type { BeforeInstallPromptEvent } from './global';

// PWA related types and interfaces
export interface PWAAsset {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
}

export interface WebAppManifest {
  name: string;
  short_name: string;
  description?: string;
  start_url: string;
  scope?: string;
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  background_color?: string;
  theme_color?: string;
  orientation?: 'any' | 'natural' | 'landscape' | 'portrait';
  icons: PWAAsset[];
  screenshots?: Array<{
    src: string;
    sizes: string;
    type: string;
    form_factor?: string;
    label?: string;
  }>;
  shortcuts?: Array<{
    name: string;
    short_name?: string;
    description?: string;
    url: string;
    icons?: PWAAsset[];
  }>;
  categories?: string[];
  dir?: 'ltr' | 'rtl' | 'auto';
  lang?: string;
  prefer_related_applications?: boolean;
  related_applications?: Array<{
    platform: string;
    url?: string;
    id?: string;
  }>;
  protocol_handlers?: Array<{
    protocol: string;
    url: string;
  }>;
  file_handlers?: Array<{
    action: string;
    accept: Record<string, string[]>;
    name?: string;
    icons?: PWAAsset[];
    launch_type?: 'single-client' | 'multiple-clients';
  }>;
  share_target?: {
    action: string;
    method?: 'GET' | 'POST';
    enctype?: string;
    params?: {
      title?: string;
      text?: string;
      url?: string;
      files?: Array<{
        name: string;
        accept: string[];
      }>;
    };
  };
  handle_links?: 'auto' | 'preferred' | 'not-preferred';
  launch_handler?: {
    client_mode: 'auto' | 'focus-existing' | 'navigate-new' | 'navigate-existing';
  };
  edge_side_panel?: {
    preferred_width?: number;
  };
  file_browser_handlers?: Array<{
    action: string;
    accept: Record<string, string[]>;
  }>;
  new_note_url?: string;
  widgets?: Array<{
    name: string;
    multiple?: boolean;
    multiple_description?: string;
    multiple_min?: number;
    multiple_max?: number;
    multiple_default?: number;
    multiple_step?: number;
    multiple_unit?: string;
    multiple_unit_plural?: string;
    multiple_unit_abbr?: string;
    multiple_unit_abbr_plural?: string;
    multiple_unit_position?: 'before' | 'after';
    multiple_unit_space?: boolean;
    multiple_unit_show_count?: boolean;
    multiple_unit_show_abbr?: boolean;
    multiple_unit_show_plural?: boolean;
    multiple_unit_show_abbr_plural?: boolean;
    multiple_unit_show_position?: boolean;
    multiple_unit_show_space?: boolean;
    multiple_unit_show_count_plural?: boolean;
    multiple_unit_show_abbr_plural_plural?: boolean;
    multiple_unit_show_position_plural?: boolean;
    multiple_unit_show_space_plural?: boolean;
    multiple_unit_show_count_abbr?: boolean;
    multiple_unit_show_abbr_abbr?: boolean;
    multiple_unit_show_position_abbr?: boolean;
    multiple_unit_show_space_abbr?: boolean;
    multiple_unit_show_count_abbr_plural?: boolean;
    multiple_unit_show_abbr_abbr_plural?: boolean;
    multiple_unit_show_position_abbr_plural?: boolean;
    multiple_unit_show_space_abbr_plural?: boolean;
    multiple_unit_show_count_abbr_abbr?: boolean;
    multiple_unit_show_abbr_abbr_abbr?: boolean;
    multiple_unit_show_position_abbr_abbr?: boolean;
    multiple_unit_show_space_abbr_abbr?: boolean;
    multiple_unit_show_count_abbr_abbr_plural?: boolean;
    multiple_unit_show_abbr_abbr_abbr_plural?: boolean;
    multiple_unit_show_position_abbr_abbr_plural?: boolean;
    multiple_unit_show_space_abbr_abbr_plural?: boolean;
  }>;
}
