export const Slider = ({ value, max, step, onValueChange, className }) => {
  return (
    <input
      type="range"
      value={value}
      max={max}
      step={step}
      onChange={(e) => onValueChange([e.target.value])}
      className={className}
    />
  );
};