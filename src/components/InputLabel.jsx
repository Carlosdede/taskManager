const InputLabel = (props) => {
  return (
    <label className="mb-1 text-sm font-semibold text-[#35383E]" {...props}>
      {props.children}
    </label>
  );
};

export default InputLabel;
