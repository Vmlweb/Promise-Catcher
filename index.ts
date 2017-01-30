export function wait(time: number){
	
	//Create delay promise
	return new Promise(resolve => {
		
		//Wait for specified time
		setTimeout(() => {
			resolve()
		}, time)
	})
}

export function wraps(execute: Function | Function[]){
	
	//Check whether input is single or multi part
	if (execute instanceof Array){
		
		//Return array of try catch wrapped executors
		return execute.map(item => {
			
			//Generate callback promise catcher with custom arguments
			return (...args) => {
				item(...args).catch(err => {
					args[args.length-1](err)
				})
			}
		})
		
	}else{
		
		//Return single try catch wrapped executors
		return (...args) => {
			execute(...args).catch(err => {
				args[args.length-1](err)
			})
		}
	}
}

export function throws(execute: Function | Function[]){
	
	//Check whether input is single or multi part
	if (execute instanceof Array){
		
		//Return array of try catch wrapped executors
		return execute.map(item => {
			
			//Generate callback promise catcher with custom arguments
			return (...args) => {
				item(...args).catch(err => {
					throw err
				})
			}
		})
		
	}else{
		
		//Return single try catch wrapped executors
		return (...args) => {
			execute(...args).catch(err => {
				throw err
			})
		}
	}
}

export function express(execute: Function | Function[]){
	
	//Check whether input is single or multi part
	if (execute instanceof Array){
		
		//Return array of try catch wrapped executors
		return execute.map(item => {
			
			//Generate callback promise catcher with custom arguments
			return (req, res, next) => {
				item(req, res, next).catch(err => {
					next(err)
				})
			}
		})
		
	}else{
		
		//Return single try catch wrapped executors
		return (req, res, next) => {
			execute(req, res, next).catch(err => {
				next(err)
			})
		}
	}
}

export function jasmine(execute: Function){
			
	//Return single try catch wrapped executors
	return (done) => {
		execute(done).catch(err => {
			expect(err).not.toBeDefined()
			done()
		})
	}
}