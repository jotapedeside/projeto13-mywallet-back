import { valueSchema } from "../schema.js";
import sanitize from "../sanitize.js";

const validateTransaction = async (req, res, next) => {
  const transactionValidation = valueSchema.validate(req.body, { abortEarly: false });

  try {
    if (transactionValidation.error) {
      const erros = transactionValidation.error.details.map((error) => error.message);
      return res.status(422).json({ status: 422, message: erros });
    }

    const transaction = {
      value: sanitize(req.body.value),
      description: sanitize(req.body.description),
      type: sanitize(req.body.type)
    };

    if (typeof transaction.value !== "number") {
      transaction.value = Number(transaction.value);
    }

    res.locals.transaction = transaction;
    next();

  } catch (error) {
    res.status(500);
  }
}

export { validateTransaction };