import React, { Fragment } from 'react'

import sound from './sample.mp3'

import {
	TogglePlay,
	// Play,
	// Pause,
	State,
	Mute,
	Progress,
	Restart,
	Back,
	Forward,
	Volume,
	// PlaybackRate
} from './AudioPlayer/controlls'
import AudioPlayer, { Consumer } from './AudioPlayer'

export default () => (
	<AudioPlayer autoplay source={sound} defaultVolume={0.5}>
		<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
			<Consumer>
				{({ ended, displayShelf, toggleShelf }) =>
					ended ? (
						<div style={{ display: 'flex' }}>
							<Restart />
						</div>
					) : (
						<Fragment>
							<div style={{ display: 'flex', flex: 1 }}>
								<TogglePlay />
							</div>
							<div style={{ display: 'flex', flex: 1 }}>
								{/* <Pause /> */}
								<Back />
								<Forward />
								<div style={{ display: 'flex' }} onMouseEnter={toggleShelf} onMouseLeave={toggleShelf}>
									<Mute />
									{displayShelf && <Volume />}
								</div>
							</div>
						</Fragment>
					)}
			</Consumer>
		</div>
		<Progress />
    <br />
    <br />
    <State />
	</AudioPlayer>
)
