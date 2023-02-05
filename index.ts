#! /usr/bin/env node

import { Registry, log } from "@the-stations-project/sdk";

import run_startup_commands from "./startup_commands.js";

async function main() {
	//test
	(await Registry.read("info/name"))
		.err(() => {
			console.error("please run 'npx init' first");
			process.exit();
		});

	//cleanup
	await Registry.delete("tmp");

	//finalize
	log("STATUS", "booted");
	console.log("booted");

	//startup commands
	run_startup_commands();	
}

main();
