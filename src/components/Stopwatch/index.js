import React, { Component } from 'react';
import './index.css';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
    };
    this.timeInterval = null; // Initialize timeInterval
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval); // Clear interval on unmount
  }

  onResetTimer = () => {
    clearInterval(this.timeInterval);
    this.setState({ isTimerRunning: false, timeElapsedInSeconds: 0 });
  };

  onStopTimer = () => {
    clearInterval(this.timeInterval);
    this.setState({ isTimerRunning: false });
  };

  updateTime = () => {
    this.setState((prevState) => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }));
  };

  onStartTimer = () => {
    this.timeInterval = setInterval(this.updateTime, 1000);
    this.setState({ isTimerRunning: true });
  };

  renderSeconds = () => {
    const { timeElapsedInSeconds } = this.state;
    const seconds = Math.floor(timeElapsedInSeconds % 60);
    return seconds < 10 ? `0${seconds}` : seconds;
  };

  renderMinutes = () => {
    const { timeElapsedInSeconds } = this.state;
    const minutes = Math.floor(timeElapsedInSeconds / 60);
    return minutes < 10 ? `0${minutes}` : minutes;
  };

  render() {
    const { isTimerRunning } = this.state;

    return (
      <div>
        <h1>Stopwatch</h1>
        <div className="stopwatch-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
            alt="stopwatch"
          />
          <h1>{`${this.renderMinutes()}:${this.renderSeconds()}`}</h1>
          <div>
            {!isTimerRunning ? (
              <button type="button" onClick={this.onStartTimer}>
                Start
              </button>
            ) : (
              <button type="button" onClick={this.onStopTimer}>
                Stop
              </button>
            )}
            <button type="button" onClick={this.onResetTimer}>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
