// src/routeTree.ts
// import { RouteTree } from "@tanstack/router";
// import { rootRoute } from "./routes/root";

// export const routeTree = new RouteTree({
//   route: rootRoute,
// });

import { routeTree } from './routeTree.gen';
import type { LocationState } from "./types"

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof routeTree;
    routeStates: {
      "/": LocationState
    }
  }
}
