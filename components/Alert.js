import styled, { keyframes } from 'styled-components';
import { colors } from '../libs/metrics';

type Props = {
  title: string,
  content: any,
  footer: any,
  visible: boolean,
  onClose(): void
};

export const Alert = ({ title, content, footer, visible, onClose }: Props) => (
  <Modal visible={visible}>
    <div className="alert-content">
      <div className="alert-header">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{title}</h2>
      </div>
      <div className="alert-body">{content && content()}</div>
      <div className="alert-footer">{footer && footer()}</div>
    </div>
  </Modal>
);

const EnterAnimation = keyframes`
		from {transform: scale(0); opacity: 0}
    to {transform: scale(1); top: 0; opacity: 1}
`;

const Modal = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);

  .alert-content {
    position: relative;
    background-color: #fefefe;
    margin: 15% auto;
    border-radius: 5px;
    width: 30%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    animation-name: ${EnterAnimation};
    animation-duration: 0.4s;
    @media screen and (max-width 425px) {
      width: 80%;
    }
  }

  .alert-header {
    padding: 2px 16px;
    background-color: ${colors.blue};
    color: white;
    border-radius: 5px 5px 0 0;
  }

  /* Modal Body */
  .alert-body {
    padding: 2px 16px;
  }

  /* Modal Footer */
  .alert-footer {
    padding: 2px 16px;
    color: black;
  }

  .close {
    color: #fff;
    float: right;
    font-size: 56px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: ${colors.orange};
    text-decoration: none;
    cursor: pointer;
  }
`;
