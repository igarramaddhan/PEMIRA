import React from 'react';
import styled from 'styled-components';
import { colors } from '../libs/metrics';

type ButtonProps = {
  backgroundColor?: string,
  hoverColor?: string,
  activeColor?: string,
  children: React.ReactNode,
  onClick(e): void
};

const Button = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Raleway', sans-serif;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-position: center;
  transition: background 0.8s;
  background-color: ${(props: any) =>
    props.backgroundColor ? props.backgroundColor : colors.blue};
  border: none;
  border-radius: 8px;

  &:hover {
    background: ${(props: any) =>
      props.hoverColor
        ? props.hoverColor +
          ' radial-gradient(circle, transparent 1%, ' +
          props.hoverColor +
          ' 1%) center/15000%'
        : colors.darkBlue +
          ' radial-gradient(circle, transparent 1%, ' +
          colors.darkBlue +
          ' 1%) center/15000%'};
  }

  &:disabled {
    background-color: ${colors.blue};
  }

  &:active {
    background-color: ${(props: any) =>
      props.activeColor ? props.activeColor : colors.blue};
    background-size: 100%;
    transition: background 0s;
  }
`;

export default (props: ButtonProps) => (
  <Button {...props}>{props.children}</Button>
);
