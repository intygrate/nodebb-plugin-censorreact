'use strict';

const meta = require.main.require('./src/meta');
const translator = require.main.require('./src/translator');
const controllers = require('./lib/controllers');
const async = require.main.require('async');
const request = require('request');

const textAPIUrl = 'https://dev.api.censorreact.intygrate.com/devv1/text';
const censorreact = {};

censorreact.init = (params, callback) => {
  const router = params.router;

  router.get(
    '/admin/plugins/censorreact',
    params.middleware.admin.buildHeader,
    controllers.renderAdminPage
  );
  router.get('/api/admin/plugins/censorreact', controllers.renderAdminPage);

  callback();
};

censorreact.adminMenu = (header, callback) => {
  header.plugins.push({
    route: '/plugins/censorreact',
    icon: 'fa-microphone-slash',
    name: 'censorREACT'
  });
  callback(null, header);
};

censorreact.api = (content, action = 'mask', callback) => {
  meta.settings.get('censorreact', (err, settings) => {
    if (settings.key && settings.key.length > 0) {
      const options = {
        uri: textAPIUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': settings.key
        },
        body: JSON.stringify({ text: content, profile: 'default' })
      };
      request(options, (err, response, body) => {
        if (response.statusCode !== 200) {
          // store error in db
          meta.settings.setOne(
            'censorreact',
            'alert',
            'error',
            (error, response) => {}
          );
          meta.settings.setOne(
            'censorreact',
            'message',
            body,
            (error, response) => {}
          );
          callback(null, content);
          return;
        }

        // remove error from db
        if (settings.alert && settings.alert === 'error') {
          meta.settings.setOne(
            'censorreact',
            'alert',
            '',
            (error, response) => {}
          );
          meta.settings.setOne(
            'censorreact',
            'message',
            '',
            (error, response) => {}
          );
        }

        const data = JSON.parse(body);

        if (action === 'mask') {
          content =
            data.data.masked && data.data.masked.length > 0
              ? data.data.masked
              : content;
        }
        if (action === 'block') {
          content =
            data.data.masked && data.data.masked.length > 0 ? null : content;
        }

        callback(null, content);
      });
    } else {
      callback(null, content);
    }
  });
};

censorreact.parsePost = (data, callback) => {
  if (!data || !data.post || !data.post.content) {
    return callback(null, data);
  }
  async.waterfall(
    [
      function(next) {
        censorreact.api(data.post.content, 'mask', next);
      },
      function(censordata, next) {
        data.post.content = censordata;
        next(null, data);
      }
    ],
    callback
  );
};

censorreact.parseSignature = (data, callback) => {
  if (!data || !data.userData || !data.userData.signature) {
    return callback(null, data);
  }
  async.waterfall(
    [
      function(next) {
        censorreact.api(data.userData.signature, 'mask', next);
      },
      function(censordata, next) {
        data.userData.signature = censordata;
        next(null, data);
      }
    ],
    callback
  );
};

censorreact.parseTopic = (data, callback) => {
  if (!data || !data.topic || !data.topic.title) {
    return callback(null, data);
  }

  async.waterfall(
    [
      function(next) {
        censorreact.api(data.topic.title, 'mask', next);
      },
      function(censordata, next) {
        data.topic.title = censordata;
        next(null, data);
      }
    ],
    callback
  );
};

censorreact.filterTags = (data, callback) => {
  async.waterfall(
    [
      function(next) {
        async.map(
          data.tags,
          function(tag, callback) {
            censorreact.api(tag, 'block', function(err, res) {
              if (err) return callback(err);
              callback(null, res);
            });
          },
          function(err, tags) {
            next(null, tags);
          }
        );
      },
      function(censordata, next) {
        var filteredCensoreddata = censordata.filter(function(el) {
          return el != null;
        });
        data.tags = filteredCensoreddata;
        next(null, data);
      }
    ],
    callback
  );
};

module.exports = censorreact;
