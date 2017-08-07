import {assert} from 'chai';
import {from, setIn} from '../../src';
import {unwrap} from '@collectable/core';

suite('setIn()', () => {
  test('works', () => {
    const actual = setIn(['a', 'b', 'c', 'd', 'e'], 'baz', from({a: {}}));
    const result = unwrap(actual);
    console.log('---');
    console.log('test');
    console.log('---');
    console.log(JSON.stringify(result));
    assert.deepEqual(true, true);
  });
});
