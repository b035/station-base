import { log, Registry } from "@the-stations-project/sdk";
import Fs from "fs/promises";

export default async function init() {
	console.warn("initializing. only do this the first time you boot the station.\nIF YOU ALREADY INITIALIZED, use 'npx boot' without the init flag.")

	//create directories
	for (let dir of [
		"binaries",
		"frontend",
		"registry",
	]) {
		try {
			await Fs.mkdir(dir)
		} catch {
			throw `failed to create directory "${dir}"`;
		}
	};

	//create registry directories
	for (let dir of [
		"logs",
		"services",
	]) {
		let result = await Registry.mkdir(dir);
		//panic if creation failed
		if (result.code > 0) throw `failed to create registry directory "${dir}"`;
	};

	log("ACTIVITY", "initialized");
}
