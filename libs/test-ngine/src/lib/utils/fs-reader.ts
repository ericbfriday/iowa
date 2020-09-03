// From here: https://github.com/nestjs/nest-cli/blob/master/lib/readers/file-system.reader.ts
import * as fs from 'fs';

export interface Reader {
	list(): string[] | Promise<string[]>;
	read(name: string): string | Promise<string>;
	readAnyOf(filenames: string[]): string | Promise<string | undefined>;
}

export class FileSystemReader implements Reader {
	constructor (private readonly directory: fs.PathLike) { }

	public async list(): Promise<string[]> {
		return new Promise<string[]>((resolve, reject) => {
			fs.readdir(
				this.directory,
				(error: NodeJS.ErrnoException | null, filenames: string[]) => {
					if (error) {
						reject(error);
					} else {
						resolve(filenames);
					}
				},
			);
		});
	}

	public async read(name: fs.PathLike): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			fs.readFile(
				`${this.directory}/${name}`,
				(error: NodeJS.ErrnoException | null, data: Buffer) => {
					if (error) {
						reject(error);
					} else {
						resolve(data.toString());
					}
				},
			);
		});
	}

	public async readAnyOf(filenames: fs.PathLike[]): Promise<string | undefined> {
		try {
			for (const file of filenames) {
				return await this.read(file);
			}
		} catch (err) {
			return filenames.length > 0
				? await this.readAnyOf(filenames.slice(1, filenames.length))
				: undefined;
		}
	}
}