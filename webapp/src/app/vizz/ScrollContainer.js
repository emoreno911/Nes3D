import React, { Component } from 'react';
import OverlayScrollbars from 'overlayscrollbars/js/OverlayScrollbars';
import 'overlayscrollbars/css/OverlayScrollbars.min.css';

class ScrollContainer extends Component {
	componentDidMount() {
		const element = this.scrollRef.getElementsByClassName('scroll-content')[0];
		const options = this.props.options || {};
		
		if (this.props.theme === 'thin')
			options.className = 'os-theme-thin-dark';
		
			this.scrollContainer = OverlayScrollbars(this.scrollRef, options);
	}
	scrollToBottom() {
		setTimeout(() => {
			this.scrollContainer.scroll({ y : "100%" }, 400);
		}, 200);
	}
  render() {
    return (
			<div ref={el => this.scrollRef = el} {...this.props} >
				<div className="scroll-content">
					{this.props.children}
				</div>
			</div>
    );
  }
}

export default ScrollContainer;