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

	//logs
	const timestamp = new Date().toISOString();
	(await Registry.move("logs/current", `logs/before-${timestamp}`));
	(await Registry.mkdir("logs/current")).unwrap();

	//finalize
	log("STATUS", "booted");
	console.log("booted");

	//startup commands
	run_startup_commands();	
}

main();
