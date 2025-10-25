const handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02" || err.code === "42883") {
        res.status(400).send({ message: "Invalid input" });
    } else if (err.code === "23503") {
        res.status(400).send({ message: "Reference does not exist" });
    } 
    else if(err.code === "23502") {
        res.status(400).send({message: "Missing required fields"})
    } else next(err);
}

const handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ message: err.message });
    } else next(err);
}

const handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ message: "Internal Server Error" });
}

module.exports = { handlePsqlErrors, handleCustomErrors, handleServerErrors }

