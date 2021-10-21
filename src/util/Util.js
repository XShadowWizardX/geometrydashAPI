"use strict";

const BitField = require("./BitField");

class Util {}

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
