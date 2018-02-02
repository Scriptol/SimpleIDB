/*
    SimpleIDB    

    A class as interface to IndexedDB.
    
    (c) 2018 Scriptol.com - MIT License
*/

class SimpleIDB {
    open(dname, sname, options) {
        this.dname=dname
        var sflag=("schema" in options)
        this.sflag=sflag
	    return new Promise(function(resolve) {
    	    var r = indexedDB.open(dname)
		    r.onupgradeneeded = function(e) {
		        var idb = r.result
		        var store
		        if(sflag)
		            store = idb.createObjectStore(sname, options["schema"])
		        else        
		            store = idb.createObjectStore(sname)
		        
		        if("index" in options) {
		            let i = options["index"]
		            if(Array.isArray(i[0])) {
		                for(let x of i) {
		                    store.createIndex(x[0], x[1], x[2]===undefined?null:x[2])
		                }
		            }
		            else {
		                store.createIndex(i[0], i[1], i[2]===undefined?null:i[2])
		            }      
		        }      
		    }
		    r.onsuccess = function(e) {
			    let idb = r.result
			    resolve(idb)
	        }
    	    r.onerror = function (e) {
			    alert("Unable to open IndexedDB.")
	        }    
	    })
    }

    fill(idb, sname, arr) {
        let sflag=this.sflag
        return new Promise(function(resolve) {
	        let tactn = idb.transaction(sname, "readwrite")
            var store = tactn.objectStore(sname)
	        for(var obj of arr) {
	            if(sflag)
   	       	        store.put(obj)
   	       	    else {
   	       	        let key = Object.keys(obj)[0]
   	       	        store.put(obj[key], key)
   	       	    }
       	    }
            resolve(true)        
        })
    }

    dump(idb, sname) {
        return new Promise(function(resolve) {
            let tactn = idb.transaction(sname, "readonly")
            let osc = tactn.objectStore(sname).openCursor()
            var cont=[]
            osc.onsuccess = function(e) {
                let cursor = e.target.result
                if (cursor) {
                    cont.push(cursor.value)
                    cursor.continue()
                }
            } 
            tactn.oncomplete = function() {
                idb.close()
                resolve(cont)
            }	
        })
    }

    read(sname, key) {
        var dname=this.dname
	    return new Promise(function(resolve) {
		    var r = indexedDB.open(dname)
   		    r.onsuccess = function(e) {
			    var idb = r.result
	    	    let tactn = idb.transaction(sname)
		        let store = tactn.objectStore(sname)
    		    let data = store.get(key)
		        data.onsuccess = function() {
    		        resolve(data.result)
	    	    }
			    tactn.oncomplete = function() {
    	    	    idb.close()
	    	    }
		    }
	    })
    }
    
    write(sname, obj, key) {
        var dname = this.dname
        return new Promise(function(resolve) {
	        var r = indexedDB.open(dname)
   	        r.onsuccess = function(e) {
		        let idb = r.result
	   	        let tactn = idb.transaction(sname, "readwrite")
	            let store = tactn.objectStore(sname)
	            let ru
	            if(key !== undefined && key.length > 0) {
    	            ru = store.put(obj, key)
	            }     
    	        else {
    	            ru = store.put(obj)
    	        }     
		        ru.onsuccess = function() {
    		        resolve(idb)
	    	    }    	        
		        tactn.oncomplete = function() {
        	        idb.close()
	   	        }
	        }
        })
    }   
    
    remove(sname, key) {
        var dname = this.dname
        return new Promise(function(resolve) {
            var r = indexedDB.open(dname)
   	        r.onsuccess = function(e) {
   	            let idb = r.result
                let tactn = idb.transaction(sname, "readwrite")
                let store = tactn.objectStore(sname) 
                let rd = store.delete(key)
		        rd.onsuccess = function() {
    		        resolve(idb)
	    	    }
   	        }
        })
    } 
    
    getIndex(sname, iname, value) {
        var dname = this.dname
        return new Promise(function(resolve) {
            var r = indexedDB.open(dname)
   	        r.onsuccess = function(e) {
   	            let idb = r.result
                let tactn = idb.transaction(sname, "readwrite")
                let store = tactn.objectStore(sname) 
		        if(store.indexNames.contains(iname)) {
                    let index = store.index(iname)	
                    let info = index.getAllKeys(value)
                    info.onsuccess = function(e) {
		                resolve(info.result)
                    } 
		        }  
		        else {
		            console.log(`Index '${iname}' not found.`)
		        }
     
   	        }
        })        
    }
    
    kill(dname) {
        return new Promise(function(resolve) {
            var k = indexedDB.deleteDatabase(dname)
            k.onsuccess = function(e) {
                resolve(k)
            }    
        })    
    }
}

