'use strict';
/** @jsx element */

import element from 'magic-virtual-element';
let buttonIndex = 0;

export function render ({ props }) {
  var fn = 'youtubeSubscribeButtonEvent' + buttonIndex++;
  global[fn] = function (payload) {
    if (payload.eventType === 'subscribe' && props.onSubscribe) {
      props.onSubscribe();
    }

    if (payload.eventType === 'unsubscribe' && props.onUnsubscribe) {
      props.onUnsubscribe();
    }
  };

  return (
    <div class='g-ytsubscribe' data-channelid={props['channel-id'] || 'Youtube'} data-layout='default' data-count='hidden' data-onytevent={fn}></div>
  );
}

export default { render };
