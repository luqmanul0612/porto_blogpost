import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useRef,
} from "react";
import clsx from "clsx";
import "./textfield.scss";
import { useMergeRefs } from "@/utils/hooks/use-merge-ref";
import { Eye, EyeOff, X } from "lucide-react";

const TextField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & TextFieldPropTypes
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mergeRef = useMergeRefs(inputRef, ref);
  const [inputType, setInputType] = React.useState<
    HTMLInputTypeAttribute | undefined
  >(props.type);
  const {
    error,
    helperText,
    label,
    className,
    startIcon,
    endIcon,
    size,
    type,
    ...rest
  } = props;

  const onClickClear = () => {
    const nativeInputValueSetter = Object?.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    );
    nativeInputValueSetter?.set?.call(inputRef.current, "");
    const inputEvent = new Event("input", { bubbles: true });
    inputRef.current?.dispatchEvent(inputEvent);
  };

  const passwordIcon =
    inputType === "password" ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} stroke="#64748b" />
    );

  const showEndIcon = type === "password" || !!endIcon;

  const onChangeInputPassword = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div
      className={clsx("TextField-root", className, {
        error: !!props.error,
        disabled: props.disabled,
      })}
    >
      {!!label && <label htmlFor={props.id}>{label}</label>}
      <div className="TextField-input-wrapper">
        {!!startIcon && <div className="start-icon">{startIcon}</div>}
        {showEndIcon && (
          <div className="end-icon">
            {type === "password" ? (
              <button
                className="password-toggle"
                type="button"
                onClick={onChangeInputPassword}
                disabled={props.disabled}
              >
                {passwordIcon}
              </button>
            ) : (
              endIcon
            )}
          </div>
        )}
        <input
          ref={mergeRef}
          className={clsx({
            error: !!props.error,
          })}
          {...rest}
          type={type === "password" ? inputType : type}
        />
        <button
          type="button"
          className="close-icon"
          onClick={onClickClear}
          disabled={props.disabled}
        >
          <X size={13} strokeWidth={2} />
        </button>
      </div>
      {!!helperText && <p className="helpertext">{helperText}</p>}
    </div>
  );
});

export default TextField;

TextField.displayName = "TextField";
type TextFieldPropTypes = {
  label?: string;
  error?: boolean;
  helperText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

TextField.defaultProps = {
  error: false,
  className: "",
  type: "text",
};
