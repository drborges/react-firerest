/*
      /users -> collection
      /users/:user -> member
      /users/:user/lessons/:lesson/tests/:test
*/

@firerest.POST({ app: 'userxp', path: '/users' })
class NewUser extends React.Component {
  render() {
    return (
        <div>
          <input type="text"
                 valueLink={this.state.user.linkTo('name')} />
          <input type="text"
                 valueLink={this.state.user.linkTo('level')} />

          <button onClick={this.resource.post(this.state.user))}>New</button>
        </div>
      )
  }
}

@firerest.GET({ app: 'userxp', path: '/users/:teacher' })
class ShowUser extends React.Component {
  render() {
    return (
        <div>
          <span>Name: {this.state.teacher.name}</span>
          <span>Level: {this.state.teacher.level}</span>
          <button onClick={this.resource.get}>Force Refresh</button>
        </div>
      )
  }
}

@firerest.PUT({ app: 'userxp', path: '/users/:user'})
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

               <button onClick={this.resource.put(this.state.user))}>Save</button>
        </div>
      )
  }
}

@firerest.DELETE({ app: 'userxp', path: '/users/:user'})
class DeleteUser extends React.Component {
render() {
    return (
        <button onClick={this.resource.delete}>Delete</button>
      )
  }
}

@firerest.GET({ app: 'userxp', path: '/users'})
class ListUser extends React.Component {
  render() {
    let rows = Object.keys(this.state.users).map(userId => {
      let user = this.state.users[userId]
      return <UserRow user={user} />
    })

    return <ul>{rows}</ul>
  }
}

// Stateless component
const UserRow = props =>
  <li>
    <span>Name: {props.user.name} ({props.user.level})</span>
    <EditUser user={props.user} />
    <DeleteUser user={props.user} />
  </li>

@firerest.POST({ app: 'userxp', path: '/users/:teacher/lessons'})
class NewLesson extends React.Component {

  @firerest.On('changed', 'teacher')
  OnTeacherChanged(event) {
    this.state.teacher = event.value
    this.setState(this.state)
  }

  render() {
    return (
        <div>
          <h1>New Lesson Teached by User:</h1>
          <ShowUser user={this.state.teacher} />

          <input type="text"
                 valueLink={this.state.lesson.linkTo('title')} />
          <input type="text"
                 valueLink={this.state.lesson.linkTo('duration')} />

          <button onClick={this.resource.post(this.state.lesson)}>New</button>
        </div>
      )
  }
}

// This decorator causes all resources that compose the 'path' to be automatically fetched
// and stored as properties (in this case 'teacher' and 'lesson') in the component's state object
@firerest.EagerFetchResources
@firerest.GET({ app: 'userxp', path: '/users/:teacher/lessons/:lesson' })
class ShowLesson extends React.Component {
  render() {
    return (
        <div>
          <span>Title: {this.state.lesson.title}</span>
          <span>Duration: {this.state.lesson.duration}</span>
          <span>Teached By: {this.state.teacher.name}</span>
        </div>
      )
  }
}

Usage:

<ShowLesson teacher={this.state.userId} lesson={this.state.lessonId} />
