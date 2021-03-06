# Promise Catcher

Simple promise try catch wrapper written in Typescript. Suggestions are welcome.

## Installation

You can grab the latest version via NPM.

```bash
npm install --save promise-catcher
```

Then use require through Typescript.

```javascript
import * as catcher from 'promise-catcher'
```

## The Problem

When using ES6 promises with packages that do not catch your async rejections you may be familiar with this error.

```javascript
(node:) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id:): RequestError:
```

To solve this we need to wrap our calls in try catch statements to make sure we are handling them correctly.

```javascript
//Using callbacks in express
app.get('/url', () => {
	return async (req, res, next) => {
		try{
			
			if (problem){
				throw new Error('message')
			}
			
		}catch(err){
			next(err)
			return
		}
		next()
	}
}())
```
```javascript
//Using throws in jasmine
describe('Test', () => {
	it('test', () => {
		return async done => {
			try{
				
				if (problem){
					throw new Error('message')
				}
				
			}catch(err){
				throw err
			}
			done()
		}
	}())
})
```

## Our Solution

This package contains convenience functions that wrap your async functions in try catch and pass the error onwards properly.

```javascript
import * as catcher from 'promise-catcher'

//Using callbacks in express
app.get('/url', catcher.express(async (req, res, next) => {
	
	if (problem){
		throw new Error('message')
	}
	
	next()
}))
```
```javascript
//Using throws in jasmine
it('should work', catcher.jasmine(async done => {

	if (problem){
		throw new Error('message')
	}

	done()
}))
```
```javascript
//Using throws in jasmine testing angular async
it('should work', async(inject([Service], catcher.angular(async (service: Service) => {

	if (problem){
		throw new Error('message')
	}

}))))
```
```javascript
//Use with any callbacks
catcher.wraps(...)

//Use with any throwing
catcher.throws(...)
```