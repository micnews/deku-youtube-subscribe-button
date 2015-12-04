'use strict';
/** @jsx element */

import element from 'magic-virtual-element';
let buttonIndex = 0;

export function render ({ props }) {
  const fn = 'youtubeSubscribeButtonEvent' + buttonIndex;
  global[fn] = function (payload) {
    if (payload.eventType === 'subscribe' && props.onSubscribe) {
      props.onSubscribe();
    }

    if (payload.eventType === 'unsubscribe' && props.onUnsubscribe) {
      props.onUnsubscribe();
    }
  };

  const id = '__deku-yt-subscribe-wrapper-' + buttonIndex;
  buttonIndex++;
  return (
    <div id={id}>
      <div class='g-ytsubscribe' data-channelid={props['channel-id'] || 'Youtube'} data-layout='default' data-count='hidden' data-onytevent={fn}></div>
    </div>
  );
}

export function afterMount (component, el) {
  window.gapi.ytsubscribe.go(el.id);
}

export default { render, afterMount };
