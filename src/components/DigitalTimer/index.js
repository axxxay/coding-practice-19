import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
    incrementMinutes: 25,
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => {
      if (prevState.timerLimitInMinutes <= 0) {
        console.log('zero')
        this.clearTimerInterval()
        return {timeElapsedInSeconds: 0, isTimerRunning: false}
      }

      if (
        prevState.timeElapsedInSeconds > 0 &&
        prevState.timeElapsedInSeconds <= 59 &&
        prevState.timerLimitInMinutes !== 1
      ) {
        return {timeElapsedInSeconds: prevState.timeElapsedInSeconds - 1}
      }

      return {
        timeElapsedInSeconds: 59,
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }
    })
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
      incrementMinutes,
    } = this.state
    // 4. Destructuring the isTimerRunning, timeElapsedInSeconds & timerLimitInMinutes from state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60 // 5. Check whether the timer is completed or not and the result will be assigned to the isTimerCompleted.

    if (timerLimitInMinutes === 0) {
      this.setState({timerLimitInMinutes: incrementMinutes})
    }

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})

      // 6. If the timer is completed(isTimerCompleted is true)//6.1. set the state variable timeElapsedInSeconds to zero.
    }
    if (isTimerRunning) {
      this.clearTimerInterval()

      // 7. If the timer is running(isTimerRunning is true)//7.1 clear the timer interval
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 10)

      // 8. if the timer is not running(isTimerRunning is false)//8.1 set the interval
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
    // 9. Toggling the state isTimerRunning based on the previous state
  }

  onResetTimer = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: 25,
      timeElapsedInSeconds: 0,
      isTimerRunning: false,
      incrementMinutes: 25,
    }))
    this.clearTimerInterval()
  }

  onIncrementTimerMinutes = () => {
    const {timerLimitInMinutes, incrementMinutes} = this.state
    if (timerLimitInMinutes === incrementMinutes) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.incrementMinutes + 1,
        incrementMinutes: prevState.incrementMinutes + 1,
      }))
    }
  }

  onDecrementTimerMinutes = () => {
    const {timerLimitInMinutes, incrementMinutes} = this.state
    if (
      (timerLimitInMinutes > 0 && timerLimitInMinutes === incrementMinutes) ||
      timerLimitInMinutes === 0
    ) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.incrementMinutes - 1,
        incrementMinutes: prevState.incrementMinutes - 1,
      }))
    }
  }

  render() {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
      incrementMinutes,
    } = this.state
    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer">
            <div className="timer-bg">
              <h1 className="time">
                {timerLimitInMinutes < 10
                  ? `0${timerLimitInMinutes}`
                  : timerLimitInMinutes}
                :
                {timeElapsedInSeconds < 10
                  ? `0${timeElapsedInSeconds}`
                  : timeElapsedInSeconds}
              </h1>
              <p className="time-text">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-set-container">
            <div className="play-reset-con">
              <button
                type="button"
                className="play-reset-items"
                onClick={this.onStartOrPauseTimer}
              >
                <img
                  src={
                    isTimerRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={isTimerRunning ? 'pause icon' : 'play icon'}
                  className="play-and-reset-img"
                />
                <p className="play-and-reset-text">
                  {isTimerRunning ? 'Pause' : 'Start'}
                </p>
              </button>
              <button
                type="button"
                className="play-reset-items"
                onClick={this.onResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="play-and-reset-img"
                />
                <p className="play-and-reset-text">Reset</p>
              </button>
            </div>
            <p className="set-time-text">Set Timer limit</p>
            <div className="set-timer-con">
              <button
                type="button"
                className="timer-btn"
                onClick={this.onDecrementTimerMinutes}
              >
                -
              </button>
              <p className="timer-text">{incrementMinutes}</p>
              <button
                type="button"
                className="timer-btn"
                onClick={this.onIncrementTimerMinutes}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
