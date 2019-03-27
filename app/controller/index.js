const ipc = require('electron-better-ipc');

const SnippetController = require('./SnippetController');

exports.registerControllers = function () {
  [].concat(
    SnippetController.channels
  ).forEach(channel => {
    ipc.answerRenderer(channel.name, channel.handler);
  });
}
