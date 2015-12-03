'use strict';
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
    <div class="g-ytsubscribe" data-channelid="myChannelId" data-layout="default" data-count="hidden" data-onytevent="youtubeSubscribeButtonEvent0"></div>
  `);

  t.end();
});
