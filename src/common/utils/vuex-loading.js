//动态注册模块
const NAMESPACED = 'myLoading';
const createLoadingPlugin = ({ namespaced = NAMESPACED } = {}) => {
    return store => {
        if (store.state[namespaced]) {
            throw new Error('createLoadingPlugin is exited in current store');
        }
        store.registerModule(namespaced, {
            namespaced: true,
            state: {
                flag: true,
                effects: {}
            },
            mutations: {
                show(state, payload) {
                    state.effects = {
                        ...state.effects,
                        [payload]: true
                    }
                },
                hide(state, payload) {
                    state.effects = {
                        ...state.effects,
                        [payload]: false
                    }
                }
            }
        })
        store.subscribeAction({
            before: (action, state) => {
                console.log(`before action ${action.type}`)
                store.commit(namespaced + '/show', action.type)
            },
            after: (action, state) => {
                console.log(`after action ${action.type}`)
                store.commit(namespaced + '/hide', action.type)
            }
        })
    }
}

export default createLoadingPlugin;