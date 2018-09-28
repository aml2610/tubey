const YoutubeMp3Downloader = require('youtube-mp3-downloader');
const { ffmpegPath, outputPath } = require('./properties.json');

// Config
const YD = new YoutubeMp3Downloader({
    ffmpegPath,
    outputPath,
    youtubeVideoQuality: 'highest',
    queueParallelism: 100,
    progressTimeout: 2000,
});

YD.on('finished', (err, data) => {
    console.log(`Finished downloading video: ${data.videoTitle}`);
});

YD.on('error', (error) => {
    console.log(`Error downloading video: ${error}`);
});

YD.on('progress', (progress) => {
    console.log(`Progress for video: ${JSON.stringify(progress)}`);
});

const downloadVideo = id => YD.download(id);

module.exports = {
    downloadVideo,
};