export class UserException {
	public message: string;

	constructor(message: string) {
		this.message = message;
	}

	public toString() {
		return this.message;
	}
}
