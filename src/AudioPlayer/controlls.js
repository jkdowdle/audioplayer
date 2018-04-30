import React from 'react'

import * as S from './styled'
import * as Icon from './styled/svgs'
import { Consumer } from './index'

export const Play = () => (
	<Consumer>
		{({ paused, play }) => (
			<Icon.Play onClick={play} disabled={!paused}>
				Play
			</Icon.Play>
		)}
	</Consumer>
)

export const Pause = () => (
	<Consumer>
		{({ paused, pause }) => (
			<Icon.Pause onClick={pause} disabled={paused}>
				Pause
			</Icon.Pause>
		)}
	</Consumer>
)

export const TogglePlay = () => <Consumer>{({ paused }) => (paused ? <Play /> : <Pause />)}</Consumer>

export const Mute = () => (
	<Consumer>
		{({ muted, toggleMute }) => {
      const Component = muted ? Icon.Unmute : Icon.Mute

			return <Component onClick={toggleMute}>{muted ? 'Unute' : 'Mute'}</Component>
		}}
	</Consumer>
)
// onClick={handleClickProgress}
export const Progress = () => (
	<Consumer>
		{({ current: { percent }, handleMouseDownProgress, onMouseMoveProgress, handleMouseUpProgress, handleClickProgress }) => (
			<S.ProgressContainer  onMouseMove={onMouseMoveProgress} onMouseDown={handleMouseDownProgress} onMouseUp={handleMouseUpProgress}>
				<S.Progress percent={percent} />
			</S.ProgressContainer>
		)}
	</Consumer>
)

export const Restart = () => (
	<Consumer>{({ ended, restart }) => ended && <Icon.Replay onClick={restart}>Restart</Icon.Replay>}</Consumer>
)

export const Back = () => (
	<Consumer>
		{({ goBack, current: { percent } }) => (
			<Icon.StepBackward onClick={goBack} disabled={percent === '0%'}>
				{'<-'}
			</Icon.StepBackward>
		)}
	</Consumer>
)

export const Forward = () => (
	<Consumer>
		{({ goForward, current: { percent } }) => (
			<Icon.StepForward onClick={goForward} disabled={percent === '100%'}>
				{'->'}
			</Icon.StepForward>
		)}
	</Consumer>
)

export const Volume = () => (
	<Consumer>
		{({ volume, handleVolumeChange }) => (
			<input
				name="volume"
				type="range"
				className="player__slider"
				min="0"
				max="1"
				step="0.05"
				value={volume}
				onChange={handleVolumeChange}
			/>
		)}
	</Consumer>
)

export const PlaybackRate = () => (
	<Consumer>
		{({ playbackRate, handlePlaybackRate }) => (

			<input
				className="player__slider"
				name="playbackRate"
				type="range"
				min="0.5"
				max="2"
				step="0.5"
				value={playbackRate}
				onChange={handlePlaybackRate}
			/>

		)}
	</Consumer>
)

export const State = () => <Consumer>{(context) => <pre>{JSON.stringify(context, null, 2)}</pre>}</Consumer>
