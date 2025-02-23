import { forwardRef } from "react";

const FileInput = forwardRef(({ onChange, ...props }, ref) => {
  return (
    <input
      type="file"
      ref={ref}
      className="hidden"
      onChange={onChange}
      {...props}
    />
  );
});

export default FileInput;
