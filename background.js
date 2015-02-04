chrome.webRequest.onHeadersReceived.addListener(function (details) {
    for (var i = 0; i < details.responseHeaders.length; ++i) {
        if (details.responseHeaders[i].name.toLowerCase() == 'content-security-policy') {
            details.responseHeaders[i].value = details.responseHeaders[i].value.replace(/assets\-cdn\.github\.com/g, 'github.com assets-cdn.github.com');
        }
    }
    details.responseHeaders.push({name: 'Access-Control-Allow-Origin', value: '*'});
    return {responseHeaders: details.responseHeaders};
}, {
    urls: ['https://github.com/*']
}, ['blocking', 'responseHeaders']);

chrome.webRequest.onHeadersReceived.addListener(function (details) {
    details.responseHeaders.push({name: 'Access-Control-Allow-Origin', value: '*'});
    return {responseHeaders: details.responseHeaders};
}, {
    urls: ['https://assets-cdn.github.com/*']
}, ['blocking', 'responseHeaders']);