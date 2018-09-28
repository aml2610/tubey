const { downloadVideo } = require('./singleVideoDownloader');
const { grabIdsFromPlaylist } = require('./playlistVideoIdsGrabber');

const downloadVideos = async playlistUrl => {
  try {
      const videosToDownload = await grabIdsFromPlaylist(playlistUrl);

      for (let id of videosToDownload) {
          downloadVideo(id);
      }
  } catch (err) {
      console.log(`An error occured: ${err} - ${JSON.stringify(err)}`);
      console.log('Restart the program, use a valid playlist url :)');
      process.exit(1);
  }
};

module.exports = {
    downloadVideos,
};