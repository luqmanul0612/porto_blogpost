import React, { FC } from "react";
import "./radio.scss";
import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";

const Radio: FC<RadioPropTypes> = (props) => {
  const { value, label, className, id } = props;

  return (
    <div className={clsx("Radio-root", className)}>
      <RadioGroup.Item className="RadioItem" value={value} id={id}>
        <RadioGroup.Indicator className="RadioIndicator" />
      </RadioGroup.Item>
      <label
        className="RadioLabel"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Radio;

Radio.displayName = "Radio";
type RadioPropTypes = {
  className?: string;
  label: string;
  value: string;
  id: string;
};

Radio.defaultProps = {};
