"use strict";

const Util = require("../util/Util");

/**
 * @description The foundation for foundation classes
 */

class Base {

    /**
     * @description Creates and returns a flattened instance converted
     * into a JSON style object
     * @returns {Object}
     */

    JSON() { return Util.flatten(this); }

}

module.exports = Base;
