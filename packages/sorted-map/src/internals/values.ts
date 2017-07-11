import {KeyedSelectorFn, isDefined, isUndefined, isEqual} from '@collectable/core';
import {HashMap} from '@collectable/map';
import {RedBlackTree} from '@collectable/red-black-tree';
import {Entry, KeyMap, SortedValues} from './types';

var _nextIndex = 0;

export function setItem<K, V, U>(key: K, value: V, keyMap: KeyMap<K, V, U>, sortedValues: SortedValues<K, V, U>, select: KeyedSelectorFn<K, V, U>|undefined): boolean {
  var entry: Entry<K, V, U>|undefined;

  HashMap.update(arg => {
    if(isUndefined(arg)) {
      return entry = {
        index: ++_nextIndex,
        view: isDefined(select) ? select(value, key) : <any>void 0,
        key,
        value
      };
    }
    return isEqual(value, arg.value) ? arg : entry = {
      index: arg.index,
      view: isDefined(select) ? select(value, key) : <any>void 0,
      key,
      value
    };
  }, key, keyMap);

  if(isDefined(entry)) {
    RedBlackTree.set<Entry<K, V, U>, null>(entry, null, sortedValues);
    return true;
  }

  return false;
}

export function unsetItem<K, V, U>(key: K, keyMap: KeyMap<K, V, U>, sortedValues: SortedValues<K, V, U>): boolean {
  var entry: Entry<K, V, U>|undefined;

  HashMap.update(arg => {
    if(isDefined(arg)) entry = arg;
    return void 0;
  }, key, keyMap);

  if(isDefined(entry)) {
    RedBlackTree.remove(entry, sortedValues);
    return true;
  }

  return false;
}

export function getItemByKey<K, V, U>(key: K, map: KeyMap<K, V, U>): Entry<K, V, U>|undefined {
  return HashMap.get(key, map);
}