import "express";

import { Account } from "@prisma/client";

declare module "express" {
  interface Request {
    account?: Account;
  }
}
