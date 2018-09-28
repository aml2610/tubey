const { downloadVideo } = require('./singleVideoDownloader');
const { grabIdsFromPlaylist } = require('./playlistVideoIdsGrabber');

const downloadVideos = async playlistUrl => {
  try {
      const videosToDownload = await grabIdsFromPlaylist(playlistUrl);

      for (let id of videosToDownload) {
          downloadVideo(id);
      }
  } catch (err) {
      console.log(`An error occured: ${err} - ${JSON.stringify(err)}. Restart the program`);
      process.exit(1);
  }
};

downloadVideos('https://www.youtube.com/playlist?list=PLg7Fb71wbhKIiE7_2O55vJdKJkZgG0N6G');

module.exports = {
    downloadVideos,
};