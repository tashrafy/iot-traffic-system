import * as googleTTS from 'google-tts-api';
import fs from 'fs';
import { audio } from '../config/environment';

const audioTtsOptions = { lang: 'en', slow: false };
const warningUrl = googleTTS.getAudioUrl(audio.warningTts, audioTtsOptions);
const trackingUrl = googleTTS.getAudioUrl(audio.trackingTts, audioTtsOptions);
console.log({ warningUrl, trackingUrl }); // https://translate.google.com/translate_tts?...

googleTTS
  .getAudioBase64(audio.warningTts, audioTtsOptions)
  .then((warningBase64) => {
    const buffer = Buffer.from(warningBase64, 'base64');
    fs.writeFileSync('warning-traffic-english.mp3', buffer, { encoding: 'base64' });
  })
  .then(() =>
    googleTTS
      .getAudioBase64(audio.trackingTts, audioTtsOptions))
  .then((trackingBase64) => {
    const buffer = Buffer.from(trackingBase64, 'base64');
    fs.writeFileSync('tracking-traffic-english.mp3', buffer, { encoding: 'base64' });
  })
  .catch(console.error);
