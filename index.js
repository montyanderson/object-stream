const EventEmitter = require('events');

class Writer extends EventEmitter {
	constructor() {
		super();
	}

	push(object) {
		const chunk = Buffer.from(JSON.stringify(object) + '\n');

		this.emit('data', chunk);
	}
};

class Reader extends EventEmitter {
	constructor() {
		super();

		this.buffer = '';
	}

	push(chunk) {
		this.buffer += chunk.toString('');

		const parts = this.buffer.split('\n');

		this.buffer = parts.pop();

		for(const part of parts) {
			const object = JSON.parse(part);

			this.emit('object', object);
		}
	}
};

module.exports = { Writer, Reader };
