import React from 'react'

import AudioPlayer, { Play, Pause, State } from './AudioPlayer'

export default () => (
  <AudioPlayer>
    <h1>My Player</h1>
    <State />
    <Play />
    <Pause />
  </AudioPlayer>
)
