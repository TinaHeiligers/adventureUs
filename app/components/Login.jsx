import React from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'

// Do external logins in Login

// If you want to request additional permissions, you'd do it
// like so:
//
// google.addScope('https://www.googleapis.com/auth/plus.login')
//
// What kind of permissions can you ask for? There's a lot:
//   https://developers.google.com/identity/protocols/googlescopes
//
// For instance, this line will request the ability to read, send,
// and generally manage a user's email:
//
// google.addScope('https://mail.google.com/')

export default class extends React.Component {
  constructor(props) {
    super(props)
    console.log('FROM CONSTRUCTOR', this.state.routes.auth)
    this.state = {
      email: '',
      password: '',
      user: null
    }
  }
  componentDidMount() {
    const auth = this.props.route.auth
    this.unsubscribe = auth && auth.onAuthStateChanged(user => this.setState({user}))
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  setEmailPassword = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    // what we actually want to do is redirect to the dashboard view
    console.log('HERE IN LOGIN', this.props.route.auth.signInWithEmailAndPassword)
    if (this.state.email.length && this.state.password.length) {
      this.props.route.auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        // Should we have a pop-up to collect extra information such as zipcode, name
        .then(() => browserHistory.push('/dashboard'))
        .catch(error => {
          window.alert(error)
        })
    } else {
      window.alert('Please fill in both your email and password')
    }
  }

  // signInWithPopup will try to open a login popup, and if it's blocked, it'll
  // redirect. If you prefer, you can signInWithRedirect, which always
  // redirects.

  render() {
    // const auth = this.props.route.auth
    const auth = firebase.auth()

    const google = new firebase.auth.GoogleAuthProvider()
    const facebook = new firebase.auth.FacebookAuthProvider()
    const email = new firebase.auth.EmailAuthProvider()
    console.log('PROPS from login', this.props)

    return (
      <div className="jumbotron">
        <form onSubmit={this.onSubmit} className="form-horizontal">
          <legend className="col-lg-12" >Login with your email & password</legend>
          <div className="form-group">
            <label htmlFor="inputEmail" className="col-lg-2 control-label">Email</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="email" placeholder="Email" onChange={this.setEmailPassword} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword" className="col-lg-2 control-label">Password</label>
            <div className="col-lg-10">
              <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.setEmailPassword} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
        <div>
          <div>
            <button className='google login btn btn-primary'
              onClick={() => {
                auth.signInWithPopup(google)
                  .then(() => browserHistory.push('/dashboard'))
              }}>Login with Google</button>
          </div>
          <br />
          <div>
            <button className='facebook login btn btn-primary'
              onClick={() => {
                auth.signInWithPopup(facebook)
                  .then(() => browserHistory.push('/dashboard'))
              }}>Login with Facebook</button>
          </div>
        </div>

        <hr />

        <div>
          <Link to="/signup"><button className='btn btn-success'>Sign Up</button></Link>
        </div>
      </div>
    )
  }
}




