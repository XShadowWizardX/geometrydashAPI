"use strict";

const Base = require("./BaseIndexes");
const Util = require("../util/Util");

const TimestampString = require("../util/TimestampString");

const IconSet = require("../util/IconSet");

const {
    util: {
        regex: {
            valid: VALID_REGEX
        },
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
    users: {
        regex: {
            username: USERNAME_REGEX
        }
    },
} = require("../util/Constants");

const properties = require("../properties/users/UserInfo");
const {
    USERNAME,
    PLAYER_ID,
    STARS,
    DEMONS,
    RELATIVE_POSITION,
    MATCHED,
    CP,
    ICON_ID,
    ICON_COLOR_1_ID,
    ICON_COLOR_2_ID,
    SCOINS,
    GAMEMODE_ID,
    ACCOUNT_ID,
    UCOINS,
    MESSAGE_FILTER_ID,
    FRIEND_REQUEST_FILTER_ID,
    YOUTUBE,
    CUBE_ID,
    SHIP_ID,
    BALL_ID,
    UFO_ID,
    DART_ID,
    ROBOT_ID,
    TRAIL_ID,
    GLOW,
    REGISTERED,
    RANK_GLOBAL,
    FRIEND_STATUS_ID,
    FRIEND_REQUEST_MESSAGE,
    FRIEND_REQUEST_TIMESTAMP,
    NEW_MESSAGES,
    NEW_FRIEND_REQUESTS,
    NEW_FRIENDS,
    LEVEL_SCORE_TIMESTAMP,
    SPIDER_ID,
    TWITTER,
    TWITCH,
    DIAMONDS,
    DEATH_EFFECT_ID,
    MOD_STATUS_ID,
    COMMENT_HISTORY_FILTER_ID
} = properties;

/**
 * @description UserInfo
 * @extends {Base}
 */

class UserInfo extends Base {

    build() {

        this._indexes = {
            [USERNAME]: null,
            [PLAYER_ID]: 0n,
            [STARS]: 0,
            [DEMONS]: 0,
            [RELATIVE_POSITION]: 0,
            [MATCHED]: null,
            [CP]: 0,
            [ICON_ID]: 0n,
            [ICON_COLOR_1_ID]: 0n,
            [ICON_COLOR_2_ID]: 0n,
            [SCOINS]: 0,
            [GAMEMODE_ID]: 0n,
            [ACCOUNT_ID]: 0n,
            [UCOINS]: 0,
            [ACCOUNT_ID]: 0n,
            [MESSAGE_FILTER_ID]: 0n,
            [FRIEND_REQUEST_FILTER_ID]: 0n,
            [YOUTUBE]: null,
            [CUBE_ID]: 0n,
            [SHIP_ID]: 0n,
            [BALL_ID]: 0n,
            [UFO_ID]: 0n,
            [DART_ID]: 0n,
            [ROBOT_ID]: 0n,
            [TRAIL_ID]: 0n,
            [GLOW]: false,
            [REGISTERED]: false,
            [RANK_GLOBAL]: 0,
            [FRIEND_STATUS_ID]: 0n,
            [FRIEND_REQUEST_MESSAGE]: null,
            [FRIEND_REQUEST_TIMESTAMP]: null,
            [NEW_MESSAGES]: 0,
            [NEW_FRIEND_REQUESTS]: 0,
            [NEW_FRIENDS]: 0,
            [LEVEL_SCORE_TIMESTAMP]: null,
            [SPIDER_ID]: 0n,
            [TWITTER]: null,
            [TWITCH]: null,
            [DIAMONDS]: 0,
            [DEATH_EFFECT_ID]: 0n,
            [MOD_STATUS_ID]: 0n,
            [COMMENT_HISTORY_FILTER_ID]: 0n
        };

        return this;

    }

    /**
     * @description The name of the user
     * @type {?string}
     * @defaultvalue null
     * @param {?string} value
     */

    get username() { return this._indexes[USERNAME]; }
    set username(value) {
        if (value == null || USERNAME_REGEX.test(value)) {
            this._indexes[USERNAME] = value == null ? null : `${value}`;
        }
    }

    /**
     * @description The identification number of the player
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get playerID() { return this._indexes[PLAYER_ID]; }
    set playerID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[PLAYER_ID] = BigInt(value);
        }
    }

    /**
     * @description The user's collected stars
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
     * @description The user's completed demons
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get demons() { return this._indexes[DEMONS]; }
    set demons(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[DEMONS] = Number(value);
        }
    }

    /**
     * @description The user's 1-based position / rank on a general list or leaderboard
     * * `0` - Not listed/ranked
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get relativePosition() { return this._indexes[RELATIVE_POSITION]; }
    set relativePosition(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[RELATIVE_POSITION] = Number(value);
        }
    }

    /**
     * @description The string that matched this player in an API search endpoint
     * * Used for highlighting players on leaderboards
     * @type {?string}
     * @defaultvalue null
     * @param {?string} value
     */

    get matched() { return this._indexes[MATCHED]; }
    set matched(value) {
        this._indexes[MATCHED] = value == null ? null : `${value}`;
    }

    /**
     * @description The user's awarded creator points.
     * * `+1` - For each starred, published level
     * * `+1` - For each featured, published level
     * * `+1` - For each epic, published level
     * * `--`
     * * *`3` Maximum per published level*
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get cp() { return this._indexes[CP]; }
    set cp(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[CP] = Number(value);
        }
    }

    /**
     * @description The identification number of the player's main icon
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get iconID() { return this._indexes[ICON_ID]; }
    set iconID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[ICON_ID] = BigInt(value);
        }
    }

    /**
     * @description The identification number of the player's primary icon color
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get iconColor1ID() { return this._indexes[ICON_COLOR_1_ID]; }
    set iconColor1ID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[ICON_COLOR_1_ID] = BigInt(value);
        }
    }

    /**
     * @description The identification number of the player's secondary icon color
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get iconColor2ID() { return this._indexes[ICON_COLOR_2_ID]; }
    set iconColor2ID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[ICON_COLOR_2_ID] = BigInt(value);
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
     * @description The identification number of the player's main gamemode (the
     * last gamemode option the user opened in the icon selection menu)
     * * `0` - cube
     * * `1` - ship
     * * `2` - ball
     * * `3` - ufo
     * * `4` - dart
     * * `5` - robot
     * * `6` - spider
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get gamemodeID() { return this._indexes[GAMEMODE_ID]; }
    set gamemodeID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[GAMEMODE_ID] = BigInt(value);
        }
    }

    /**
     * @description The identification number of the player's account
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get accountID() { return this._indexes[ACCOUNT_ID]; }
    set accountID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[ACCOUNT_ID] = BigInt(value);
        }
    }

    /**
     * @description The user's collected verified user coins
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get ucoins() { return this._indexes[UCOINS]; }
    set ucoins(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[UCOINS] = Number(value);
        }
    }

    /**
     * @description The identification number of the player's
     * filter for incoming messages
     * * `0` - Open to all
     * * `1` - Open to friends
     * * `2` - Open to self
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get messageFilterID() { return this._indexes[MESSAGE_FILTER_ID]; }
    set messageFilterID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[MESSAGE_FILTER_ID] = BigInt(value);
        }
    }

    /**
     * @description The identification number of the player's
     * filter for incoming friend requests
     * * `0` - Open to all
     * * `1` - Open to none
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get friendRequestFilterID() { return this._indexes[FRIEND_REQUEST_FILTER_ID]; }
    set friendRequestFilterID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[FRIEND_REQUEST_FILTER_ID] = BigInt(value);
        }
    }

    /**
     * @description The player's youtube channelID
     * @type {?string}
     * @defaultvalue null
     * @param {?string} value
     */

    get youtube() { return this._indexes[YOUTUBE]; }
    set youtube(value) {
        this._indexes[YOUTUBE] = value == null ? null : `${value}`;
    }

    /**
     * @description The identification number of the player's cube
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get cubeID() { return this._indexes[CUBE_ID]; }
    set cubeID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[CUBE_ID] = BigInt(value);
        }
    }

    /**
     * @description The identification number of the player's ship
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get shipID() { return this._indexes[SHIP_ID]; }
    set shipID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[SHIP_ID] = BigInt(value);
        }
    }

    /**
     * @description The identification number of the player's ball
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get ballID() { return this._indexes[BALL_ID]; }
    set ballID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[BALL_ID] = BigInt(value);
        }
    }

    /**
     * @description The identification number of the player's UFO
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get ufoID() { return this._indexes[UFO_ID]; }
    set ufoID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[UFO_ID] = BigInt(value);
        }
    }

    /**
     * @description The identification number of the player's dart
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get dartID() { return this._indexes[DART_ID]; }
    set dartID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[DART_ID] = BigInt(value);
        }
    }

    /**
     * @description The identification number of the player's robot
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get robotID() { return this._indexes[ROBOT_ID]; }
    set robotID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[ROBOT_ID] = BigInt(value);
        }
    }

    /**
     * @description The identification number of the player's trail
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get trailID() { return this._indexes[TRAIL_ID]; }
    set trailID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[TRAIL_ID] = BigInt(value);
        }
    }

    /**
     * @description Whether the user has glow enabled
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get glow() { return this._indexes[GLOW]; }
    set glow(value) { this._indexes[GLOW] = VALID_REGEX.test(value); }

    /**
     * @description Whether the user's account is registered
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get registered() { return this._indexes[REGISTERED]; }
    set registered(value) { this._indexes[REGISTERED] = VALID_REGEX.test(value); }

    /**
     * @description The user's 1-based rank on the global, stars leaderboard
     * * `0` - Not listed/ranked
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get rankGlobal() { return this._indexes[RANK_GLOBAL]; }
    set rankGlobal(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[RANK_GLOBAL] = Number(value);
        }
    }

    /**
     * @description The identification number of the player's
     * RELATIVE friend status to a user
     * * `0` - No relation
     * * `1` - Friended
     * * `3` - User sent request; Player hasn't accepted
     * * `4` - Player sent request; User hasn't accepted
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get friendStatusID() { return this._indexes[FRIEND_STATUS_ID]; }
    set friendStatusID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[FRIEND_STATUS_ID] = BigInt(value);
        }
    }

    /**
     * @description The message sent with a friend request
     * @type {?string}
     * @defaultvalue null
     * @param {?string} value
     */

    get friendRequestMessage() { return this._indexes[FRIEND_REQUEST_MESSAGE]; }
    set friendRequestMessage(value) {
        this._indexes[FRIEND_REQUEST_MESSAGE] = value == null ? null : `${value}`;
    }

    /**
     * @description The elasped time timestamp a friend request was sent
     * @type {?TimestampString}
     * @defaultvalue null
     * @param {?string|TimestampString} value
     */

    get friendRequestTimestamp() {
        return this._indexes[FRIEND_REQUEST_TIMESTAMP]
        ? new TimestampString(this._indexes[FRIEND_REQUEST_TIMESTAMP])
        : null;
    }

    set friendRequestTimestamp(value) {
        this._indexes[FRIEND_REQUEST_TIMESTAMP] = value == null ? null : `${value}`;
    }

    /**
     * @description The number of unchecked messages a user has received
     * * (REQUIRES USER'S PASSWORD TO OBTAIN)
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get newMessages() { return this._indexes[NEW_MESSAGES]; }
    set newMessages(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[NEW_MESSAGES] = Number(value);
        }
    }

    /**
     * @description The number of unchecked friend requests a user has received
     * * (REQUIRES USER'S PASSWORD TO OBTAIN)
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get newFriendRequests() { return this._indexes[NEW_FRIEND_REQUESTS]; }
    set newFriendRequests(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[NEW_FRIEND_REQUESTS] = Number(value);
        }
    }

    /**
     * @description The number of unchecked friends a user has friended
     * * (REQUIRES USER'S PASSWORD TO OBTAIN)
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get newFriends() { return this._indexes[NEW_FRIENDS]; }
    set newFriends(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[NEW_FRIENDS] = Number(value);
        }
    }

    /**
     * @description The elasped time timestamp a player was posted on a level's leaderboard
     * @type {?string}
     * @defaultvalue null
     * @param {?string} value
     */

    get levelScoreTimestamp() {
        return this._indexes[LEVEL_SCORE_TIMESTAMP]
        ? new TimestampString(this._indexes[LEVEL_SCORE_TIMESTAMP])
        : null;
    }
    set levelScoreTimestamp(value) {
        this._indexes[LEVEL_SCORE_TIMESTAMP] = value == null ? null : `${value}`;
    }

    /**
     * @description The identification number of the player's spider
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get spiderID() { return this._indexes[SPIDER_ID]; }
    set spiderID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[SPIDER_ID] = BigInt(value);
        }
    }

    /**
     * @description The player's twitter tag
     * @type {?string}
     * @defaultvalue null
     * @param {?string} value
     */

    get twitter() { return this._indexes[TWITTER]; }
    set twitter(value) {
        this._indexes[TWITTER] = value == null ? null : `${value}`;
    }

    /**
     * @description The player's twitch username
     * @type {?string}
     * @defaultvalue null
     * @param {?string} value
     */

    get twitch() { return this._indexes[TWITCH]; }
    set twitch(value) {
        this._indexes[TWITCH] = value == null ? null : `${value}`;
    }

    /**
     * @description The user's collected diamonds
     * @type {number}
     * @defaultvalue 0
     * @param {number|string|BigInt} value
     */

    get diamonds() { return this._indexes[DIAMONDS]; }
    set diamonds(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[DIAMONDS] = Number(value);
        }
    }

    /**
     * @description The identification number of the player's death effect
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get deathEffectID() { return this._indexes[DEATH_EFFECT_ID]; }
    set deathEffectID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[DEATH_EFFECT_ID] = BigInt(value);
        }
    }

    /**
     * @description The identification number of the player's mod status
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get modStatusID() { return this._indexes[MOD_STATUS_ID]; }
    set modStatusID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[MOD_STATUS_ID] = BigInt(value);
        }
    }

    /**
     * @description Whether the user is a GD Moderator
     * @type {BigInt}
     * @defaultvalue false
     * @param {BigInt|number|string} value
     */

    get mod() { return this.modStatusID >= 1; }
    set mod(value) { this.modStatusID = VALID_REGEX.test(value) ? 1 : 0; }

    /**
     * @description Whether the user is a GD Elder Moderator
     * @type {BigInt}
     * @defaultvalue false
     * @param {BigInt|number|string} value
     */

    get modElder() { return this.modStatusID >= 2; }
    set modElder(value) { this.modStatusID = VALID_REGEX.test(value) ? 2 : 0; }

    /**
     * @description The identification number of the player's
     * filter for viewing comment history
     * * `0` - Open to all
     * * `1` - Open to friends
     * * `2` - Open to self
     * @type {BigInt}
     * @defaultvalue 0n
     * @param {BigInt|number|string} value
     */

    get commentHistoryFilterID() { return this._indexes[COMMENT_HISTORY_FILTER_ID]; }
    set commentHistoryFilterID(value) {
        if (/^\d{1,}$/.test(value)) {
            this._indexes[COMMENT_HISTORY_FILTER_ID] = BigInt(value);
        }
    }

    /**
     * @description The player's icon set as an object
     * @type {IconSet}
     * @param {IconSet} value
     */

    get iconSet() {
        let res = new IconSet();

        res.gamemodeSelectedID = this.gamemodeID;

        switch (this.gamemodeID) {
            case 0n:
                res.cubeID = this.iconID;
                break;
            case 1n:
                res.shipID = this.iconID;
                break;
            case 2n:
                res.ballID = this.iconID;
                break;
            case 3n:
                res.ufoID = this.iconID;
                break;
            case 4n:
                res.dartID = this.iconID;
                break;
            case 5n:
                res.robotID = this.iconID;
                break;
            case 6n:
                res.spiderID = this.iconID;
                break;
        }

        res.cubeID = this.cubeID || res.cubeID;
        res.shipID = this.shipID || res.shipID;
        res.ballID = this.ballID || res.ballID;
        res.ufoID = this.ufoID || res.ufoID;
        res.dartID = this.dartID || res.dartID;
        res.robotID = this.robotID || res.robotID;
        res.spiderID = this.spiderID || res.spiderID;

        res.color1ID = this.iconColor1ID;
        res.color2ID = this.iconColor2ID;

        res.glowStatus = this.glow;

        res.trailID = this.trailID;
        res.deathEffectID = this.deathEffectID;

        return res;
    }

    /**
     * @typedef {Base.parse}
     */

    parse(data) {

        if (data instanceof UserInfo || !Util.isObjectNormal(data)) {
            super.parse(data);
        } else {
            Object.entries(data).forEach(([k, v]) => {

                if (/^(1|username)$/i.test(k)) this.username = v;
                else if (/^(2|playerID)$/i.test(k)) this.playerID = v;
                else if (k == "3" || STARS_REGEX.test(k)) this.stars = v;
                else if (k == "4" || DEMONS_REGEX.test(k)) this.demons = v;
                // 5
                else if (/^(6|(relative)? ?position)$/i.test(k)) this.relativePosition = v;
                else if (/^(7|match(ed)?|matches)$/i.test(k)) this.matched = v;
                else if (k == "8" || CP_REGEX.test(k)) this.cp = v;
                else if (/^(9|icon(ID)?)$/i.test(k)) this.iconID = v;
                else if (/^(10|(icon)?Color1(ID)?)$/i.test(k)) this.iconColor1ID = v;
                else if (/^(11|(icon)?Color2(ID)?)$/i.test(k)) this.iconColor2ID = v;
                // 12
                else if (k == "13" || SCOINS_REGEX.test(k)) this.scoins = v;
                else if (/^(14|gamemode(ID)?)$/i.test(k)) this.gamemodeID = v;
                else if (/^(16|accountID)$/i.test(k)) this.accountID = v;
                else if (k == "17" || UCOINS_REGEX.test(k)) this.ucoins = v;
                else if (/^(18|messageFilter(ID)?)$/i.test(k)) this.messageFilterID = v;
                else if (/^(19|friendRequestFilter(ID)?)$/i.test(k)) this.friendRequestFilterID = v;
                else if (/^(20|youtube)$/i.test(k)) this.youtube = v;
                else if (/^(21|cube(ID)?)$/i.test(k)) this.cubeID = v;
                else if (/^(22|ship(ID)?)$/i.test(k)) this.shipID = v;
                else if (/^(23|ball(ID)?)$/i.test(k)) this.ballID = v;
                else if (/^(24|ufo(ID)?)$/i.test(k)) this.ufoID = v;
                else if (/^(25|dart(ID)|wave(ID)?)$/i.test(k)) this.dartID = v;
                else if (/^(26|robot(ID)?)$/i.test(k)) this.robotID = v;
                else if (/^(27|trail(ID)?)$/i.test(k)) this.trailID = v;
                else if (/^(28|glow)$/i.test(k)) this.glow = v;
                else if (/^(29|registered)$/i.test(k)) this.registered = v;
                else if (/^(30|rank|rankGlobal|global)$/i.test(k)) this.rankGlobal = v;
                else if (/^(31|friendStatus(ID)?)$/i.test(k)) this.friendStatusID = v;
                // 32
                // 33
                // 34
                else if (/^(35|friendRequestMessage)$/i.test(k)) this.friendRequestMessage = v;
                // 36
                else if (/^(37|friendRequestTimestamp)$/i.test(k)) this.friendRequestTimestamp = v;
                else if (/^(38|newMessages)$/i.test(k)) this.newMessages = v;
                else if (/^(39|newFriendRequests)$/i.test(k)) this.newFriendRequests = v;
                else if (/^(40|newFriends?)$/i.test(k)) this.newFriends = v;
                // 41
                else if (/^(42|levelScoreTimestamp)$/i.test(k)) this.levelScoreTimestamp = v;
                else if (/^(43|spider(ID)?)$/i.test(k)) this.spiderID = v;
                else if (/^(44|twitter)$/i.test(k)) this.twitter = v;
                else if (/^(45|twitch)$/i.test(k)) this.twitch = v;
                else if (k == "46" || DIAMONDS_REGEX.test(k)) this.diamonds = v;
                // 47
                else if (/^(48|deathEffect(ID)?)$/i.test(k)) this.deathEffectID = v;
                else if (/^(49|mod(status(ID)?)?)$/i.test(k)) this.modStatusID = v;
                else if (/^(50|commentHistoryFilter(ID)?)$/i.test(k)) this.commentHistoryFilterID = v;

            });
        }

        return this;

    }

}

UserInfo.PROPERTIES = properties;

module.exports = UserInfo;