exports.isEmpty = (text) => {
    if(!text || text === "" || text === '' || text === undefined || text === null || text.length < 0) {
        return false;
    } else {
        return true;
    }
}