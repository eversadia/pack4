import React, {
  Component
} from "react"
import ReactDOM from "react-dom"

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <p>React here!</p>
    </div>
  )
}

export default App;

function asyncComponent( getComponent ) {

  return class AsyncComponent extends React.Component {

    constructor() {
      super()
      this.state = {}
      this.state.Component = null
    }

    componentWillMount() {
      if ( !this.state.Component ) {
        getComponent().then( Component => {
          AsyncComponent.Component = Component
          this.setState( {
            Component
          } )
        } )
      }
    }
    render() {
      const {
        Component
      } = this.state

      if ( Component ) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

const Foo = asyncComponent( () =>
  import ( './foo' ).then( module => module.default )
)
const Bar = asyncComponent( () =>
  import ( './bar' ).then( module => module.default )
)

const PreventingTransitionsExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Form</Link>
        </li>
        <li>
          <Link to="/one">One</Link>
        </li>
        <li>
          <Link to="/two">Two</Link>
        </li>
        <li>
          <Link to="/Foo">Foo</Link>
        </li>
         <li>
          <Link to="/Bar">Bar</Link>
        </li>
      </ul>
      <Route path="/" exact component={Form} />
      <Route path="/one" render={() => <h3>One</h3>} />
      <Route path="/two" render={() => <h3>Two</h3>} />
      <Route path="/Foo" component={ Foo } />
      <Route path="/Bar" component={ Bar } />
    </div>
  </Router>
);

class Form extends React.Component {
  constructor() {
    super()
    this.state = {}

    this.state.isBlocking = false

  }

  render() {
    const {
      isBlocking
    } = this.state;

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          event.target.reset();
          this.setState({
            isBlocking: false
          });
        }}
      >
        
        <p>
          Blocking?{" "}
          {isBlocking ? "Yes, click a link or the back button" : "Nope"}
        </p>

        <p>
          <input
            size="50"
            placeholder="type something to block transitions"
            onChange={event => {
              this.setState({
                isBlocking: event.target.value.length > 0
              });
            }}
          />
        </p>

        <p>
          <button>Submit to stop blocking</button>
        </p>
      </form>
    );
  }
}

ReactDOM.render( <PreventingTransitionsExample />, document.getElementById( "app" ) )