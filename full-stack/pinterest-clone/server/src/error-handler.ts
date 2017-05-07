export const errorHandler = (err, req, res, next) => {
    console.log('Error', err);
  if (err) {
    return res.json(err);
  }
  next();
}
