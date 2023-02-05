import { Registry } from "@the-stations-project/sdk";
import Fs from "fs/promises";

export default async function init() {
	//create directories
	for (let dir of [
		"binaries",
		"frontend",
		"registry",
	]) await Fs.mkdir(dir);

	//create registry directories
	for (let dir of [
		"services",
		"tmp",
	]) {
		let result = await Registry.mkdir(dir);
		//panic if creation failed
		if (result.code > 0) throw `failed to create registry directory "${dir}"`;
	};
}
