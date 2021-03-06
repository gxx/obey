/* global describe, it, expect */
import obey from 'src/index'
import modelFixtures from 'test/fixtures/validators'

describe('integration:validators', () => {
  describe('default', () => {
    it('builds a model and returns object with a default value set', () => {
      const testModel = obey.model(modelFixtures.default)
      const testData = {}
      return testModel.validate(testData).then(res => {
        expect(res.name).to.equal('foo')
      })
    })
  })
  describe('allow', () => {
    it('builds a model and fails validation due to value not being allowed', () => {
      const testModel = obey.model(modelFixtures.allow)
      const testData = { name: 'quz' }
      return testModel.validate(testData).catch(err => {
        expect(err.collection).to.deep.equal([{
          type: 'allow',
          sub: [ 'foo', 'bar' ],
          key: 'name',
          value: 'quz',
          message: 'Value \'quz\' is not allowed'
        }])
      })
    })
    it('builds a model with allowed null value in string field', () => {
      const testModel = obey.model(modelFixtures.allowNull)
      const testData = { name: null, email: 'notNull@test.com', phone: '555-555-5555' }
      return testModel.validate(testData).then(res => {
        expect(res.name).to.be.null
        expect(res.email).to.equal(testData.email)
        expect(res.phone).to.equal(testData.phone)
      })
    })
    it('builds a model and fails validation due to value of wrong type (allowNull)', () => {
      const testModel = obey.model(modelFixtures.allowNull)
      const testData = { name: 30, email: null, phone: null }
      return testModel.validate(testData).catch(err => {
        expect(err.collection).to.deep.equal([{
          type: 'string',
          sub: 'default',
          key: 'name',
          value: 30,
          message: 'Value must be a string'
        },
        {
          type: 'phone',
          sub: 'default',
          key: 'phone',
          value: null,
          message: 'Value must be a valid phone number'
        }])
      })
    })
  })
  describe('min', () => {
    it('builds a model and fails validation because value is less than min', () => {
      const testModel = obey.model(modelFixtures.min)
      const testData = { name: 'foo' }
      return testModel.validate(testData).catch(err => {
        expect(err.collection).to.deep.equal([{
          type: 'min',
          sub: 10,
          key: 'name',
          value: 'foo',
          message: 'Length must be greater than 10'
        }])
      })
    })
  })
  describe('max', () => {
    it('builds a model and fails validation because value is greater than max', () => {
      const testModel = obey.model(modelFixtures.max)
      const testData = { name: 'foobarrrrr' }
      return testModel.validate(testData).catch(err => {
        expect(err.collection).to.deep.equal([{
          type: 'max',
          sub: 5,
          key: 'name',
          value: 'foobarrrrr',
          message: 'Length must be less than 5'
        }])
      })
    })
  })
})
