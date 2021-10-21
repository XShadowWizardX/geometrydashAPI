"use strict";

const Util = require("./Util");
const {
    util: {
        regex: {
            valid: REGEX_VALID
        }
    }
} = require("./Constants");

/**
 * @typedef {Object} DIFFICULTY_OPTIONS
 * @property {number} numerator (OPTIONAL) The numerator to make the ratio
 * @property {number} denominator (OPTIONAL) The denominator to make the ratio
 * @property {number} ratio The ratio of the numerator over the denominator
 * @property {number} isDemon Whether the difficulty is set to demon
 * @property {number} isAuto Whether the difficulty is set to auto
 */

class Difficulty {

    /**
     * @constructor
     * @param {DIFFICULTY_OPTIONS} data 
     */

    constructor(data) {
        this.build();
        this.parse(data);
    }

    build() {

        /**
         * @description The ratio of the numerator over the denominator
         * @type {RATIO}
         */

        this.ratio = 0;

        /**
         * @description Whether the difficulty is set to demon
         * @type {boolean}
         */

        this.isDemon = false;

        /**
         * @description Whether the difficulty is set to auto
         * @type {boolean}
         */

        this.isAuto = false;

        /**
         * @description The demon difficulty of the level
         * * `0` - Hard Demon
         * * `3` - Easy Demon
         * * `4` - Medium Demon
         * * `5` - Insane Demon
         * * `6` - Extreme Demon
         * @default 0
         * @type {number}
         */

        this.demonType = "demonType" in data ? data.demonType : 0;

    }

    /**
     * @returns {boolean} Whether the level has "isAuto" enabled
     */

    get isRatedAuto() { return this.isAuto; }

     /**
      * @returns {boolean} Whether the level has "isDemon" enabled
      */
 
    get isRatedDemon() { return this.isDemon; }
 
     /**
      * @returns {boolean} Whether the level is rated auto or demon
      */
 
    get hasRatingSpecial() { return this.isRatedAuto || this.isRatedDemon; }

    /**
     * @returns {boolean} Whether the level has a specific rating
     */

    get hasRatingDefined() {
        return this.hasRatingSpecial
        || this.isRatedEasy
        || this.isRatedNormal
        || this.isRatedHard
        || this.isRatedHarder
        || this.isRatedInsane;
    }

    /**
     * @returns {boolean} Whether the level is rated "easy"
     */

    get isRatedEasy() { return !this.hasRatingSpecial && this.ratio === 1; }

    /**
     * @returns {boolean} Whether the level is rated "normal"
     */

    get isRatedNormal() { return !this.hasRatingSpecial && this.ratio === 2; }

    /**
     * @returns {boolean} Whether the level is rated "hard"
     */

    get isRatedHard() { return !this.hasRatingSpecial && this.ratio === 3; }

    /**
     * @returns {boolean} Whether the level is rated "harder"
     */

    get isRatedHarder() { return !this.hasRatingSpecial && this.ratio === 4; }

    /**
     * @returns {boolean} Whether the level is rated "insane"
     */

    get isRatedInsane() { return !this.hasRatingSpecial && this.ratio === 5; }

    /**
     * @returns {boolean} Whether the level is rated "easy demon"
     */
    
    get isRatedDemonEasy() { return this.isRatedDemon && this.demonType === 3; }

    /**
     * @returns {boolean} Whether the level is rated "medium demon"
     */
    
    get isRatedDemonMedium() { return this.isRatedDemon && this.demonType === 4; }

    /**
     * @returns {boolean} Whether the level is rated "hard demon"
     */
    
    get isRatedDemonHard() { return this.isRatedDemon && this.demonType === 0; }

    /**
     * @returns {boolean} Whether the level is rated "insane demon"
     */
    
    get isRatedDemonInsane() { return this.isRatedDemon && this.demonType === 5; }

    /**
     * @returns {boolean} Whether the level is rated "extreme demon"
     */
    
    get isRatedDemonExtreme() { return this.isRatedDemon && this.demonType === 6; }

    /**
     * @returns {boolean} Whether the level has no specific rating / unrated
     */

    get isUnrated() { return !this.hasRatingDefined; }

    /**
     * @param {DIFFICULTY_OPTIONS} data 
     */

    parse(data={}) {
        if (Util.isObjectNormal(data)) {
            this.parseRatioFraction(data.numerator, data.denominator);
            Object.entries(data).forEach(([k, v]) => {
                if (/^ratio$/i.test(k)) this.ratio = Math.round(Number(v));
                if (/^isDemon$/i.test(k)) this.isDemon = REGEX_VALID.test(v);
                if (/^isAuto$/i.test(k)) this.isAuto = REGEX_VALID.test(v);
            });
        }
        return this;
    }

    parseRatioFraction(numerator, denominator=10) {
        if (typeof numerator === "number") {
            this.ratio = Math.round(numerator/denominator);
        }
        return this;
    }

}

module.exports = Difficulty;
