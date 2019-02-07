const crypto = require('crypto');

module.exports = withGithubWebhook;

function withGithubWebhook(fn = (event, context, callback) => {}, { token }) {
    return (event, context, callback) => {
      const {
          'X-Hub-Signature': sig,
          'X-GitHub-Event': githubEvent,
          'X-GitHub-Delivery': id
        } = event.headers;
    
      const respond = (statusCode, body) => {
        console.log(statusCode, body);
        const headers = { 'Content-Type': 'application/json' };
        callback(null, { statusCode, headers, body });
      };
    
      if (typeof token !== 'string') {
        return respond(401, 'GITHUB_WEBHOOK_SECRET environment variable missing');
      }
    
      if (!sig) {
        return respond(401, 'X-Hub-Signature header not found');
      }
    
      if (!githubEvent) {
        return respond(422, 'X-Github-Event header not found');
      }
    
      if (!id) {
        return respond(401, 'X-Github-Delivery header not found');
      }
    
      if (sig !== sign(token, event.body)) {
        return respond(401, 'X-Hub-Signature header is incorrect');
      }
    
      console.log(`\nHey! Github ${githubEvent} event received\n`);

      fn(event, context, callback);
    };
  }
  
  function sign(key, body) {
    return `sha1=${crypto.createHmac('sha1', key).update(body, 'utf-8').digest('hex')}`;
  }
  
