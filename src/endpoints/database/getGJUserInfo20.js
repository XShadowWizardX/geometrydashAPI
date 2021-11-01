"use strict";

const Base = require("../Base");

/**
 * @description Gets a user's GD Profile
 * @extends {Base}
 */

class getGJUserInfo20Endpoint extends Base {

    /**
     * @description The API URL path
     * @type {string}
     */

    get _path() { return __filename.substr(Base.PATH_BASE.length).replace(/\..{1,}$/, ".php"); }

    /**
     * @description Whether the current parameters will likely produce a
     * failed request
     * @returns {boolean}
     */

    isFaulty() {
        return !(this.targetAccountID > 0)
        || this.secret == null
        || super.isFaulty();
    }


    /**
     * @description The accountID of the user whose information
     * is to be returned
     * @param {?BigInt|number|string} value
     * @type {?BigInt}
     */

    get targetAccountID() { return BigInt(this.get("targetAccountID") || 0); }
    set targetAccountID(value) {
        if (value === undefined)
            this.delete("targetAccountID");
        else
            this.set("targetAccountID", value && /^-?\d{1,}$/.test(value) ? BigInt(value) : null);
    }

    /**
     * @description The accountID of the user that's searching (used alongside gjp and used to check
     * whether the loader is blocked by the looked up user)
     * @param {?BigInt|number|string} value
     * @type {?BigInt}
     */

    get accountID() { return BigInt(this.get("accountID") || 0); }
    set accountID(value) {
        if (value === undefined)
            this.delete("accountID");
        else
            this.set("accountID", value && /^-?\d{1,}$/.test(value) ? BigInt(value) : null);
    }

    /**
     * @description The loader's account password
     * @param {?BigInt|number/|string} value
     * @type {?Number}
     */

    get gjp() { return this.get("gjp") || null; }
    set gjp(value) {
        if (value === undefined)
            this.delete("gjp");
        else
            this.set("gjp", value || null);
    }

}

module.exports = getGJUserInfo20Endpoint;
