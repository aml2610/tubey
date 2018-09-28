const YoutubeMp3Downloader = require('youtube-mp3-downloader');

// Config
const YD = new YoutubeMp3Downloader({
    'ffmpegPath': '/usr/local/bin/ffmpeg',
    'outputPath': '/Users/aml/Desktop/music',
    'youtubeVideoQuality': 'highest',
    'queueParallelism': 1000,
    'progressTimeout': 2000
});

YD.on('finished', function(err, data) {
    console.log(`Finished downloading video: ${data.videoTitle}`);
});

YD.on('error', function(error) {
    console.log(`Error downloading video: ${error}`);
});

// YD.on('progress', function(progress) {
//     console.log(`Progress for video: ${JSON.stringify(progress)}`);
// });

const downloadVideo = id => YD.download(id);

module.exports = {
    downloadVideo,
};