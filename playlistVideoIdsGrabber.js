const ytlist = require('youtube-playlist');

const grabIdsFromPlaylist = async playlistUrl => {
    const result = await ytlist(playlistUrl, 'id');
    const playlist = result.data.playlist;

    console.log(`Grabbed ${playlist.length} ids to download`);

    return playlist;
};

module.exports = {
    grabIdsFromPlaylist,
};