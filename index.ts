#! /usr/bin/env node

import { Registry, log, Memory } from "@the-stations-project/sdk";

import run_startup_commands from "./startup_commands.js";

async function main() {
	//test
	(await Registry.read("info/name"))
		.err(() => {
			console.error("please run 'npx init' first");
			process.exit();
		});

	//logs
	const timestamp = new Date().toISOString();
	(await Registry.move("logs/current", `logs/before-${timestamp}`));
	(await Registry.mkdir("logs/current")).or_panic();
	
	//memory
	(await Memory.init()).or_panic("Base: Failed to initialize memory");

	//finalize
	log("STATUS", "booted");
	console.log("booted");

	//startup commands
	run_startup_commands();	
}

main();
