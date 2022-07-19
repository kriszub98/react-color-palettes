import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';
import { Link } from 'react-router-dom';

class ColorBox extends Component {
	constructor(props) {
		super(props);
		this.state = { isCopied: false };
		this.changeCopyState = this.changeCopyState.bind(this);
	}

	changeCopyState() {
		this.setState({ isCopied: true }, () => {
			setTimeout(() => this.setState({ isCopied: false }), 1500);
		});
	}

	render() {
		const { id, name, background, paletteId } = this.props;
		const { isCopied } = this.state;
		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div style={{ background }} className="ColorBox">
					<div style={{ background }} className={`copy-overlay ${isCopied && 'show'}`} />

					<div className={`copy-msg ${isCopied && 'show'}`}>
						<h1>copied!</h1>
						<p>{background}</p>
					</div>

					<div className="copy-container">
						<div className="box-content">
							<span>{name}</span>
						</div>

						<button className="copy-button">Copy</button>
					</div>

					<Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
						<span className="see-more">More</span>
					</Link>
				</div>
			</CopyToClipboard>
		);
	}
}

export default ColorBox;
