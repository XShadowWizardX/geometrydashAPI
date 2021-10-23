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

    parse(value, {
        separatorValue = this.constructor.PROPERTIES_VALUE_SEPARATOR,
        separator = this.constructor.PROPERTIES_SEPARATOR
    }={}) {
        if (value instanceof BaseIndexes) {
            this.parse(value.stringify())
        } else if (typeof value === "string") {
            value = Util.group(2, ...value.split(separator).reduce((res, a) => {
                res.push(...a.split(separatorValue));
                return res;
            }, []));
            this.parse(Object.fromEntries(value));
        }
        return this;
    }

    /**
     * @description Converts the instance into a string format
     * @param {Object} options
     * @param {string} [options.separatorValue=":"] Separator of indexs' values
     * @param {string} [options.separator=":"] Separator of indexes
     * @returns {string}
     */

    stringify({
        separatorValue = this.constructor.PROPERTIES_VALUE_SEPARATOR,
        separator = this.constructor.PROPERTIES_SEPARATOR,
        props = this.constructor.PROPERTIES
    }={}) {
        return Object.entries(Util.flatten(this._indexes)).reduce((res, [id, v]) => {
            if (Util.isObjectNormal(v) && "stringify" in v)
                res.push([id, v.stringify()]);
            else
                res.push([id, `${typeof v === "boolean" ? v ? 1 : 0 : v}`]);
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
