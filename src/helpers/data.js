import {INTERVAL_MINUTES} from "../config/const";

/**
 * To save the api data to cache to reuse in case of failure
 *
 * @param name
 * @param data
 */
const storeData = (name, data) => {
    // Any successful run will store the data to local storage so
    // that it can be retrieved in subsequent failures.
    localStorage.setItem(name, JSON.stringify(data));
    const d = new Date();
    d.setMinutes(d.getMinutes() + INTERVAL_MINUTES)
    localStorage.setItem(name + '_ttl', d);
}

/**
 * To load the data saved using storeData
 *
 * @param name
 * @param numItems
 * @return string|false
 */
const loadData = (name, numItems) => {
    let data = localStorage.getItem(name)

    if (data) {
        data = JSON.parse(data);
        data = data.length === numItems ? data : false;
    }

    return data;
}

/**
 * To check if ne data can be loaded
 *
 * The TTL of the data is stored in the storeData function
 * The
 * @param name
 * @return {boolean}
 */
const canLoadData = name => {
    let ttl = localStorage.getItem(name + '_ttl');

    if (ttl) {
        return Date.parse(ttl) < new Date;
    }

    return true;
}

export {
    storeData,
    loadData,
    canLoadData
}
