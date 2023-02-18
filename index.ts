#! /usr/bin/env node

import * as SDK from "@the-stations-project/sdk";

async function main() {
	const result = new SDK.Result(SDK.ExitCodes.Ok, undefined);

	/* clean logs */
	//create previous logs directory
	(await SDK.Registry.mkdir("logs/previous"));
	//try to move logs from last session
	const timestamp = new Date().toISOString();
	const dest_path = SDK.Registry.join_paths("logs/previous", timestamp);
	(await SDK.Registry.move("logs/current", dest_path));
	//create current directory
	(await SDK.Registry.mkdir("logs/current")).or_panic();

	/* reset memory */
	(await SDK.Memory.init());

	/* startup commands */
	//read file
	const text = (await SDK.Registry.read("startup_commands")).or_panic().value!;
	//parse
	const commands = text.split("\n");
	//execute commands
	for (let command of commands) {
		(await SDK.Shell.exec(command))
			.or_log_error()
			.err(() => result.code = SDK.ExitCodes.ErrUnknown);
	}

	return result;
}

SDK.start_service(main, (result) => console.log(result.to_string()));
