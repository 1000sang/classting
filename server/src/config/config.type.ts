import { HttpConfig } from './http.config';
import {DatabaseConfig} from "./database.config";

export interface ConfigType {
  readonly http?: HttpConfig;
  readonly db?: DatabaseConfig;
}
