import InputLabel from "./InputLabel";

const Input = ({ label, ...rest }) => {
  return (
    <div className="space-y- flex flex-col text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
    </div>
  );
};
export default Input;
