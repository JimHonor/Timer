export default function Timer({ totalSeconds }) {
  // 转换
  const transformer = (seconds) => {
    let mm = 0,
      ss = 0;

    ss = seconds % 60;

    if (seconds - ss !== 0) {
      mm = (seconds - ss) / 60;
    }

    return [mm, ss];
  };

  const [mm, ss] = transformer(totalSeconds);

  // 格式化
  const formattedMinute = `0${mm}`.slice(-2);
  const formattedSecond = `0${ss}`.slice(-2);

  return (
    <div className="mb-8">
      <span className="block text-6xl">
        {formattedMinute}:{formattedSecond}
      </span>
    </div>
  );
}
