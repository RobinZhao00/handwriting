import React from 'react';
import ReactDOM from 'react-dom';

const memo = (Component, areEqual) => class extends React.Component {

  shouldComponentUpdate(nextProps) {
    return !areEqual(this.props, nextProps)
  }

  render() {
    console.log(this.props);
    return <Component text = {this.props.text} />
  }
}

class Hello extends React.Component {
  render() {
    console.log('update');
    return (
      <div className="container">{this.props.text}</div>
    )
  }
}

React.myMemo = memo;
const MemoHello = React.myMemo(Hello, (prevProps, nextProps) => prevProps.text === nextProps.text)
console.log('React', React);

class App extends React.Component {
  state = {
    text: 'hello',
    other: 'other'
  }

  handleClick = (type) => {
    this.setState({
      [type]: this.state[type] + 1,
    })
  }
  render() {
    const { text } = this.state
    return (
      <div className="container">
        <button onClick={() => this.handleClick('text')}>change text</button>
        <button onClick={() => this.handleClick('other')}>change other</button>
        <MemoHello text={text}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

