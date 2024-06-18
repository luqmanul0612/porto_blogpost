import React, { FC } from "react";
import "./radio-group.scss";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";

const RadioGroup: FC<RadioPropTypes> = (props) => {
  const { label, children, className, ...rest } = props;

  return (
    <RadixRadioGroup.Root
      className={clsx("RadioGroup-root", className)}
      {...rest}
    >
      <label>{label}</label>
      <div className="RadioGroup-content">{children}</div>
    </RadixRadioGroup.Root>
  );
};

export default RadioGroup;

RadioGroup.displayName = "RadioGroup";
type RadioPropTypes = RadixRadioGroup.RadioGroupProps & {
  label?: string;
};

RadioGroup.defaultProps = {};
