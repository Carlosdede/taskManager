const InputLabel = (props) => {
  return (
    <label
      className="mb-1 text-sm font-semibold text-brand-dark-blue"
      {...props}
    >
      {props.children}
    </label>
  );
};

export default InputLabel;
