const Store = require('express-session').Store
const util = require('util')
const debug = require('debug')('express-session')

/**
 * Shim setImmediate for node.js < 0.10
 * @private
 */

var defer = typeof setImmediate === 'function' ?
    setImmediate :
    function(fn) { process.nextTick(fn.bind.apply(fn, arguments)) }

/**
 * Module exports.
 */

module.exports = MemoryStore

/**
 * A session store in memory.
 * @param {Object} [options]
 * @param {Number} [options.timeout] Session timeout (in minutes). Use a negative value to never expire.
 * @public
 */

function MemoryStore(options) {
    Store.call(this)
    this.sessions = Object.create(null)
    this.session_timers = Object.create(null)

    // set up the store
    this.options = {
        timeout: -1 // sessions never expire by default
    }

    if (options) {
        if (typeof options.timeout !== 'undefined') {
            this.options.timeout = options.timeout
        }
    }

    debug('session timeout is set to ' + this.options.timeout)

    // run the session timeout checker
    if (this.options.timeout >= 0) {
        var self = this
        this.session_timeout_checker = setInterval(function() {
                    debug('checking sessions for timeout')
                    for (var sessionId in self.session_timers) {
                        if (self.session_timers[sessionId] === 0) {
                            debug('session ' + sessionId + ' timed out, destroying it')
                            self.destroy(sessionId)
                        } else {
                            self.session_timers[sessionId]--
                        }
                    }
                },
                6000 * 1000) // runs every minute
    }
}

/**
 * Inherit from Store.
 */

util.inherits(MemoryStore, Store)

/**
 * Get all active sessions.
 *
 * @param {function} callback
 * @public
 */

MemoryStore.prototype.all = function all(callback) {
    var sessionIds = Object.keys(this.sessions)
    var sessions = Object.create(null)

    for (var i = 0; i < sessionIds.length; i++) {
        var sessionId = sessionIds[i]
        var session = getSession.call(this, sessionId)

        if (session) {
            sessions[sessionId] = session
        }
    }

    callback && defer(callback, null, sessions)
}

/**
 * Clear all sessions.
 *
 * @param {function} callback
 * @public
 */

MemoryStore.prototype.clear = function clear(callback) {
    this.sessions = Object.create(null)
    this.session_timers = Object.create(null)
    callback && defer(callback)
}

/**
 * Destroy the session associated with the given session ID.
 *
 * @param {string} sessionId
 * @public
 */

MemoryStore.prototype.destroy = function destroy(sessionId, callback) {
    delete this.session_timers[sessionId]
    delete this.sessions[sessionId]
    callback && defer(callback)
}

/**
 * Fetch session by the given session ID.
 *
 * @param {string} sessionId
 * @param {function} callback
 * @public
 */

MemoryStore.prototype.get = function get(sessionId, callback) {
    defer(callback, null, getSession.call(this, sessionId))
}

/**
 * Commit the given session associated with the given sessionId to the store.
 *
 * @param {string} sessionId
 * @param {object} session
 * @param {function} callback
 * @public
 */

/**
 * Get number of active sessions.
 *
 * @param {function} callback
 * @public
 */

MemoryStore.prototype.length = function length(callback) {
    this.all(function(err, sessions) {
        if (err) return callback(err)
        callback(null, Object.keys(sessions).length)
    })
}

MemoryStore.prototype.set = function set(sessionId, session, callback) {
    if (typeof this.sessions[sessionId] === 'undefined') {
        debug('session created')
        this.session_timers[sessionId] = this.options.timeout
    }
    this.sessions[sessionId] = JSON.stringify(session)
    callback && defer(callback)
}

/**
 * Touch the given session object associated with the given session ID.
 *
 * @param {string} sessionId
 * @param {object} session
 * @param {function} callback
 * @public
 */

MemoryStore.prototype.touch = function touch(sessionId, session, callback) {
    var currentSession = getSession.call(this, sessionId)

    if (currentSession) {
        // update expiration
        currentSession.cookie = session.cookie
        this.sessions[sessionId] = JSON.stringify(currentSession)
    }

    callback && defer(callback)
}

/**
 * Get session from the store.
 * @private
 */

function getSession(sessionId) {

    debug('get session #' + sessionId)

    var sess = this.sessions[sessionId]

    if (!sess) {
        return
    }

    debug('Prolonging life for session #' + sessionId)
    this.session_timers[sessionId] = this.options.timeout

    // parse
    sess = JSON.parse(sess)

    var expires = typeof sess.cookie.expires === 'string' ?
        new Date(sess.cookie.expires) :
        sess.cookie.expires

    // destroy expired session
    if (expires && expires <= Date.now()) {
        delete this.sessions[sessionId]
        delete this.session_timers[sessionId]
        return
    }

    return sess
}