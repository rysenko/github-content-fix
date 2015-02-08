chrome.webRequest.onHeadersReceived.addListener(function (details) {
    var hasAccessHeader = false;
    for (var i = 0; i < details.responseHeaders.length; ++i) {
        var headerLower = details.responseHeaders[i].name.toLowerCase();
        if (headerLower === 'content-security-policy') {
            details.responseHeaders[i].value = details.responseHeaders[i].value.replace(/assets\-cdn\.github\.com/g, 'github.com assets-cdn.github.com');
        } else if (headerLower == 'access-control-allow-origin') {
            details.responseHeaders[i].value = '*';
            hasAccessHeader = true;
        }
    }
    if (!hasAccessHeader) {
        details.responseHeaders.push({name: 'Access-Control-Allow-Origin', value: '*'});
    }
    return {responseHeaders: details.responseHeaders};
}, {
    urls: ['https://github.com/*', 'https://assets-cdn.github.com/*']
}, ['blocking', 'responseHeaders']);