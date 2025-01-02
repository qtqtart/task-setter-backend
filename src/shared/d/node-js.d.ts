import { Env } from "@shared/types/evn.types";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
