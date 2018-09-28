const { downloadVideos } = require('./playlistMp3Downloader');

const main = async () => {
    if (process.argv.length !== 3) {
        console.log('Example usage: node index.js https://www.youtube.com/playlist?list=PLg7Fb71wbhKIiE7_2O55vJdKJkZgG0N6G');
        process.exit(1);
    }

    const playlistUrl = process.argv[2];
    console.log(`Will start downloading videos from playlist ${playlistUrl}`);

    await downloadVideos(playlistUrl);
};

main();