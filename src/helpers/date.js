/**
 * To pad date values with a zero
 *
 * @param value
 * @return {string}
 */
const zeroPad = value => {
    if (value < 10) {
        value = '0' + value;
    }

    return value;
}

/**
 * To get the last month in ISO8601 format
 *
 * @return {string}
 */
const getLastMonth = () => {
    var d = new Date();
    d.setMonth(d.getMonth() - 1);
    return  d.getFullYear() + '-' + zeroPad(d.getMonth()) + '-' + zeroPad(d.getDay());
}

/**
 * To get the last year in ISO8601 format
 * @return {string}
 */
const getLastYear = () => {
    var d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return  d.getFullYear() + '-' + zeroPad(d.getMonth()) + '-' + zeroPad(d.getDay());
}

export {
    getLastMonth,
    getLastYear
}
