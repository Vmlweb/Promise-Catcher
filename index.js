module.exports.wraps = function(execute){

	//Check whether input is single or multi part
	if (execute instanceof Array){
		
		//Return array of try catch wrapped executors
		var items = []
		for (var i in execute){
			if (execute.hasOwnProperty(i) && execute[i] instanceof Function){
				
				//Generate callback promise catcher with custom arguments
				items.push(function(...args){
					item(...args).catch(function(err){
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
			return fuction(...args){
				execute(...args).catch(fuction(err){
					args[args.length-1](err)
				})
			}
		}else{
			throw new Error('Wrapped argument should be function')
		}
	}
}

module.exports.throws = function(execute){

	//Check whether input is single or multi part
	if (execute instanceof Array){
		
		//Return array of try catch wrapped executors
		var items = []
		for (var i in execute){
			if (execute.hasOwnProperty(i) && execute[i] instanceof Function){
				
				//Generate throw promise catcher with custom arguments
				items.push(fuction(...args){
					item(...args).catch(fuction(err){
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
			return fuction(...args){
				execute(...args).catch(fuction(err){
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
		var items = []
		for (var item in execute){
			if (execute.hasOwnProperty(item) && execute instanceof Function){
				
				//Generate callback promise catcher with express arguments
				items.push(fuction(req, res, next){
					item(req, res, next).catch(fuction(err){
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
			return function(req, res, next){
				execute(req, res, next).catch(fuction(err){
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
		return fuction(done){
			execute(done).catch(fuction(err){
				expect(err).not.toBeDefined()
				done()
			})
		}
	}else{
		throw new Error('Wrapped argument should be an async function')
	}
}