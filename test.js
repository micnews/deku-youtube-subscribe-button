/** @jsx element */

import test from 'tape';
import { renderString, render, tree } from 'deku';
import tsml from 'tsml';
import YoutubeSubscribeButton from './index';
import element from 'magic-virtual-element';

test('simple youtube button', function (t) {
  const html = renderString(tree(
    <YoutubeSubscribeButton channel-id='myChannelId' />
  ));

  if (process.browser) {
    t.equal(html, tsml`
      <div id="__deku-yt-subscribe-wrapper-0">
        <div class="g-ytsubscribe" data-channelid="myChannelId" data-layout="default" data-count="hidden" data-onytevent="youtubeSubscribeButtonEvent0"></div>
      </div>
    `);
    t.ok(global.youtubeSubscribeButtonEvent0);
  } else {
    t.equal(html, tsml`
      <div id="">
        <div class="g-ytsubscribe" data-channelid="myChannelId" data-layout="default" data-count="hidden" data-onytevent=""></div>
      </div>
    `);
    t.notOk(global.youtubeSubscribeButtonEvent0);
  }

  t.end();
});

if (process.browser) {
  test('youtube button + no youtube api', function (t) {
    t.plan(4);
    window.gapi = null;

    const originalError = console.error;
    console.error = msg => {
      console.error = originalError;
      t.is(msg, 'deku-youtube-subscribe-button: Please add ' +
        '<script src="https://apis.google.com/js/platform.js"></script>' +
        ' to your html (before deku-youtube-subscribe-button is run)');
    };

    const container = document.createElement('div');
    document.body.appendChild(container);

    const app = tree(<YoutubeSubscribeButton channel-id='myChannelId' />);
    render(app, container);

    const btn = container.querySelector('.g-ytsubscribe');
    t.is(btn.getAttribute('data-channelid'), 'myChannelId');
    t.is(btn.getAttribute('data-onytevent'), 'youtubeSubscribeButtonEvent1');
    t.is(container.children[0].id, '__deku-yt-subscribe-wrapper-1');
  });

  test('youtube button + callbacks', function (t) {
    t.plan(4);

    window.gapi = {
      ytsubscribe: {
        go (id) {
          t.is(id, '__deku-yt-subscribe-wrapper-2');
        }
      }
    };

    const container = document.createElement('div');
    document.body.appendChild(container);

    const app = tree(<YoutubeSubscribeButton channel-id='myChannelId' />);
    render(app, container);

    const btn = container.querySelector('.g-ytsubscribe');
    t.is(btn.getAttribute('data-channelid'), 'myChannelId');
    t.is(btn.getAttribute('data-onytevent'), 'youtubeSubscribeButtonEvent2');
    t.is(container.children[0].id, '__deku-yt-subscribe-wrapper-2');
  });
}
