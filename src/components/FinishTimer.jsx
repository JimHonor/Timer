export default function FinishTimer({ isShow, onStopTimer, activeTimerName }) {
  return (
    <div
      className={
        "fixed bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center " +
        `${isShow ? "block" : "hidden"}`
      }
    >
      <div className="w-[300px] bg-white p-6 rounded text-center">
        <h2 className="text-xl mb-4">{activeTimerName}时间已结束！</h2>
        <button
          className="mx-2 w-40 py-1 rounded bg-[#efeeea] hover:bg-[#d9d7cd]"
          onClick={onStopTimer}
        >
          Stop Timer
        </button>
      </div>
    </div>
  );
}
