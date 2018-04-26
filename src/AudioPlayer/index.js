import React, { Component, createContext } from 'react'

const { Consumer, Provider } = createContext()

export default class AudioPlayer extends Component {
  state = { playing: this.props.autoplay || false, source: this.props.source }

  togglePlay = () => this.setState(({ playing }) => ({ playing: !playing }))

  render = () => (
    <Provider value={{ ...this.state, togglePlay: this.togglePlay }}>
      <audio ref={node => this.elAudio = node}></audio>
      {console.dir(this.elAudio)}
      {this.props.children}
    </Provider>
  )
}

export const Play = () => (
<Consumer>
  {({ playing, togglePlay }) => <button onClick={playing ? togglePlay : () => {}}>Play</button>}
</Consumer>
)

export const Pause = () => (
  <Consumer>
    {({ playing, togglePlay }) => <button onClick={!playing ? togglePlay : () => {}}>Pause</button>}
  </Consumer>
)

export const State = () => (
  <Consumer>
    {({ playing }) => <p>{playing ? 'playing' : 'paused'}</p>}
  </Consumer>
)
