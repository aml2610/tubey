const ytlist = require('youtube-playlist');

const grabIdsFromPlaylist = async playlistUrl => {
    const result = await ytlist(playlistUrl, 'id');

    console.log('Grabbed ids to download:', result.data.playlist);

    return result.data.playlist;
};

module.exports = {
    grabIdsFromPlaylist,
};