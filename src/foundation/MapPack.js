"use strict";

const Base = require("./BaseIndexes");
const Util = require("../util/Util");

const Difficulty = require("../util/Difficulty");
const Color = require("../util/Color");

const {
    util: {
        stats: {
            regex: {
                stars: STARS_REGEX,
                diamonds: DIAMONDS_REGEX,
                scoins: SCOINS_REGEX,
                ucoins: UCOINS_REGEX,
                demons: DEMONS_REGEX,
                cp: CP_REGEX
            }
        }
    },
    levels: {
        regex: {
            name: LEVEL_NAME_REGEX
        }
    }
} = require("../util/Constants");

const properties = require("../properties/levels/MapPack");
const {
    PACK_ID,
    NAME,
    LEVELS,
    STARS,
    SCOINS,
    DIFFICULTY_FACE,
    NAME_COLOR,
    PROGRESS_COLOR
} = properties;

/**
 * @description MapPacks
 * @extends {Base}
 */

class MapPack extends Base {

    build() {

        this._indexes = {
            [PACK_ID]: 0n,
            [NAME]: null,
            [LEVELS]: [],
            [STARS]: 0,
            [SCOINS]: 0,
            [DIFFICULTY_FACE]: 0,
            [NAME_COLOR]: new Color(16777215, 16777215),
            [PROGRESS_COLOR]: new Color(16777215, 16777215),
        };

        return this;

    }

    /**
     * @description The identification number of the pack
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get packID() { return this._indexes[PACK_ID]; }
    set packID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[PACK_ID] = BigInt(value);
        }
    }

    /**
     * @description The name of the pack
     * @type {?string}
     * @defaultvalue null
     * @param {?string} value
     */

    get name() { return this._indexes[NAME]; }
    set name(value) {
        if (value == null || LEVEL_NAME_REGEX.test(value)) {
            this._indexes[NAME] = value == null ? null : `${value}`;
        }
    }

    /**
     * @description The levels in the pack
     * @type {BigInt[]}
     * @defaultvalue 0
     * @param {(number|string|BigInt)[]} value
     */

    get levels() { return this._indexes[LEVELS]; }
    set levels(value) {
        if (Array.isArray(value) && value.every(a => ["string", "number", "bigint"].includes(typeof a) && /^\d{1,}$/.test(a))) {
            this._indexes[LEVELS] = value.reduce((res, a) => {
                res.push(BigInt(a));
                return res;
            }, []);
        } else if (typeof value === "string")
            this.levels = value.split(/, ?/g);
        else if (!Array.isArray(value))
            this.levels = [ value ];
    }

    /**
     * @description The amount of stars awarded for completion
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get stars() { return this._indexes[STARS]; }
    set stars(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[STARS] = Number(value);
        }
    }

    /**
     * @description The amount of secret coins awarded for completion
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get scoins() { return this._indexes[SCOINS]; }
    set scoins(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[SCOINS] = Number(value);
        }
    }

    /**
     * @description The difficulty as a "Difficulty" class instance
     * @type {Difficulty}
     * @param {Difficulty} value
     */

    get difficulty() {
        let diff = new Difficulty();
        switch (this.difficultyFace) {
            case 0:
                diff.isRatedAuto = true;
                break;
            case 1:
                diff.isRatedEasy = true;
                break;
            case 2:
                diff.isRatedNormal = true;
                break;
            case 3:
                diff.isRatedHard = true;
                break;
            case 4:
                diff.isRatedHarder = true;
                break;
            case 5:
                diff.isRatedInsane = true;
                break;
            case 6:
                diff.isRatedDemonHard = true;
                break;
            case 7:
                diff.isRatedDemonEasy = true;
                break;
            case 8:
                diff.isRatedDemonMedium = true;
                break;
            case 9:
                diff.isRatedDemonInsane = true;
                break;
            case 10:
                diff.isRatedDemonExtreme = true;
                break;
        }
        return diff;
    }

    set difficulty(value) {
        if (value instanceof Difficulty) {
            this.difficultyFace = value.isRatedAuto ? 0
            : value.isRatedDemon
                ? value.isRatedDemonExtreme ? 10
                : value.isRatedDemonInsane ? 9
                : value.isRatedDemonMedium ? 8
                : value.isRatedDemonEasy ? 7
                : 6
            : value.isRatedInsane ? 5
            : value.isRatedHarder ? 4
            : value.isRatedHard ? 3
            : value.isRatedNormal ? 2
            : value.isRatedEasy ? 1
            : 0;
        }
    }

    /**
     * @description The numeric representation of the difficulty
     * * `0` - Auto
     * * `1` - Easy
     * * `2` - Normal
     * * `3` - Hard
     * * `4` - Harder
     * * `5` - Insane
     * * `6` - Hard Demon
     * * `7` - Easy Demon
     * * `8` - Medium Demon
     * * `9` - Insane Demon
     * * `10` - Extreme Demon
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get difficultyFace() { return this._indexes[DIFFICULTY_FACE]; }
    set difficultyFace(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[DIFFICULTY_FACE] = Number(value);
        }
    }

    /**
     * @description The color object for the pack's name
     * @type {Color}
     * @defaultvalue 0
     * @param {Color} value
     */

    get nameColor() { return this._indexes[NAME_COLOR]; }
    set nameColor(value) {
        this._indexes[NAME_COLOR] = value instanceof Color
        ? value
        : new Color(value, 16777215);
    }

    /**
     * @description The color object for the pack's progress bar
     * @type {Color}
     * @defaultvalue 0
     * @param {Color} value
     */

    get progressColor() { return this._indexes[PROGRESS_COLOR]; }
    set progressColor(value) {
        this._indexes[PROGRESS_COLOR] = value instanceof Color
        ? value
        : new Color(value, 16777215);
    }

    /**
     * @typedef {Base.parse}
     */

    parse(data) {

        if (data instanceof MapPack || !Util.isObjectNormal(data)) {
            super.parse(data);
        } else {
            Object.entries(data).forEach(([k, v]) => {

                if (/^(1|(pack)?ID)$/i.test(k)) this.packID = v;
                if (/^(2|name)$/i.test(k)) this.name = v;
                if (/^(3|levels?|levelID)$/i.test(k)) this.levels = v;
                if (k == "4" || STARS_REGEX.test(k)) this.stars = v;
                if (k == "5" || SCOINS_REGEX.test(k)) this.scoins = v;
                if (/^(6|difficultyFace)$/i.test(k)) this.difficultyFace = v;
                if (/^(7|nameColor)$/i.test(k)) this.nameColor = v;
                if (/^(8|progressColor)$/i.test(k)) this.progressColor = v;

                if (/^(difficulty)$/i.test(k)) this.difficulty = v;

            });
        }

        return this;

    }

}

MapPack.PROPERTIES = properties;

module.exports = MapPack;