import Vue from 'vue';
import Router from 'vue-router';

import List from '@/components/List';
import Add from '@/components/Add';
import Update from '@/components/Update';

Vue.use(Router)
 
export default new Router({
    routes: [
        {
            path: '/list',
            name: 'List',
            component: List
        },
        {
            path: '/add',
            name: 'Add',
            component: Add
        },
        {
            path: '/update',
            name: 'Update',
            component: Update
        }
    ]
})