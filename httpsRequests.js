const { request } = require('https');

const methods = {
    GET: 'GET',
};
const port = 443;

const makeRequest = (host, path, method) => {
    return new Promise((resolve, reject) => {
        let responseBody;

        const options = {
            host,
            path,
            port,
            method,
        };

        const rq = request(options, (response) => {
            // console.log(JSON.stringify(response.headers));
            if (response.statusCode != '200') {
                reject(`Response other than 200: ${response.statusCode}`);
            }

            response.setEncoding('utf8');

            response.on('data', (chunk) => {
                responseBody += chunk;
            });

            response.on('end', () => {
                // console.log('Response ended');
                resolve(responseBody);
            });
        });

        rq.on('error', (err) => {
            reject(`Problem with request: ${JSON.stringify(err)}`);
        });

        rq.end();
    });
};

module.exports = {
    methods,
    makeRequest,
};
