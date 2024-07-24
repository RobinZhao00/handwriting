import React, { useEffect, useState, useMemo, useRef } from 'react';

const BUTTONS = [{ label: '开始', value: 'start' }, { label: '暂停', value: 'pause' }, {
  label: '重置',
  value: 'reset',
}, { label: '停止', value: 'stop' }];

function useTimer(count, onEnd) {
  const [countDown, setCountDown] = useState(count);
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalId = useRef(null);
  useEffect(() => {
    // let intervalId;

    if (isActive && !isPaused) {
      intervalId.current = setInterval(() => {
        if (countDown > 0) {
          setCountDown(countDown - 1);
        } else {
          clearInterval(intervalId.current);
          onEnd && onEnd();
        }
      }, 1000);
    }
    return () => clearInterval(intervalId.current);
  }, [isActive, isPaused, countDown, onEnd, count]);
  const start = () => {
    if (countDown === 0) {
      setCountDown(count);
    }
    setIsActive(true);
    setIsPaused(false);
  };

  const reset = () => {
    setCountDown(count);
    setIsActive(true);
    setIsPaused(false);
  };

  const stop = () => {
    setIsActive(false);
    setIsPaused(false);
    setCountDown(0);
  };

  const pause = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      setIsActive(true);
    }
  };

  return {
    countDown, actions: {
      start, reset, stop, pause,
    },
  };
}


const Counter = ({ count, onEnd, children }) => {
  const { countDown, actions } = useTimer(count, onEnd);
  const countDownText = useMemo(() => countDown > 9 ? countDown : `0${countDown}`,[countDown])
  return (
    <div className="timer-conatiner">
      <div className="text">{countDownText}</div>
      <div className="btn-container">
        {BUTTONS.map(btn => <div
          className={`btn btn-${btn.value}`}
          key={btn.value}
          onClick={() => actions[btn.value]()}
        >{btn.label}</div>)}
        { children }
      </div>
    </div>
  );
};

export default Counter;
