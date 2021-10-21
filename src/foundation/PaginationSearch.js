"use strict";

const Base = require("./BaseIndexes");
const Util = require("../util/Util");

const properties = require("../properties/util/pagination");
const {
    TOTAL,
    PAGE,
    PER_PAGE
} = properties;

/**
 * @description Paginations details for search related stuff
 * @extends {Base}
 */

class PaginationSearch extends Base {

    build() {

        this._indexes = {
            [TOTAL]: 0,
            [PAGE]: 0,
            [PER_PAGE]: 0,
        };

        return this;

    }

    /**
     * @description The total amount of entries
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get total() { return this._indexes[TOTAL]; }
    set total(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[TOTAL] = Number(value);
        }
    }

    /**
     * @description The 0-based page index
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get page() { return this._indexes[PAGE]; }
    set page(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[PAGE] = Number(value);
        }
    }

    /**
     * @description The amount of entries displayed on a single page
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get perPage() { return this._indexes[PER_PAGE]; }
    set perPage(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[PER_PAGE] = Number(value);
        }
    }

    /**
     * @description Converts the instance into a string format
     * @returns {string}
     */

    stringify() {
        return [
            this.total,
            this.page,
            this.perPage
        ].join(":");
    }

    /**
     * @typedef {Base.parse}
     */

    parse(data) {

        if (typeof data === "string") {
            [
                this.total,
                this.page,
                this.perPage
            ] = data.split(":");
        } else if (Util.isObjectNormal(data)) {
            Object.entries(data).forEach(([k, v]) => {
                if (/^total$/i.test(k)) this.total = v;
                if (/^page$/i.test(k)) this.page = v;
                if (/^perPage$/i.test(k)) this.perPage = v;
            });
        }

        return this;

    }

}

PaginationSearch.PROPERTIES = properties;

module.exports = PaginationSearch;
