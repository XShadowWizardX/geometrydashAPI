"use strict";

const Util = require("../util/Util");

/**
 * @description The foundation for foundation classes
 */

class Base {

    constructor(data) {
        this.build();
        this.parse(data);
        this.patch();
    }

    build() {
        
        this._indexes = {}

        return this;

    }

    patch() { return this; }

    parse() { return this; }

    /**
     * @description Converts the instance into a string format
     * @returns {string}
     */

    stringify() { return ""; }

    /**
     * @description Creates and returns a flattened instance converted
     * into a JSON style object
     * @returns {Object}
     */

    JSON() { return Util.flatten(this); }

}

Base.PROPERTIES = {};

module.exports = Base;