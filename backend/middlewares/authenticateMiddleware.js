
export const authenticateMiddleware = (req, res, next) => {
   console.log('Authenticate Middleware...');
   next();

}