module.exports.wrap = function(execute){

	//Check whether input is single or multi part
	if (execute instanceof Array){
		
		//Return array of try catch wrapped executors
		const items = []
		for (const i in execute){
			if (execute.hasOwnProperty(i) && execute[i] instanceof Function){
				
				//Generate callback promise catcher with custom arguments
				items.push((...args) => {
					item(...args).catch(err => {
						args[args.length-1](err)
					})
				})
			}
		}
		return items
		
	}else{
		
		//Return single try catch wrapped executors
		if (execute instanceof Function){
			
			//Generate callback promise catcher with custom arguments
			return (...args) => {
				execute(...args).catch(err => {
					args[args.length-1](err)
				})
			}
		}else{
			throw new Error('Wrapped argument should be function')
		}
	}
}

module.exports.throw = function(execute){

	//Check whether input is single or multi part
	if (execute instanceof Array){
		
		//Return array of try catch wrapped executors
		const items = []
		for (const i in execute){
			if (execute.hasOwnProperty(i) && execute[i] instanceof Function){
				
				//Generate throw promise catcher with custom arguments
				items.push((...args) => {
					item(...args).catch(err => {
						throw err
					})
				})
			}
		}
		return items
		
	}else{
		
		//Return single try catch wrapped executors
		if (execute instanceof Function){
			
			//Generate throw promise catcher with custom arguments
			return (...args) => {
				execute(...args).catch(err => {
					throw err
				})
			}
		}else{
			throw new Error('Wrapped argument should be function')
		}
	}
}

module.exports.express = function(execute){

	//Check whether execution is single or multi part
	if (execute instanceof Array){
		
		//Return array of try catch wrapped executors
		const items = []
		for (const item in execute){
			if (execute.hasOwnProperty(item) && execute instanceof Function){
				
				//Generate callback promise catcher with express arguments
				items.push((req, res, next) => {
					item(req, res, next).catch(err => {
						next(err)
					})
				})
			}
		}
		return items
		
	}else{
		
		//Return single try catch wrapped executors
		if (execute instanceof Function){
			
			//Generate callback promise catcher with express arguments
			return (req, res, next) => {
				execute(req, res, next).catch(err => {
					next(err)
				})
			}
		}else{
			throw new Error('Wrapped argument should be an async function')
		}
	}
}

module.exports.jasmine = function(execute){

	//Return single try catch wrapped executors
	if (execute instanceof Function){
		
		//Generate throw promise catcher with jasmine arguments and expect checker
		return done => {
			execute(done).catch(err => {
				expect(err).not.toBeDefined()
				throw err
			})
		}
	}else{
		throw new Error('Wrapped argument should be an async function')
	}
}