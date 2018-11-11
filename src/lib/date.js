const date = {};

date.timestamp = function() {
    return Date.parse(new Date()) / 1000;
};

date.timestampToDate = function(timestamp) {
    return new Date(timestamp * 1000);
};

date.timestampToLocaleString = function(timestamp) {
    return this.timestampToDate(timestamp).toLocaleString();
};

date.timestampToNsDate = function(timestamp) {
    let date = NSDate.dateWithTimeIntervalSince1970(timestamp);
    return date;
};

date.nsDateToTimestamp = function(nsDate) {
    return parseInt(nsDate.timeIntervalSince1970());
};

module.exports = date;