import styled from 'styled-components';

const Container = styled.select`
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 8px;
  border: 2px solid #f2f2f2;
  border-radius: 5px;
  background-color: ${props => (props.value !== '' ? '#ffff' : '#f2f2f2')};
  color: ${props => (props.value === '' ? '#757575' : '#000')};
  &:focus {
    background-color: #ffff;
  }
`;

type Props = {
  value: string,
  options: Array<string>,
  handleChange(val: string): void
};

export default class Dropdown extends React.Component<Props> {
  state = {
    value: ''
  };

  static getDerivedStateFromProps(props, state) {
    console.log(props, state);
    return {
      value: props.value
    };
  }

  render() {
    return (
      <Container
        value={this.state.value}
        onChange={e => this.props.handleChange(e.target.value)}
      >
        <option value="" disabled selected>
          eg., FILKOM
        </option>
        {this.props.options.map(val => (
          <option value={val}>{val}</option>
        ))}
      </Container>
    );
  }
}

Dropdown.defaultProps = {
  value: ''
};
