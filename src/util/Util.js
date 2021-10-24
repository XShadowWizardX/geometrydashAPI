"use strict";

const BitField = require("./BitField");
const Color = require("./Color");

class Util {}

/**
 * @description Sums up all of the entries. Converts to
 * BigInt if at least one BigInt entry exists
 * @param  {...any} entries 
 * @returns {number|BigInt} The sum
 */

Util.sum = function(...entries) {
    let res = 0n;
    switch (entries.reduce((v, a) => {
        res += typeof a === "bigint"
        ? (v = true, a)
        : BigInt(a);
        return v;
    }, false)) {
        case false: return Number(res);
        default: return res;
    };
}

/**
 * @description Multiplies all of the entries. Converts to
 * BigInt if at least one BigInt entry exists, rounding
 * decimals.
 * @param  {...any} entries 
 * @returns {number|BigInt} The product
 */

Util.product = function(...entries) {
    let res = 1;
    let resBigInt = 1n;
    switch (entries.reduce((v, a) => {
        res *= typeof a === "bigint"
        ? (v = true, Number(a))
        : Number(a);
        resBigInt *= typeof a === "bigint"
        ? (v = true, a)
        : BigInt(Math.round(Number(a)));
        return v;
    }, false)) {
        case true: return resBigInt;
        default: return res;
    };
}

/**
 * @description Takes a list of entries and divides them into array groups
 * @param {number|number[]} n The number of entries per group
 * @param {...*} entries The entries to divide into groups
 * @returns {*[][]}
 */

Util.group = function(n, ...entries) { 
    if (typeof n === "number") n = [ n ];
    return entries.reduce((res, a) => {
        let row = res.data[res.dataIndex] || [];

        if (row.length >= res.nValue) {
            if (res.nIndex + 1 < n.length) {
                res.nIndex++;
                res.nValue = n[res.nIndex];
            }
            res.dataIndex++;
        }
        
        row = res.data[res.dataIndex] || [];
        res.data[res.dataIndex] = [...row, a];

        return res;
    }, {
        nIndex: 0,
        nValue: n[0],
        dataIndex: 0,
        data: []
    }).data;
}

/**
 * @description Converts milisecond timestamp into a different unit
 * @param {string|number|bigint} value string timestamp or time in miliseconds
 * @param {"MILISECONDS"|"SECONDS"|"MINUTES"|"HOURS"|"DAYS"|"WEEKS"|"MONTHS"|"YEARS"} [resUnit="MILISECONDS"] in miliseconds by default
 * @returns {number} Elasped time
 */

Util.milisecondsToUnit = function(value, resUnit="MILISECONDS") {
    value = /^-?\d{1,}$/.test(value) ? Number(value) : 0;
    switch (resUnit) {

        case "YEARS": return value / 365 / 24 / 60 / 60 / 1000;

        case "MONTHS": return value / 2.628e+9; // Formula from Google
        case "WEEKS": return value / 7 / 24 / 60 / 60 / 1000;

        case "DAYS": return value / 24 / 60 / 60 / 1000;
        case "HOURS": return value / 60 / 60 / 1000;
        case "MINUTES": return value / 60 / 1000;
        case "SECONDS": return value / 1000;
        case "MILISECONDS": return value;

        default: return value;
    }
}

/**
 * @description Encodes a each character in a string to another character
 * @param {string} str The string to encode 
 * @param {number} [key=0] The exponent to encode with
 * @returns {string}
 */

Util.xor = function(str, key=0) { 
    if (typeof str !== "string")
        throw new Error("\"str\" must be a string");    
    return str.split("").map(c => {
        c = c.charCodeAt();
        return String.fromCodePoint(c ^ key);
    }).join("");
}

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
        if (v === null) continue;
        
        if (v instanceof Color)
            res[k] = v.rgb.join(",");
        else if (v instanceof BitField)
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
