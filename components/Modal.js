import styled, { keyframes } from 'styled-components';
import { colors } from '../libs/metrics';

type Props = {
  title: string,
  content: any,
  footer: any,
  visible: boolean,
  onClose(): void
};

export default ({ title, content, footer, visible, onClose }: Props) => (
  <Modal visible={visible}>
    <div className="modal-content">
      <div className="modal-header">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{title}</h2>
      </div>
      <div className="modal-body">{content && content()}</div>
      <div className="modal-footer">{footer && footer()}</div>
    </div>
  </Modal>
);

const EnterAnimation = keyframes`
		from {transform: scale(0); opacity: 0}
    to {transform: scale(1); top: 0; opacity: 1}
`;

const Modal = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);

  .modal-content {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #fefefe;
    margin: auto;
    border-radius: 5px;
    width: 80%;
    height: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    animation-name: ${EnterAnimation};
    animation-duration: 0.4s;
  }

  .modal-header {
    padding: 2px 16px;
    color: #000;
    border-radius: 5px 5px 0 0;
  }

  /* Modal Body */
  .modal-body {
    flex: 1;
    padding: 2px 16px;
  }

  /* Modal Footer */
  .modal-footer {
    padding: 2px 16px;
    color: black;
  }

  .close {
    color: #000;
    float: right;
    font-size: 56px;
    font-weight: bold;
    margin-right: 16px;
  }

  .close:hover,
  .close:focus {
    color: ${colors.orange};
    text-decoration: none;
    cursor: pointer;
  }
`;
