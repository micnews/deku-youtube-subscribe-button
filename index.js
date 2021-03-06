'use strict';
/** @jsx element */

import element from 'magic-virtual-element';
let buttonIndex = 0;

export function render ({ props }) {
  let fnName = '';
  let id = '';

  function setupCallbacks () {
    fnName = 'youtubeSubscribeButtonEvent' + buttonIndex;
    global[fnName] = function (payload) {
      if (payload.eventType === 'subscribe' && props.onSubscribe) {
        props.onSubscribe();
      }

      if (payload.eventType === 'unsubscribe' && props.onUnsubscribe) {
        props.onUnsubscribe();
      }
    };

    id = '__deku-yt-subscribe-wrapper-' + buttonIndex;
    buttonIndex++;
  }

  if (process.browser) {
    setupCallbacks();
  }

  return (
    <div id={id}>
      <div class='g-ytsubscribe' data-channelid={props['channel-id'] || 'Youtube'} data-layout='default' data-count='hidden' data-onytevent={fnName}></div>
    </div>
  );
}

export function afterMount (component, el) {
  if (!window.gapi || !window.gapi.ytsubscribe) {
    console.error('deku-youtube-subscribe-button: Please add <script src="https://apis.google.com/js/platform.js"></script> to your html (before deku-youtube-subscribe-button is run)');
    return;
  }
  window.gapi.ytsubscribe.go(el.id);
}

export default { render, afterMount };
