"use strict";

const Base = require("../Base");

/**
 * @description Gets a user's GD Profile
 * @extends {Base}
 */

class getGJUserInfo20Endpoint extends Base {

    /**
     * @inheritdoc
     */

    get _path() { return __filename.substr(Base.PATH_BASE.length).replace(/\..{1,}$/, ".php"); }


    /**
     * @description The accountID of the user whose information
     * is to be returned
     * @param {?BigInt|number|string} value
     * @type {?BigInt}
     */

    get targetAccountID() { return this.get("targetAccountID"); }
    set targetAccountID(value) {
        if (value === undefined)
            this.delete("targetAccountID");
        else
            this.set("targetAccountID", value && /^-?\d{1,}$/.test(value) ? BigInt(value) : null);
    }

    /**
     * @description The accountID of the user that's searching (use alongside gjp and used to check
     * whether the loader is blocked by the looked up user)
     * @param {?BigInt|number|string} value
     * @type {?BigInt}
     */

    get accountID() { return this.get("accountID"); }
    set accountID(value) {
        if (value === undefined)
            this.delete("accountID");
        else
            this.set("accountID", value && /^-?\d{1,}$/.test(value) ? BigInt(value) : null);
    }

    /**
     * @description The loader's account password
     * @param {?BigInt|number|string} value
     * @type {?Number}
     */

    get gjp() { return this.get("gjp"); }
    set gjp(value) {
        if (value === undefined)
            this.delete("gjp");
        else
            this.set("gjp", value || null);
    }

}

module.exports = getGJUserInfo20Endpoint;
