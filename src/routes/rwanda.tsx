import { createFileRoute, redirect } from "@tanstack/react-router";

/** Old link (on shared maps and WhatsApp): Rwanda now lives under Bee Maps with a country picker. */
export const Route = createFileRoute("/rwanda")({
  beforeLoad: () => {
    throw redirect({ to: "/forage-maps", search: { country: "rwanda" }, replace: true });
  },
});
