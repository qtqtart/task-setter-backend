import { SessionMetadata } from "@modules/session/types/session-metadata.types";

import "express-session";

declare module "express-session" {
  interface Session {
    userId?: string;
    metadata: SessionMetadata;
  }
}
