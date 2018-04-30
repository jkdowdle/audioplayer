import React, { createContext, Component } from 'react'

export const { Consumer, Provider } = createContext()

export default class AudioPlayer extends Component {
	static defaultProps = {
		defaultVolume: 1,
		defaultPlaybackRate: 1,
		autoplay: false
	}

	state = {
		source: this.props.source,
		paused: !this.props.autoplay,
		volume: this.props.defaultVolume,
		playbackRate: this.props.defaultPlaybackRate,
		muted: false,
		ended: false,
		current: {
			time: 0,
			percent: '0%'
		},
		duration: '',
		skipInterval: this.props.skipInterval || 10,
		backInterval: this.props.backInterval || 0,
		forwardInterval: this.props.forwardInterval || 0,
		displayShelf: false,
		progressUpdating: false
	}

	determinePercent = (current, duration = this.state.duration) => `${current / duration * 100}%`

	handleMouseDownProgress = () => this.setState({ progressUpdating: true })
	handleMouseUpProgress = () => this.setState({ progressUpdating: false })
	handleClickProgress = event => {
		const { nativeEvent: { offsetX }, target: { offsetWidth} } = event
		// console.log('offsetX', offsetX)
		console.log('offset', offsetWidth)

		// this.audio.currentTime =
		this.skipToTime((offsetX / offsetWidth) * this.state.duration)
	}
	handleMouseMoveProgress = event => {
		console.log('hahahah')
		if (!this.state.progressUpdating) return {}


		const { nativeEvent: { offsetX }, target: { offsetWidth} } = event
		console.log('offsetX', offsetX)
		// console.log('offset', offsetWidth)

		// this.audio.currentTime =
		this.skipToTime((offsetX / offsetWidth) * this.state.duration)
	}

	toggleShelf = () => this.setState(({ displayShelf }) => ({ displayShelf: !displayShelf }))

	toggleMute = () => {
		this.setState(({ muted }) => ({ muted: !muted }))
	}

	play = async () => {
		const { audio } = this

		if (!audio.paused) return {}

		await audio.play()
	}

	pause = async () => {
		const { audio } = this

		if (audio.paused) return {}

		await audio.pause()
	}

	handleRangeChange = ({ target: { name, value } }) => (this.audio[name] = value)

	skipToTime = (time) => {
		this.audio.currentTime = time
		this.play()
	}

	goBack = () => {
		const { backInterval, skipInterval, current: { time } } = this.state
		this.skipToTime(backInterval ? backInterval + time : skipInterval * -1 + time)
	}

	goForward = () => {
		const { forwardInterval, skipInterval, current: { time } } = this.state
		this.skipToTime(forwardInterval ? forwardInterval + time : skipInterval + time)
	}

	restart = () => {
		this.setState({ ended: false }, () => {
			this.skipToTime(0)
			this.play()
		})
	}

	handleLoadedData = ({ target: audio }) => {
		this.audio = audio
		this.audio.volume = this.state.volume
		this.audio.playbackRate = this.state.playbackRate

		console.dir(audio)

		this.setState({
			current: {
				time: audio.currentTime,
				percent: this.determinePercent(audio.currentTime, audio.duration)
			},
			duration: audio.duration
		})
	}

	handleTimeUpdate = () => {
		this.setState(
			({ current }) => ({
				current: {
					...current,
					time: this.audio.currentTime,
					percent: this.determinePercent(this.audio.currentTime)
				}
			})
		)
	}

	handlePlaying = () => this.setState({ paused: false, ended: false })
	handlePlay = () => this.setState({ paused: false })
	handlePause = () => this.setState({ paused: true })
	handleEnded = () => this.setState({ paused: true, ended: true })
	handleVolumeChange = ({ target: { volume } }) => this.setState({ volume })
	handleRateChange = ({ target: { playbackRate } }) => this.setState({ playbackRate })

	render = () => (
		<Provider
			value={{
				...this.state,
				play: this.play,
				pause: this.pause,
				handleVolumeChange: this.handleRangeChange,
				handlePlaybackRate: this.handleRangeChange,
				goForward: this.goForward,
				goBack: this.goBack,
				restart: this.restart,
				toggleMute: this.toggleMute,
				toggleShelf: this.toggleShelf,
				handleMouseDownProgress: this.handleMouseDownProgress,
				handleMouseUpProgress: this.handleMouseUpProgress,
				handleClickProgress: this.handleClickProgress,
				handleMouseMoveProgress: this.handleMouseMoveProgress
			}}
		>
			<audio
				src={this.props.source}
				autoPlay={this.props.autoplay}
				muted={this.state.muted}

				onPlaying={this.handlePlaying}
				onLoadedData={this.handleLoadedData}
				onPlay={this.handlePlay}
				onTimeUpdate={this.handleTimeUpdate}
				onPause={this.handlePause}
				onEnded={this.handleEnded}
				onVolumeChange={this.handleVolumeChange}
				onRateChange={this.handleRateChange}
			/>
			{this.props.children}
		</Provider>
	)
}
