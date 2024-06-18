import React from "react";
import "./button.scss";
import clsx from "clsx";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonPropTypes
>((props, ref) => {
  const { className, startIcon, endIcon, variant, size, color, ...rest } =
    props;
  return (
    <button
      {...rest}
      ref={ref}
      className={clsx(
        "Button-root",
        {
          solid: variant === "solid",
          soft: variant === "soft",
          outline: variant === "outline",
          surface: variant === "surface",
          "size-default": size === "default",
          "size-small": size === "small",
        },
        className
      )}
    >
      {!!startIcon && <div className="Button-start-icon">{startIcon}</div>}
      {props.children}
      {!!endIcon && <div className="Button-end-icon">{endIcon}</div>}
    </button>
  );
});

export default Button;

Button.displayName = "Button";

type ButtonPropTypes = {
  variant?: "solid" | "surface" | "outline" | "soft";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: string;
};

Button.defaultProps = {
  type: "button",
  size: "default",
  onClick: () => {},
  className: "",
  startIcon: undefined,
  endIcon: undefined,
  variant: "solid",
  color: "primary",
};
