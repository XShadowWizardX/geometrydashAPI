"use strict";

const BitField = require("./BitField");

class Util {}

/**
 * @param {*} data 
 * @returns {boolean} Whether the entered data is a normal object
 */

Util.isObjectNormal = function(data) {
    return Object.prototype.toString.call(data) === "[object Object]";
}

/**
 * @description Creates and returns an object with converted properties that
 * are in their simplest form for a JSON object; inspired by Discord.js
 * * `"BigInt"` -> `"string"`
 * * `"BitField"` -> `value`
 * @param {Object} obj
 * @returns {Object}
 */

Util.flatten = function(obj) {
    if (!Util.isObjectNormal(obj)) return obj;
    const res = {};

    for(let [k, v] of Object.entries(obj)) {
        if (!v) continue;
        
        if (v instanceof BitField)
            res[k] = v.value;
        else if (typeof v === "bigint")
            res[k] = `${v}`;
        else if (v instanceof Map)
            res[k] = [...v.entries()].map(a => Util.flatten(a));
        else if (Array.isArray(v))
            res[k] = v.map(a => Util.flatten(a));
        else if (Util.isObjectNormal(v))
            res[k] = Object.entries(v).map((aK, aV) => [aK, Util.flatten(aV)]);
        else if (typeof v !== "object")
            res[k] = v;
    }

    return res;
}

module.exports = Util;