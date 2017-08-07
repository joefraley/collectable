import {IndexedCollection, isIndexedCollection, unwrap} from '@collectable/core';
import {fromArray} from '@collectable/map';

export function setIn<K, V>(path: any[], value: any, collection: IndexedCollection<K, V>): IndexedCollection<K, V> {
  collection = setDeep(collection, path, 0, value);
  return collection;
}

function setDeep(collection: IndexedCollection<any, any>, path: any[], keyidx: number, value: any): IndexedCollection<any, any> {
  console.log(`---`);
  console.log('setDeep');
  console.log(`---`);
  console.log({collection: unwrap(collection)});
  console.log({value: value.toString()});
  console.log({path});
  console.log({keyidx});
  var key = path[keyidx];

  console.log('---');
  console.log('time to check the index...');
  console.log('---');
  if(isIndexedCollection(collection) && IndexedCollection.verifyKey(key, collection)) {
    console.log('---');
    console.log('isIndexed & verified?', '         ', isIndexedCollection(collection) && IndexedCollection.verifyKey(key, collection));
    console.log('---');
    return keyidx === path.length - 1
      ? IndexedCollection.set(key, value, collection)
      : IndexedCollection.updateEntry((c: any) => {
        console.log(`---`);
        console.log('updateEntry:updater callback');
        console.log(`---`);
        console.log({keyidx});
        // console.log({newValue: unwrap(v)});
        console.log({collection: unwrap(c)});
        return setDeep(c, path, keyidx + 1, value);
      }, key, collection);
  }
  console.log('---');
  console.log('not isIndexed or verified...');
  console.log('---');
  return <any>fromArray([[key, keyidx === path.length - 1 ? value : setDeep(<any>void 0, path, keyidx + 1, value)]]);
}
