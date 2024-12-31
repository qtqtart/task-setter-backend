import { Env } from "@shared/types/evn.types";

type _Env = {
  [K in keyof Env]: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends _Env {}
  }
}
