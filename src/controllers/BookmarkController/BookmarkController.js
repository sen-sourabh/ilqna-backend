const bookmarkServices = require("../../services/BookmarkServices");

exports.addBookmark = async (req, res, next) => {
    const result = await bookmarkServices.addBookmark(req.body);
    res.send(result);
};

exports.updateBookmark = async (req, res, next) => {
    const result = await bookmarkServices.updateBookmark(req.body);
    res.send(result);
}

exports.getAllBookmarkQuestions = async (req, res, next) => {
    const result = await bookmarkServices.getAllBookmarkQuestions(req.body);
    res.send(result);
}