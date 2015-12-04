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
  if (!window.gapi) {
    console.error('deku-youtube-subscribe-button: Please add <script src="https://apis.google.com/js/platform.js"></script> to your html (before deku-youtube-subscribe-button is run)');
    return;
  }
  window.gapi.ytsubscribe.go(el.id);
}

export default { render, afterMount };
