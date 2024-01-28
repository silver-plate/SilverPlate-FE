import { forwardRef, InputHTMLAttributes, useRef, FocusEvent } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  imgIcon?: React.ReactNode;
}

const BaseInput = styled.input<InputProps>`
  background-color: #f5f5f5;
  border: none;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 3rem;
  padding-left: 2.5rem;
  width: 14.375rem;
  height: ${(props) => props.height ?? 'auto'};
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const IconWrapper = styled.i`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  overflow: hidden;
`;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (inputRef.current && props.onClick) {
      inputRef.current.focus();
      props.onClick(e);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  return (
    <Wrapper>
      {props.imgIcon && <IconWrapper>{props.imgIcon}</IconWrapper>}
      <BaseInput
        {...props}
        ref={inputRef}
        onClick={handleClick}
        onBlur={handleBlur}
        height={props.height}
      />
    </Wrapper>
  );
});

export default Input;

Input.displayName = 'Input';
