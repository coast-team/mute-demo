function openDB () {
    var serverDB = db.open({
        server: 'mute',
        version: 2,
        schema: {
            models: {
                key: { keyPath: 'id' , autoIncrement: true },
                // Optionally add indexes
                indexes: {
                    creationDate: {},
                    docID: { unique: true },
                    history: {},
                    lastModificationDate: {},
                    replicaNumber: {},
                    ropes: {},
                    bufferLocalLogootSOp: {},
                    mode: {},
                    username: {}
                }
            },
            docs: {
                key: { keyPath: 'id', autoIncrement: true },
                indexes: {
                    docID: { unique: true },
                    version: {}
                }
            }
        }
    }); 
    console.log('serverDB: ', serverDB);
    return serverDB;
}