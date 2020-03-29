const assert = require('assert');
const { Writer, Reader } = require('./');

test('Writer', async () => {
	const writer = new Writer();

	setTimeout(() => {
		writer.push({ a: 200, b: 'hello!' });
	}, 0);

	const buffer = await new Promise(resolve => writer.once('data', resolve));

	assert.equal(buffer.toString(), '{"a":200,"b":"hello!"}\n');
});

test('Reader', async () => {
	const reader = new Reader();

	setTimeout(() => {
		reader.push('{"a":200,"');
		reader.push('b":"hello!"');
		reader.push('}\n');
	}, 0);

	const object = await new Promise(resolve => reader.once('object', resolve));

	assert.deepEqual(object, { a: 200, b: 'hello!' });
});
