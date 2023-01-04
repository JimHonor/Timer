import { useEffect, useState } from "react";
import FinishTimer from "./components/FinishTimer";
import Timer from "./components/Timer";

const sounds = [
  {
    name: "Tick tock clock timer",
    url: "https://assets.mixkit.co/sfx/preview/mixkit-tick-tock-clock-timer-1045.mp3",
  },
];

const audio = new Audio(sounds[0].url);

const App = () => {
  const timers = [
    // {
    //   name: "test",
    //   minute: 0,
    //   second: 3,
    // },
    {
      name: "泡面",
      minute: 5,
      second: 0,
    },
    {
      name: "工作",
      minute: 30,
      second: 0,
    },
    {
      name: "休息",
      minute: 20,
      second: 0,
    },
  ];

  const [activeTimerIndex, setActiveTimeIndex] = useState(0);

  const createInitialSeconds = () => {
    const activeTimer = timers[activeTimerIndex];
    return 60 * activeTimer.minute + activeTimer.second;
  };

  const [intervalId, setIntervalId] = useState(null);

  const [isShow, setIsShow] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [totalSeconds, setTotalSeconds] = useState(createInitialSeconds);

  // 根据计时场景，设置计时的初始时间
  useEffect(() => {
    setTotalSeconds(createInitialSeconds);
  }, [activeTimerIndex]);

  // 启动计时
  const onStartBtnClick = () => {
    setIsTimerRunning(true);

    const newIntervalId = setInterval(() => {
      setTotalSeconds((prev) => prev - 1);
    }, 1000);

    setIntervalId(newIntervalId);
  };

  // 计时结束
  useEffect(() => {
    if (intervalId !== null) {
      if (totalSeconds === 0) {
        clearInterval(intervalId);
        setIntervalId(null);
        setIsShow(true);
        audio.play();
      }
    }
  }, [totalSeconds, intervalId]);

  // 计时运行期间，重置计时器
  const resetTimer = () => {
    if (isTimerRunning) {
      clearInterval(intervalId);
      setTotalSeconds(createInitialSeconds);
      setIsTimerRunning(false);
    }
  };

  // 响铃时，关闭响铃、并重置计时器
  const onStopTimer = () => {
    audio.pause();
    setIsShow(false);
    resetTimer();
  };

  return (
    <div className="App h-screen flex justify-center items-center flex-col">
      <main className="flex justify-center items-center flex-col">
        <Timer totalSeconds={totalSeconds} />
        <div className="mb-8">
          {timers.map((timer, index) => (
            <button
              className={`mx-2 w-20 py-1 rounded ${
                activeTimerIndex === index ? "bg-[#d9d7cd]" : ""
              }`}
              disabled={isTimerRunning}
              key={timer.name}
              onClick={() => setActiveTimeIndex(index)}
            >
              {timer.name}
            </button>
          ))}
        </div>
        <div>
          <button
            disabled={isTimerRunning}
            className="mx-2 bg-[#008060] hover:bg-[#006e52] text-white w-20 py-1 rounded disabled:bg-[#0080609f] disabled:cursor-not-allowed"
            onClick={onStartBtnClick}
          >
            start
          </button>
          <button
            className="w-20 py-1 rounded border border-solid border-[#d9d7cd] hover:bg-[#efeeea]"
            onClick={() => resetTimer()}
          >
            reset
          </button>
        </div>
      </main>
      <FinishTimer
        isShow={isShow}
        activeTimerName={timers[activeTimerIndex].name}
        onStopTimer={onStopTimer}
      />
    </div>
  );
};

export default App;
