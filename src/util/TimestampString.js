"use strict";

const Util = require("./Util");

/**
 * @typedef {"MILISECONDS"
 * |"SECONDS"
 * |"MINUTES"
 * |"HOURS"
 * |"DAYS"
 * |"WEEKS"
 * |"MONTHS"
 * |"YEARS"
 * } CONVERSION_OPTIONS
 */

/**
 * @description A class for handling GD's elasped time timestamp strings
 */

class TimestampString extends String {

    /**
     * @param {CONVERSION_OPTIONS} unit 
     * @returns {number}
     */

    toNumber(unit="MILISECONDS") { return TimestampString.toNumber(`${this}`, unit); }

    /**
     * @description Approximate elasped time in miliseconds
     * @type {number}
     */

    get miliseconds() { return this.toNumber("MILISECONDS"); }

    /**
     * @description Approximate elasped time in seconds
     * @type {number}
     */

    get seconds() { return this.toNumber("SECONDS"); }

    /**
     * @description Approximate elasped time in minutes
     * @type {number}
     */

    get minutes() { return this.toNumber("MINUTES"); }

    /**
     * @description Approximate elasped time in hours
     * @type {number}
     */

    get hours() { return this.toNumber("HOURS"); }

    /**
     * @description Approximate elasped time in days
     * @type {number}
     */

    get days() { return this.toNumber("DAYS"); }

    /**
     * @description Approximate elasped time in weeks
     * @type {number}
     */

    get weeks() { return this.toNumber("WEEKS"); }

    /**
     * @description Approximate elasped time in months
     * @type {number}
     */

    get months() { return this.toNumber("MONTHS"); }

    /**
     * @description Approximate elasped time in years
     * @type {number}
     */

    get years() { return this.toNumber("YEARS"); }

}

const REGEX_YEARS = /^\d{1,} ?(years?|yrs?)$/i;
const REGEX_MONTHS = /^\d{1,} ?(months?|mths?)$/i;
const REGEX_WEEKS = /^\d{1,} ?(weeks?|wks?)$/i;
const REGEX_DAYS = /^\d{1,} ?days?$/i;
const REGEX_HOURS = /^\d{1,} ?(hours?|hrs?|h)$/i;
const REGEX_MINUTES = /^\d{1,} ?(minutes?|mins?|m)$/i;
const REGEX_SECONDS = /^\d{1,} ?(seconds?|s)$/i;
const REGEX_MILISECONDS = /^\d{1,} ?(miliseconds?|ms)$/i;

/**
 * @description REGEXES for years
 */

TimestampString.REGEX = {
    years: REGEX_YEARS,
    months: REGEX_MONTHS,
    weeks: REGEX_WEEKS,
    days: REGEX_DAYS,
    hours: REGEX_HOURS,
    minutes: REGEX_MINUTES,
    seconds: REGEX_SECONDS,
    miliseconds: REGEX_MILISECONDS
};

/**
 * @description Converts a GD string timestamp ("# days") into a number
 * representing the elasped time in the selected unit
 * @param {string} Elasped time
 * @param {CONVERSION_OPTIONS} [resUnit="MILISECONDS"] in miliseconds by default
 * @returns {number} Elasped time
 */

TimestampString.toNumber = function(str, resUnit="MILISECONDS") {
    let res = 0;
    if (typeof str === "string") {
        if (REGEX_YEARS.test(str))
            res += (Number(str.match(/\d{1,}/)[0]) || 0) * 365 * 24 * 60 * 60 * 1000;
        if (REGEX_MONTHS.test(str))
            res = (Number(str.match(/\d{1,}/)[0]) || 0) * 2.628e+9; // Formula from Google
        if (REGEX_WEEKS.test(str))
            res = (Number(str.match(/\d{1,}/)[0]) || 0) * 7 * 24 * 60 * 60 * 1000;
        if (REGEX_DAYS.test(str))
            res += (Number(str.match(/\d{1,}/)[0]) || 0) * 24 * 60 * 60 * 1000;
        if (REGEX_HOURS.test(str))
            res += (Number(str.match(/\d{1,}/)[0]) || 0) * 60 * 60 * 1000;
        if (REGEX_MINUTES.test(str))
            res += (Number(str.match(/\d{1,}/)[0]) || 0) * 60 * 1000;
        if (REGEX_SECONDS.test(str))
            res += (Number(str.match(/\d{1,}/)[0]) || 0) * 1000;
        if (REGEX_MILISECONDS.test(str))
            res += (Number(str.match(/\d{1,}/)[0]) || 0);
    }
    return Util.milisecondsToUnit(res, resUnit);
}

module.exports = TimestampString;
