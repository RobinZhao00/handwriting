import React from 'react'
import ReactDOM, { unstable_renderSubtreeIntoContainer } from 'react-dom'

// 1. 属性代理(Props Proxy)
// 2. 反向继承(Inheritance Inversion)


class HelloWord extends React.Component {
  render() {
    const { name } = this.props
    return (
      <div className={`container ${name ? 'container-' + name : ''}`}>
        hello
      </div>
    )
  }
}

const WrappedWithName = (Component, customProps) => class extends React.Component {
  render() {
    return <Component {...customProps} {...this.props}/>
  }
}

const TestHello = WrappedWithName(HelloWord, { name: 'test' })

class App extends React.Component {
  state = {}

  handleClick = () => {
    this.setState({
      test: 'test',
    })
  }

  render() {
    // return (
    //   <div className='app-container'>
    //     <button onClick={this.handleClick}>change name</button>
    //     <TestHello {...this.state}/>
    //   </div>
    // )

    return (
      // <div className='container'>
      //   <div className='title'>😁</div>
      //   {
      //     super.render()
      //   }
      //   <div/>
      <div className="container">
        <div className="title">😁</div>
        {
          super.render()
        }
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
)
