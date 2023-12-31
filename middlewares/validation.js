const validationMiddleware = (schema) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(401).json({ message: error.details[0].message })
            }

            return next();
        } catch (err) {
            return res.status(401).json({ message: "data did not pass validation."});
        }
    };
};

export default validationMiddleware;