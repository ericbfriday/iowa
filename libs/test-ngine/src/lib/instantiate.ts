import { Project } from "ts-morph";

export class CurrentProject {
	project: Project;
	constructor () {
		this.project = new Project();
	}
}