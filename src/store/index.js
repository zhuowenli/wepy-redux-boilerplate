/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-28 21:39:35
 */

'use strict';

import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import rootReducer from './reducers';

export default function configStore () {
    const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));
    return store;
}
