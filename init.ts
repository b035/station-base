#! /usr/bin/env node

import Fs from "fs/promises";

import * as SDK from "@the-stations-project/sdk";

async function init() {
	const result = new SDK.Result<SDK.ExitCodes, undefined>(SDK.ExitCodes.Ok, undefined);

	function handle_err(msg: string) {
		result.code = SDK.ExitCodes.ErrUnknown;
		console.error(msg);
	}

	//create directories
	for (let path of [
		"executables",
		"registry",
	]) {
		await Fs.mkdir(path)
			.catch(() => handle_err(`failed to create directory "${path}".`));
	}

	//initialize registry
	for (let path of [
		"module_names",

		"station_info",
		"station_info/greetings",
	]) {
		(await SDK.Registry.mkdir(path))
			.err(() => handle_err(`failed to create registry directory "${path}".`));
	}
	for (let [path, content] of [
		["startup_commands", ""],

		["station_info/id", "my-station"],
		["station_info/name", "My Station"],
		["station_info/languages", "en"],
		["station_info/greetings/en", "Welcome"],
	]) {
		(await SDK.Registry.write(path, content))
			.err(() => handle_err(`failed to write registry file "${path}".`));
	}

	return result;
}

SDK.start_service(init, (result) => console.log(result.to_string()));
