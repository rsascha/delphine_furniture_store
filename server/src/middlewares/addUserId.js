/**
 * Express middleware to add `userId` to the request object.
 *
 * @example
 * app.get("/", addUserId, (req, res) => {
 *   console.debug(req.userId);
 *   // ...
 * });
 *
 * @param {Object} req - The request object.
 * @param {Object} _ - The response object (unused).
 * @param {Function} next - The next middleware function.
 */
export async function addUserId(req, _, next) {
  if (req.auth) {
    req.userId = req.auth.payload.sub;
  } else {
    console.warn("No auth object found on request object. Cannot add userId.");
    req.userId = undefined;
  }
  next();
}
