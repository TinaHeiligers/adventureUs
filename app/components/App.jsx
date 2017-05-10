// A necessary glue?

import React from 'react'
import { Route } from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()
import Dashboard from './Dashboard'
import TitleBar from './TitleBar'
const auth = firebase.auth()

// NOT FINISHED NEED TO FINISH LOGIN FIRST BEFORE TESTING THIS:
// PROBLEM: NOT EVEN GRABBING USER.UID IN DID MOUNT. No logging.

// the reason for this container is to allow for an enhancement
// to parameterize the route
// userRef will equal db.ref('users').child({name})
// and pass in name to the below function
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      tripId: props.params.tripId,
      // buddies: []
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({
        userId: user.uid
      })
    })
  }

  render() {
    console.log('STATE in APP:', this.state)
    return (
      <div>
        <TitleBar
          tripId={this.state.tripId}
          auth={auth}
          tripsRef={db.ref('trips')}
          userRef={db.ref('users').child(this.state.userId ? this.state.userId : 'test')} />
        <Dashboard
          userId={this.state.userId}
          tripRef={db.ref('trips').child(this.state.tripId)}
          auth={auth}
          tripId={this.state.tripId} />
      </div>
    )
  }
}


