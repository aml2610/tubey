const {
    allIndicesOf,
    stripKey,
    substringUpUntil,
} = require('./stringUtils');

const find = (body, key, end, subtract, exclude) => {
    const indices = allIndicesOf(body, key);
    const found = [];

    // console.log('All indices of: ' + key);
    // console.log(indices);

    for (let index of indices) {
        const substr = substringUpUntil(body, index, end, exclude, key.length);
        found.push(isNaN(end) ? stripKey(key, substr, subtract) : substr);
    }

    return found;
};

const extractIdsFromHTML = body => {
    // console.log('Extract ids from html');

    return find(body, 'href="/watch?v=', '&', 0);
};

const extractMoreContentLinkFromHTML = body => {
    // console.log('Extract more content link from html');

    return find(body, 'data-uix-load-more-href="', '"', 1, '=');
};

const extractIdsFromJSON = body => {
    // console.log('Extract ids from json');

    return find(body, 'href=\\"\\/watch?v=', 11, 0);
};

const extractMoreContentLinkFromJSON = body => {
    // console.log('Extract more content link from json');

    return find(body, 'data-uix-load-more-href=\\"', '\\"', 0 ,'=');
};

module.exports = {
    extractIdsFromHTML,
    extractMoreContentLinkFromHTML,
    extractIdsFromJSON,
    extractMoreContentLinkFromJSON,
};
