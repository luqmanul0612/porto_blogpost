import * as React from "react";
import { useCallbackRef } from "../use-callback-ref";

type UseControllableStateParams<T> = {
  value?: T | undefined;
  defaultValue?: T | undefined;
  onChange?: (state: T) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

function useControllableState<T>({
  value: propValue,
  defaultValue,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [uncontrolledState, setUncontrolledState] = useUncontrolledState({
    defaultValue,
    onChange,
  });
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : uncontrolledState;
  const handleChange = useCallbackRef(onChange);

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
    React.useCallback(
      (nextValue) => {
        if (isControlled) {
          const setter = nextValue as SetStateFn<T>;
          const value =
            typeof nextValue === "function" ? setter(propValue) : nextValue;
          if (value !== propValue) handleChange(value as T);
        } else {
          setUncontrolledState(nextValue);
        }
      },
      [isControlled, propValue, setUncontrolledState, handleChange]
    );

  return [value, setValue] as const;
}

function useUncontrolledState<T>({
  defaultValue,
  onChange,
}: Omit<UseControllableStateParams<T>, "value">) {
  const uncontrolledState = React.useState<T | undefined>(defaultValue);
  const [value] = uncontrolledState;
  const prevValueRef = React.useRef(value);
  const handleChange = useCallbackRef(onChange);

  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);

  return uncontrolledState;
}

export { useControllableState };
