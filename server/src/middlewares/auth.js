// middlewares/auth.js
import { expressjwt } from "express-jwt";
import jwks from "jwks-rsa";
import { config } from "../config.js";

export const requiresAuth = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`,
  }),
  audience: config.authOptions.audience,
  issuer: `https://YOUR_AUTH0_DOMAIN/`,
  algorithms: ["RS256"],
});
