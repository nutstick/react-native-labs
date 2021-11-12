import type { YargArguments as MetroYargArguments } from "metro-config";

export interface YargArguments extends MetroYargArguments {
  entryFile: string;
  html?: string;
}
