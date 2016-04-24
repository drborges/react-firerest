/*
      /users -> collection
      /users/:user -> member
      /users/:user/lessons/:lesson/tests/:test
*/

const FirebaseResource = {
  get ref() { return new Firebase(`https://${app}.firebaseio.com${path}`) },
  get app() { return 'userxp' },
  get path() { return '/users/:user' },
  get key() { return 'user' } // path.split('/').last.slice(1)
}

class FirebaseResourceCreator {
  constructor(resource) {
    this.resource = resource
    this.data = {}
  }

  merge(state) {
    state[this.resource.key] = this.data
  }

  post() {
    this.resource.ref.push(this.data)
  }
}

@firebase('userxp')
@firebase.POST('/users')
class NewUser extends React.Component {
  render() {
    return (
        <div>
          <input type="text"
                 valueLink={this.state.data.linkTo('name')} />
          <input type="text"
                 valueLink={this.state.data.linkTo('level')} />
          <button onClick={this.state.date.post}>New</button>
        </div>
      )
  }
}

@firebase('userxp')
@firebase.GET('/users/:user')
class ShowUser extends React.Component {
  render() {
    return (
        <div>
          <span>Name: {this.state.user.name}</span>
          <span>Level: {this.state.user.level}</span>
          <button onClick={this.state.user.get}>Force Refresh</button>
        </div>
      )
  }
}

@firebase('userxp')
@firebase.PUT('/users/:user')
class EditUser extends React.Component {
  render() {
    return (
        <div>
          <input type="text"
                 value={this.state.user.name}
                 onChange={this.state.user.update('name')} />
          <input type="text"
                 value={this.state.user.level}
                 onChange={this.state.user.update('level')} />
          <button onClick={this.state.user.put}>Save</button>
        </div>
      )
  }
}

@firebase('userxp')
@firebase.DELETE('/users/:user')
class DeleteUser extends React.Component {
render() {
    return (
        <button onClick={this.state.user.delete}>Delete</button>
      )
  }
}

@firebase('userxp')
@firebase.GET('/users')
class ListUser extends React.Component {
  render() {
    let rows = Object.keys(this.state.users).map(userId => {
      let user = this.state.users[userId]
      return <UserRow user={user} />
    })

    return <ul>{rows}</ul>
  }
}

const UserRow = props =>
  <li>
    <span>Name: {props.user.name} ({props.user.level})</span>
    <EditUser user={props.user} />
    <DeleteUser user={props.user} />
  </li>

@firebase('userxp')
@firebase.POST('/users/:user/lessons')
class NewLesson extends React.Component {
  render() {
    return (
        <div>
          <h1>New Lesson Teached by User:</h1>
          <ShowUser user={this.props.user} />

          <input type="text"
                 value={this.state.data.title}
                 onChange={this.state.data.update('title')} />
          <input type="text"
                 value={this.state.data.duration}
                 onChange={this.state.data.update('duration')} />
          <button onClick={this.state.date.post}>New</button>
        </div>
      )
  }
}

@firebase('userxp')
@firebase.GET('/users/:user/lessons/:lesson')
class ShowLesson extends React.Component {
  render() {
    return (
        <div>
          <span>Title: {this.state.lesson.title}</span>
          <span>Duration: {this.state.lesson.duration}</span>
          <span>Teached By: {this.state.user.name}</span>
          <button onClick={this.state.lesson.get}>Force Refresh</button>
        </div>
      )
  }
}

<ShowLesson user={this.state.user} lesson={this.state.lesson} />

@firebase('userxp')
@firebase.PUT('/users/:user/lessons/:lesson')
class EditLesson extends React.Component {
  render() {
    return (
        <div>
          <input type="text"
                 value={this.state.lesson.title}
                 onChange={this.state.lesson.update('title')} />
          <input type="text"
                 value={this.state.lesson.duration}
                 onChange={this.state.lesson.update('duration')} />
          <button onClick={this.state.lesson.put}>Save</button>
        </div>
      )
  }
}
