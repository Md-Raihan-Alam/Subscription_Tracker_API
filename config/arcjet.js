import arcjet, { shield, detectBot, tokenBucket } from "arcjet";
import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
  key: ARCJET_KEY,

  // REQUIRED
  client: {
    name: "subscription-tracker-api", // any identifier for your app
  },

  // REQUIRED
  log: {
    level: "info",
  },

  characteristics: ["ip.src"],

  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
