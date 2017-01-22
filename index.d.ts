declare module 'promise-catcher'{
	export const wrap: (execute: Function) => Function | Function[]
	export const throw: (execute: Function) => Function | Function[]
	export const express: (execute: Function) => Function | Function[]
	export const jasmine: (execute: Function) => Function | Function[]
}