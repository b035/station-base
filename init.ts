#! /usr/bin/env node

import Fs from "fs/promises";

import { Registry } from "@the-stations-project/sdk";

async function init() {
	//create directories
	for (let dir of [
		"binaries",
		"registry",
	]) {
		try {
			await Fs.mkdir(dir)
		} catch {
			console.error(`failed to create directory "${dir}"`);
		}
	};

	//create registry directories
	for (let dir of [
		"info",
		"services",
	]) {
		(await Registry.mkdir(dir))
			.err(() => console.error(`failed to create registry directory "$({dir}"`));
	};

	//create registry files
	for (let [path, value] of [
		["startup_commands", ""],

		["info/id", "untitled-station"],
		["info/name", "Untitled Station"],
		["info/greeting", "Welcome."],

		["services/npx", "npx"],
		["services/npm", "npm"],
	]) {
		await create_file(path, value);
	}

	console.log("INITIALIZATION OK. Run 'npx boot' to boot.");
	process.exit();
}

async function create_file(path: string, value: string) {
	(await Registry.read_or_create(path, value)).or_panic();
}

init();
