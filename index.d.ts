declare module 'promise-catcher'{
	export const calls: (execute: any) => any
	export const throws: (execute: any) => any
	export const express: (execute: any) => any
	export const jasmine: (execute: any) => any
}