// warning: contains nsfw words
// scroll down at your own risk


// make browser notifications
function notify(title, options) {
    return new Promise(function(resolve, reject) {
        self.registration.showNotification(title, options, resolve);
    });
    }

notify('Censorer is active!', {
    body: 'Scroll safely!',
)

// function to redirect a url to another url
function redirect(url) {
    return new Promise(function(resolve, reject) {
        self.clients.matchAll().then(function(clients) {
            clients.forEach(function(client) {
                client.postMessage(url);
            });
        });
    });
}

// if a website contains a blocked word from the list, redirect it to "about:blank"
function redirectBlocked(url) {
    return new Promise(function(resolve, reject) {
        self.clients.matchAll().then(function(clients) {
            clients.forEach(function(client) {
                client.postMessage(url);
            });
        });
    });
}

// list of blocked websites
var blocked = [
    'https://www.facebook.com/',
    'https://www.instagram.com/',
    'https://www.twitter.com/',
    'https://www.pornhub.com/',
    'https://www.xvideos.com/',
    'https://www.xnxx.com/',
    'https://www.redtube.com/',
    'https://www.xhamster.com/',
    'https://www.youporn.com/',
]

// when a user visits a website, check if it is in one of the blocked websites
self.addEventListener('fetch', function(event) {
    var url = event.request.url;
    if (blocked.indexOf(url) > -1) {
        event.respondWith(redirectBlocked(url));
    }
}
);

// list of blocked words
var blockedWords = [
    'fuck',
    'shit',
    'bitch',
    'ass',
    'dick',
    'pussy',
    'cock',
]

// if a part of the website contains the blocked word
self.addEventListener('fetch', function(event) {
    var url = event.request.url;
    if (blockedWords.some(function(word) {
        // put the blocked word on a different id
        return url.indexOf(word) > -1;
        })) {
        event.respondWith(redirectBlocked(url));
    }
}

