import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import theme from './modules/theme';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 状态
        width: "",
        height: "",
    },
    mutations: {
        // 改变方法
        SET_WIDTH: function(state, width) {
            state.width = width;
        },
        SET_HEIGHT: function(state, height) {
            state.height = height;
        }
    },
    getters: {
        GET_WIDTH: function(state) {
            return state.width;
        },
        GET_HEIGHT: function(state) {
            return state.height;
        }
    },
    actions: {
        SET_WIDTH: function(state, width) {
            store.commit("SET_WIDTH", width);
        },
        SET_HEIGHT: function(state, height) {
            store.commit("SET_HEIGHT", height);
        }
    },
    modules: {
        app,
        user,
        theme
    }
});

export default store;