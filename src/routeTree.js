// src/routeTree.ts
import { RouteTree } from "@tanstack/router";
import { rootRoute } from "./routes/root";

export const routeTree = new RouteTree({
  route: rootRoute,
});
