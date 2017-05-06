export const errorHandler = (err, req, res) => {
  console.error('Error', err);
  res.json(err);
}
