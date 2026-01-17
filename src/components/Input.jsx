import { forwardRef } from "react";
import InputLabel from "./InputLabel";
import InputsErrorMessages from "./InputsErrorMessages";
import PropTypes from "prop-types";

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="space-y- flex flex-col text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        ref={ref}
        {...rest}
      />
      {errorMessage && (
        <InputsErrorMessages>{errorMessage}</InputsErrorMessages>
      )}
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
};
Input.displayName = "Input";
export default Input;
