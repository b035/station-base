import { Registry, Shell } from "@the-stations-project/sdk";

const FILE_PATH = "startup_commands";
const DEFAULT = "";

export default async function run_startup_commands() {
	//get file
	const text = (await Registry.read_or_create(FILE_PATH, DEFAULT)).unwrap().value!;

	//parse files
	const lines = text
		.split("\n")
		.filter(x => x);
	
	for (let line of lines) {
		parse_line(line);
	}
}

async function parse_line(line: string) {
	(await Shell.exec(line))
		.ok((result) => {
			const cp = result.value;
			
			console.log(`Startup: running "${line}" (${cp?.pid})`);

			cp?.stdout?.on("data", (data) => {
				console.log(data.toString());
			});
		})
		.err(() => console.error(`Startup: failed to run "${line}".\nSee the logs for more details.\nError occured around ${new Date().toISOString()}.\n`));
}

