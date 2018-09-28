const { makeRequest, methods } = require('./httpsRequests');

const {
    extractIdsFromHTML,
    extractMoreContentLinkFromHTML,
    extractIdsFromJSON,
    extractMoreContentLinkFromJSON,
} = require('./infoExtracter');

const HOST = 'www.youtube.com';

const extractUsefulInfo = (body, {
    extractIds,
    extractMoreContentLink
}) => {
    const extractedIds = extractIds(body);
    // Unique ids only
    const ids = [...new Set(extractedIds)];

    const moreContentLink = extractMoreContentLink(body)[0];

    // console.log('More content link: ' + moreContentLink);
    // console.log('Ids crawled: ' + ids.length);

    return {
        ids,
        moreContentLink
    };
};

const crawlStep = async (path, i) => {
    try {
        // console.log('Crawler called with path: ' + path);
        const body = await makeRequest(HOST, path, methods.GET);

        const { ids, moreContentLink } = extractUsefulInfo(body, {
            extractIds: i ? extractIdsFromJSON : extractIdsFromHTML,
            extractMoreContentLink: i ? extractMoreContentLinkFromJSON : extractMoreContentLinkFromHTML,
        });

        // console.log('Crawler harvested ids: ' + ids.length);
        // console.log(ids);
        //
        // console.log('Crawler harvested more content link: ' + moreContentLink);

        return {
            ids,
            moreContentLink
        };
    } catch (err) {
        console.log('Crawling step failed');
        throw err;
    }
};

const grabIdsFromPlaylist = async (playlistId) => {
    let path = `/playlist?list=${playlistId}`;
    let allIds = [];
    let i = 0;

    try {
        while (path) {
            const { ids, moreContentLink } = await crawlStep(path, i);
            allIds = allIds.concat(ids);
            path = moreContentLink;
            i++;

            // console.log('All ids now: ');
            // console.log(allIds.length);
            // console.log('Path now: ');
            // console.log(path);
        }
    } catch (err) {
        throw err;
    }

    return allIds;
};

module.exports = {
    grabIdsFromPlaylist,
};