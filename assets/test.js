/* global $ */

require('core-js/es6')
require('jquery')
require('moment')
require('normalize.css')
require('font-awesome/scss/font-awesome.scss')
require('./chat/js/notification')
require('./chat/css/style.scss')

const url = window.location.href;
const parameterByName = name => {
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results || !results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const Chat = require('./chat/js/chat')['default']
const emotes = require('./emotes.json')
const argWs = parameterByName('u') || `ws://localhost:9000`
const argUrl = parameterByName('a') || `http://localhost:8181`

$.when(
    new Promise(res => $.ajax({url:`${argUrl}/api/chat/me`, xhrFields: {withCredentials: true}}).done(res).fail(() => res(null))),
    new Promise(res => $.ajax({url:`${argUrl}/api/chat/history`, xhrFields: {withCredentials: true}}).done(res).fail(() => res(null)))
).then((userAndSettings, history) => {
    return 0
        .withUserAndSettings(userAndSettings)
        .withBDGGSettings()
        .withEmotes(emotes)
        .withGui()
        .withHistory(history)
        .withWhispers()
        .connect(argWs)
})