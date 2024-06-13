//validateProduct.js
const validateProduct = (req, res, next) => {
  const { id, title, desc, price } = req.body;
  if (!id || !title || !desc || !price) {
      return res.status(400).json({ error: 'Alla egenskaper (id, title, desc, price) måste skickas med.' });
  }
  next();
}

export default validateProduct