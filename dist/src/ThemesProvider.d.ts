import { List } from "immutable";
import * as React from "react";
import { Theme } from "./types/Theme";
export interface ThemesProviderProps {
    themes: List<Theme>;
}
export declare const ThemesProvider: React.ComponentClass<ThemesProviderProps, any>;
