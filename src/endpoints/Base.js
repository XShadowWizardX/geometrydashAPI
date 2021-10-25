"use strict";

const Util = require("../util/Util");
const {
    util: {
        regex: {
            valid: VALID_REGEX
        }
    }
} = require("../util/Constants");

/**
 * @description The base structure for endpoint
 * @extends {Map}
 */

class EndpointBase extends Map {

    constructor(...entries) {
        super(...entries);
        this.build();
    }

    build() {

        this.gameVersion = 21;
        this.binaryVersion = 35;
        this.gdw = false;
        this.secret = "Wmfd2893gb7";

        return this;
    }

    /**
     * @description The API URL path
     * @type {string}
     */

    get _path() { return ""; }

    get _url() {
        let qStr = this._query.toString();
        return new URL(`http://boomlings.com${this._path}${qStr ? `?${qStr}` : ""}`);
    }

    get _query() {
        return new URLSearchParams(Object.entries(this.toJSON()).map(([key, value]) => {
            return [key, typeof value === 'boolean' ? value ? 1 : 0 : value];
        }));
    }


    /**
     * @description The numeric version of the game
     * * `20` - 2.0
     * * `21` - 2.1
     * * `22` - 2.2
     * @param {?BigInt|number|string} value
     * @type {?Number}
     */

    get gameVersion() { return this.get("gameVersion"); }
    set gameVersion(value) {
        if (value === undefined)
            this.delete("gameVersion");
        else
            this.set("gameVersion", value && /^-?\d{1,}$/.test(value) ? Number(value) : null);
    }


    /**
     * @description The binary version of the game
     * @param {?BigInt|number|string} value
     * @type {?Number}
     */

    get binaryVersion() { return this.get("binaryVersion"); }
    set binaryVersion(value) {
        if (value === undefined)
            this.delete("binaryVersion");
        else
            this.set("binaryVersion", value && /^-?\d{1,}$/.test(value) ? Number(value) : null);
    }


    /**
     * @description Whether to get Geometry Dash World results
     * @param {?BigInt|number|string} value
     * @type {?Number}
     */

    get gdw() { return this.get("gdw"); }
    set gdw(value) {
        if (value === undefined)
            this.delete("gdw");
        else
            this.set("gdw", VALID_REGEX.test(value));
    }


    /**
     * @description Endpoint password
     * @param {?BigInt|number|string} value
     * @type {?Number}
     */

    get secret() { return this.get("secret"); }
    set secret(value) {
        if (value === undefined)
            this.delete("secret");
        else
            this.set("secret", value || null);
    }


    async request(query) {
        // WIP
    }

    toJSON() {
        return Util.flatten(Object.fromEntries(this.entries()));
    }

}

EndpointBase.PATH_BASE = __dirname;

module.exports = EndpointBase;