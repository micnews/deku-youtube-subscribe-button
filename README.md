# deku-youtube-subscribe-button

YouTube subscribe button for [deku](https://github.com/dekujs/deku). Docs https://developers.google.com/youtube/youtube_subscribe_button.

## Usage

```shell
npm install deku-youtube-subscribe-button
```

Requires youtube script added to the page:

```html
<script src="https://apis.google.com/js/platform.js"></script>
```

```js
import YoutubeSubscribeButton from 'deku-youtube-subscribe-button';

export function render () {
  return <YoutubeSubscribeButton channel-id='myChannelId' />;
}
```

### Attributes

#### channel-id
YouTube channel ID
