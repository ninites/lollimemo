const logTest = async (req,res,next) => {
    console.log("relou les routes la");
    next()
}

module.exports = logTest