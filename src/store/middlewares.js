export function runSagas(store, sagas = {}){
    const {asyncSagas, sagaRoot, sagaTasks} = store;
    
    Object.keys(sagas).forEach((key) => {
        if (!!store.sagaTasks[key]){
            console.warn(`a saga with key ${key} is already exits in store.sagaTasks, this one will be ignored.`);
            return;
        }

        sagaTasks[key] = sagaRoot.run(sagas[key])
    })
}