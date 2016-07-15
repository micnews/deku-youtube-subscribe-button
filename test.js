/** @jsx element */

import test from 'tape';
import { renderString, tree } from 'deku';
import tsml from 'tsml';
import YoutubeSubscribeButton from './index';
import element from 'magic-virtual-element';

test('simple youtube button', function (t) {
  const html = renderString(tree(
    <YoutubeSubscribeButton channel-id='myChannelId' />
  ));

  t.equal(html, tsml`
    <div id="__deku-yt-subscribe-wrapper-0">
      <div class="g-ytsubscribe" data-channelid="myChannelId" data-layout="default" data-count="hidden" data-onytevent="youtubeSubscribeButtonEvent0"></div>
    </div>
  `);

  t.end();
});

test('YoutubeSubscribeButton#afterMount', function (t) {
  function _afterMount () {
    return YoutubeSubscribeButton.afterMount({}, {});
  }

  GLOBAL.window = {};
  t.equal(_afterMount(),
    undefined,
    'returns undefined if window.gapi is not present');

  GLOBAL.window.gapi = {};
  t.equal(_afterMount(),
    undefined,
    'returns undefined if window.gapi.ytsubscribe is not present');

  let calledGo = false;
  GLOBAL.window.gapi.ytsubscribe = {
    go: function () {
      calledGo = true;
    }
  };
  _afterMount();

  t.ok(calledGo,
    'calls #go on ytsubcribe when present');

  t.end();
});
