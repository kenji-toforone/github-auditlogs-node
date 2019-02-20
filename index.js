'use strict';

const crypto = require('crypto');

function signRequestBody(key, body) {
    return `sha1=${crypto.createHmac('sha1', key).update(body, 'utf-8').digest('hex')}`;
}

exports.handler = async (event) => {
    var errMsg;
    const token = process.env.GITHUB_WEBHOOK_SECRET;
    const headers = event.headers;
    const sig = headers['X-Hub-Signature'];
    const githubEvent = headers['X-GitHub-Event'];
    const id = headers['X-GitHub-Delivery'];
    const calculatedSig = signRequestBody(token, JSON.stringify(event.body));

    // Validate headers and Signature
    if (!sig) {
        errMsg = 'No X-Hub-Signature found on request';
        console.log(errMsg);
        return;
    }
    if (!githubEvent) {
        errMsg = 'No X-Github-Event found on request';
        console.log(errMsg);
        return;
    }
    if (!id) {
        errMsg = 'No X-Github-Delivery found on request';
        console.log(errMsg);
        return;
    }
    if (typeof token !== 'string') {
        errMsg = 'Must provide a \'GITHUB_WEBHOOK_SECRET\' env variable';
        console.log(errMsg);
        return;
    }
    if (sig !== calculatedSig) {
        errMsg = 'X-Hub-Signature incorrect. Github webhook token doesn\'t match';
        console.log(errMsg);
        return;
    }

    // Please change here
    // Depending on you, for example, can output to S3 or notify Slack.
    console.log(`Github-Event: "${githubEvent}" with body: "${event.body}"`);

    const response = { statusCode: 200, body: JSON.stringify({input: event}) };
    return response;
};


