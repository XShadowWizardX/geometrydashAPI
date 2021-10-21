"use strict";

const Base = require("./Base");
const Util = require("../util/Util");

/**
 * @description The foundation for foundation classes
 * @extends {Base}
 */

class BaseIndexes extends Base {

    constructor(data) {
        super(data);
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
     * @param {Object} options
     * @param {string} [options.separatorValue=":"] Separator of indexs' values
     * @param {string} [options.separator=":"] Separator of indexes
     * @returns {string}
     */

    stringify({
        separatorValue = this.constructor.PROPERTIES_VALUE_SEPARATOR,
        separator = this.constructor.PROPERTIES_SEPARATOR
    }={}) {
        return Object.entries(this._indexes).reduce((res, [id, v]) => {
            if (this.constructor.PROPERTIES && id in this.constructor.PROPERTIES) {
                if (Util.isObjectNormal(v) && "stringify" in v)
                    v.push([id, v.stringify()]);
                else
                    v.push([id, `${typeof v === "boolean" ? v ? 1 : 0 : v}`]);
            }
            return res;
        }, []).map(a => a.join(separatorValue)).join(separator);
    }

    /**
     * @description Creates and returns a flattened instance converted
     * into a JSON style object
     * @returns {Object}
     */

    JSON() { return Util.flatten(this); }

}

BaseIndexes.PROPERTIES_VALUE_SEPARATOR = ":";
BaseIndexes.PROPERTIES_SEPARATOR = ":";
BaseIndexes.PROPERTIES = {};

module.exports = BaseIndexes;