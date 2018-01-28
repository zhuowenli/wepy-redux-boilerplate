/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-28 21:40:48
 */

'use strict';

import { createAction } from 'redux-actions';
import { ASYNC_INCREMENT } from '../types/counter';

export const asyncInc = createAction(ASYNC_INCREMENT, () => new Promise(resolve => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
}));
