'use strict';

const meta = require.main.require('./src/meta');
const Controllers = {};

Controllers.renderAdminPage = function(req, res) {
  meta.settings.get('censorreact', (err, settings) => {
    settings.hasKey = settings.key && settings.key.length > 0;
    res.render('admin/plugins/censorreact', { settings });
  });
};

module.exports = Controllers;
