function openDB () ***REMOVED***
    var serverDB = db.open(***REMOVED***
        server: 'mute',
        version: 2,
        schema: ***REMOVED***
            models: ***REMOVED***
                key: ***REMOVED*** keyPath: 'id' , autoIncrement: true ***REMOVED***,
                // Optionally add indexes
                indexes: ***REMOVED***
                    creationDate: ***REMOVED******REMOVED***,
                    docID: ***REMOVED*** unique: true ***REMOVED***,
                    history: ***REMOVED******REMOVED***,
                    lastModificationDate: ***REMOVED******REMOVED***,
                    replicaNumber: ***REMOVED******REMOVED***,
                    ropes: ***REMOVED******REMOVED***,
                    bufferLocalLogootSOp: ***REMOVED******REMOVED***,
                    mode: ***REMOVED******REMOVED***,
                    username: ***REMOVED******REMOVED***
            ***REMOVED***
        ***REMOVED***
            docs: ***REMOVED***
                key: ***REMOVED*** keyPath: 'id', autoIncrement: true ***REMOVED***,
                indexes: ***REMOVED***
                    docID: ***REMOVED*** unique: true ***REMOVED***,
                    version: ***REMOVED******REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***); 
    console.log('serverDB: ', serverDB);
    return serverDB;
***REMOVED***