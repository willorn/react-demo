function MyCircle({ isPurple, textColor, size, rotate }) {
  const circleStyle = {
    height: `${size}px`,
    width: `${size}px`,
    lineHeight: `${size}px`,

    transform: `rotate(${rotate}deg)`,
  };
  return (
    <div
      className={`circle ${isPurple ? "purple" : ""} ${textColor}`}
      style={circleStyle}
    >
      Hi!
    </div>
  );
}

export default MyCircle;
