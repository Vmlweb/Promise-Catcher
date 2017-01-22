declare module 'promise-catcher'{
	export const wrap: (execute: any) => any
	export const throw: (execute: any) => any
	export const express: (execute: any) => any
	export const jasmine: (execute: any) => any
}