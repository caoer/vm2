'use strict';

const fs = require('fs');
const pa = require('path');

var _require = require('../');

const NodeVM = _require.NodeVM;
const VMError = _require.VMError;


if (process.argv[2]) {
	let path = pa.resolve(process.argv[2]);

	console.log(`\x1B[90m[vm] creating VM for ${ path }\x1B[39m`);
	let started = Date.now();

	try {
		NodeVM.file(path, {
			verbose: true,
			require: {
				external: true
			}
		});

		console.log(`\x1B[90m[vm] VM completed in ${ Date.now() - started }ms\x1B[39m`);
	} catch (ex) {
		if (ex instanceof VMError) {
			console.error(`\x1B[31m[vm:error] ${ ex.message }\x1B[39m`);
		} else {
			let stack = ex.stack;


			if (stack) {
				console.error(`\x1B[31m[vm:error] ${ stack }\x1B[39m`);
			} else {
				console.error(`\x1B[31m[vm:error] ${ ex }\x1B[39m`);
			}
		}
	}
}