const { downloadVideo } = require('./singleVideoDownloader');
const { grabIdsFromPlaylist } = require('./playlistVideoIdsGrabber');

const downloadVideos = async playlistId => {
  try {
      const videosToDownload = await grabIdsFromPlaylist(playlistId);

      console.log(`Grabbed ids from playlist: ${videosToDownload}`);

      for (let id of videosToDownload) {
          downloadVideo(id);
      }
  } catch (err) {
      console.log(`An error occured: ${err} - ${JSON.stringify(err)}`);
      console.log('Restart the program, use a valid playlist id, make sure playlist is public :)');
      process.exit(1);
  }
};

module.exports = {
    downloadVideos,
};