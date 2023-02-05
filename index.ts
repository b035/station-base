#! /usr/bin/env node

import { Registry, RegistryExitCodes, log } from "@the-stations-project/sdk";

import init from "./init.js";

async function main() {
	//arguments
	await check_argument("init", init);

	//cleanup
	await Registry.delete("tmp");
	await Registry.mkdir("tmp");

	//finalize
	log("STATUS", "booted");
}

async function check_argument(arg: string, fn: () => void|Promise<void>) {
	if (process.argv.indexOf(arg) != -1) await fn();
}

main();
