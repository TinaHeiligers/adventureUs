import React from 'react'
import ReactTooltip from 'react-tooltip'
import Buddies from './Buddies'
import IdeaBox from './IdeaBox'
import TimelineIndex from './TimelineIndex'
import firebase from 'APP/fire'

export default class TabsAndView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      changeTabs: true // where do we use this? an issue perhaps?
    }
  }

  componentWillMount() {
    const auth = firebase.auth()
    this.unsubscribe = auth && auth.onAuthStateChanged(user => this.setState({ user })) // there is no user on the state right now
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }
  componentWilReceiveProps(incomming, outgoing) {
    // console.log('******TABS AND VIEWS WILL RECEIVE PROPS***INCOMMING: ', incomming)
  }

  render() {
    // console.log('TABS AND VIEWS STATE', this.props)
    return (
      <div>
        <ul
          className="nav nav-tabs">
        <li className={this.props.whichTab ? 'active' : ''}>
          <a id='Buddies'
              href="#buddies"
              onClick={this.props.changeTabs}
              data-tip="Buddies shows all of your buddies who are attending the trip."
              >Buddies</a>
              <ReactTooltip />
        </li>
        <li className={this.props.whichTab ? '' : 'active'}>
          <a id='Idea Box'
              href="#ideabox"
              onClick={this.props.changeTabs}
              data-tip="Click here to add ideas for your trip"
              >Idea Box</a>
              <ReactTooltip />
        </li>
      </ul>

      <div id="myTabContent"
            className="tab-content">
        {
        this.props.whichTab === 'Buddies' ?
          <div className="tab-pane fade active in"
                id="buddies">
                <TimelineIndex
                  userId={this.props.userId}
                  tripRef={this.props.tripRef}
                  whichTab={this.props.whichTab}
                />
                <Buddies
                  userId={this.props.userId}
                  tripRef={this.props.tripRef}
                  tripId={this.props.tripId}
                  whichTab={this.props.whichTab}
                />
              </div>

              :
              <div className="tab-pane fade active in"
                id="ideaBox">
                <TimelineIndex
                  userId={this.props.userId}
                  tripRef={this.props.tripRef}
                  whichTab={this.state.whichTab}
                />
                <IdeaBox
                  userId={this.props.userId}
                  ideasRef={this.props.tripRef.child('ideas')}
                />
              </div>
          }

        </div>
      </div>
    )
  }
}

// render() {
//   return (
//   <div>
//     <ul onClick={() => this.setState({whichTab: !this.state.changeTabs})}
//         className="nav nav-tabs">
//       <li className="active">
//         <a href="#buddies"
//             data-toggle="tab">Buddies</a>
//       </li>
//       <li>
//         <a href="#ideaBox"
//             data-toggle="tab">IdeaBox</a>
//       </li>
//     </ul>

//     <div id="myTabContent"
//           className="tab-content">

//       <div className="tab-pane fade active in"
//             id="buddies">
//         <InlineBuddyEditIndex />
//       </div>

//       <div className="tab-pane fade"
//             id="ideaBox">
//         <IdeaBox />
//       </div>

//     </div>
//   </div>
//   )
// }
