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
         * * `-1` - Auto
         * * `0` - NA
         * * `1` - Easy / Easy Demon
         * * `2` - Normal / Medium Demon
         * * `3` - Hard / Hard Demon
         * * `4` - Harder / Insane Demon
         * * `5` - Insane / Extreme Demon
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
     * @type {boolean} Whether the level has "isAuto" enabled
     */

    get isRatedAuto() { return this.isAuto; }
    set isRatedAuto(value) {
        if (value) {
            this.build();
            this.ratio = -1;
            this.isAuto = true;
        }
    }
     /**
      * @type {boolean} Whether the level has "isDemon" enabled
      */
 
    get isRatedDemon() { return this.isDemon; }
    set isRatedDemon(value) {
        if (value) {
            this.build();
            this.ratio = 3;
            this.isDemon = true;
            this.demonType = 0;
        }
    }
     /**
      * @type {boolean} Whether the level is rated auto or demon
      */
 
    get hasRatingSpecial() { return this.isRatedAuto || this.isRatedDemon; }

    /**
     * @type {boolean} Whether the level has a specific rating
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
     * @type {boolean} Whether the level is rated "easy"
     * @param {boolean} value Whether to set to this difficulty
     */

    get isRatedEasy() { return !this.hasRatingSpecial && this.ratio === 1; }
    set isRatedEasy(value) {
        if (value) {
            this.build();
            this.ratio = 1;
        }
    }

    /**
     * @type {boolean} Whether the level is rated "normal"
     * @param {boolean} value Whether to set to this difficulty
     */

    get isRatedNormal() { return !this.hasRatingSpecial && this.ratio === 2; }
    set isRatedNormal(value) {
        if (value) {
            this.build();
            this.ratio = 2;
        }
    }

    /**
     * @type {boolean} Whether the level is rated "hard"
     * @param {boolean} value Whether to set to this difficulty
     */

    get isRatedHard() { return !this.hasRatingSpecial && this.ratio === 3; }
    set isRatedHard(value) {
        if (value) {
            this.build();
            this.ratio = 3;
        }
    }

    /**
     * @type {boolean} Whether the level is rated "harder"
     * @param {boolean} value Whether to set to this difficulty
     */

    get isRatedHarder() { return !this.hasRatingSpecial && this.ratio === 4; }
    set isRatedHarder(value) {
        if (value) {
            this.build();
            this.ratio = 4;
        }
    }

    /**
     * @type {boolean} Whether the level is rated "insane"
     * @param {boolean} value Whether to set to this difficulty
     */

    get isRatedInsane() { return !this.hasRatingSpecial && this.ratio === 5; }
    set isRatedInsane(value) {
        if (value) {
            this.build();
            this.ratio = 5;
        }
    }

    /**
     * @type {boolean} Whether the level is rated "easy demon"
     * @param {boolean} value Whether to set to this difficulty
     */
    
    get isRatedDemonEasy() { return this.isRatedDemon && this.demonType === 3; }
    set isRatedDemonEasy(value) {
        if (value) {
            this.build();
            this.ratio = 1;
            this.isDemon = true;
            this.demonType = 3;
        }
    }

    /**
     * @type {boolean} Whether the level is rated "medium demon"
     * @param {boolean} value Whether to set to this difficulty
     */
    
    get isRatedDemonMedium() { return this.isRatedDemon && this.demonType === 4; }
    set isRatedDemonMedium(value) {
        if (value) {
            this.build();
            this.ratio = 2;
            this.isDemon = true;
            this.demonType = 4;
        }
    }
    /**
     * @type {boolean} Whether the level is rated "hard demon"
     * @param {boolean} value Whether to set to this difficulty
     */
    
    get isRatedDemonHard() { return this.isRatedDemon && this.demonType === 0; }
    set isRatedDemonHard(value) {
        if (value) {
            this.build();
            this.ratio = 3;
            this.isDemon = true;
            this.demonType = 0;
        }
    }
    /**
     * @type {boolean} Whether the level is rated "insane demon"
     * @param {boolean} value Whether to set to this difficulty
     */
    
    get isRatedDemonInsane() { return this.isRatedDemon && this.demonType === 5; }
    set isRatedDemonInsane(value) {
        if (value) {
            this.build();
            this.ratio = 4;
            this.isDemon = true;
            this.demonType = 5;
        }
    }
    /**
     * @type {boolean} Whether the level is rated "extreme demon"
     * @param {boolean} value Whether to set to this difficulty
     */
    
    get isRatedDemonExtreme() { return this.isRatedDemon && this.demonType === 6; }
    set isRatedDemonExtreme(value) {
        if (value) {
            this.build();
            this.ratio = 5;
            this.isDemon = true;
            this.demonType = 6;
        }
    }
    /**
     * @type {boolean} Whether the level has no specific rating / unrated
     * @param {boolean} value Whether to set to this difficulty
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
