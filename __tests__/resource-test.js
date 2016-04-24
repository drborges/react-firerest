"use strict";

jest.unmock('../resource');

import Firebase from 'firebase'
import Resource from '../resource'

describe('Resource', () => {

  describe('resource at /users', () => {
    let resource = new Resource('userxp', '/users')

    it('has app name', () => {
      expect(resource.app).toBe('userxp')
    })

    it('has path', () => {
      expect(resource.path).toBe('/users')
    })

    it('has URI', () => {
      expect(resource.uri).toBe('https://userxp.firebaseio.com/users')
    })

    it('has route', () => {
      expect(resource.route).toBe('/users')
    })

    it('does not have path parameters', () => {
      expect(resource.parameters).toEqual([])
    })

    it('has key', () => {
      expect(resource.key).toBe('users')
    })

    it('has firebase ref', () => {
      expect(resource.ref).toEqual(new Firebase(resource.uri))
    })

    it('does not have parent resources', () => {
      expect(resource.parents).toEqual({})
    })
  })

  describe('resource at /users/:user', () => {
    let resource = new Resource('userxp', '/users/:user', { user: 123 })

    it('has app name', () => {
      expect(resource.app).toBe('userxp')
    })

    it('returns actual path', () => {
      expect(resource.path).toBe('/users/123')
    })

    it('has URI', () => {
      expect(resource.uri).toBe('https://userxp.firebaseio.com/users/123')
    })

    it('has route', () => {
      expect(resource.route).toBe('/users/:user')
    })

    it('has path parameters', () => {
      expect(resource.parameters).toEqual(['user'])
    })

    it('has key', () => {
      expect(resource.key).toBe('user')
    })

    it('has firebase ref', () => {
      expect(resource.ref).toEqual(new Firebase(resource.uri))
    })

    it('does not have parent resources', () => {
      expect(resource.parents).toEqual({})
    })
  })

  describe('resource at /users/:user/lessons/:lesson', () => {
    let resource = new Resource('userxp', '/users/:user/lessons/:lesson', { user: 123, lesson: 321 })

    it('has app name', () => {
      expect(resource.app).toBe('userxp')
    })

    it('returns actual path', () => {
      expect(resource.path).toBe('/users/123/lessons/321')
    })

    it('has URI', () => {
      expect(resource.uri).toBe('https://userxp.firebaseio.com/users/123/lessons/321')
    })

    it('has route', () => {
      expect(resource.route).toBe('/users/:user/lessons/:lesson')
    })

    it('has path parameters', () => {
      expect(resource.parameters).toEqual(['user', 'lesson'])
    })

    it('has key', () => {
      expect(resource.key).toBe('lesson')
    })

    it('has firebase ref', () => {
      expect(resource.ref).toEqual(new Firebase(resource.uri))
    })

    it('has parent resources', () => {
      expect(resource.parents).toEqual({
        user: new Resource(resource.app, '/users/:user', { user: 123 })
      })
    })
  })
})
