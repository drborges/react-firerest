import Firebase from 'firebase'

export default class Resource {
  constructor(app, route, parameters) {
    let lastPathNode = route.split('/').pop()

    this.app = app
    this.path = route
    this.route = route
    this.key = lastPathNode[0] == ':' ? lastPathNode.slice(1) : lastPathNode
    this.parameters = route.split('/').filter(node => node[0] == ':').map(parameter => parameter.slice(1))

    this.path = this.parameters.reduce((path, parameterKey) => {
      return path.replace(`:${parameterKey}`, parameters[parameterKey])
    }, route)

    this.uri = `https://${this.app}.firebaseio.com${this.path}`
    this.ref = new Firebase(this.uri)

    this.parents = this.parameters.filter(parameter => parameter !== this.key).reduce((resources, parameter) => {
      let parentRoute = route.slice(0, route.indexOf(`:${parameter}`))
      parentRoute = `${parentRoute}:${parameter}`
      resources[parameter] = new Resource(app, parentRoute, parameters)
      return resources
    }, {})
  }
}
