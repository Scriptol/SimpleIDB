/*
    SimpleIDB    

    A class as interface to IndexedDB.
    
    (c) 2018 Scriptol.com - MIT License
*/

class SimpleIDB {
    open(dname, sname, schema) {
        this.dname=dname
	    return new Promise(function(resolve) {
    	    var r = window.indexedDB.open(dname)
		    r.onupgradeneeded = function() {
		        var idb = r.result
		        var store = idb.createObjectStore(sname, schema)
		    }
		    r.onsuccess = function() {
			    var idb = r.result
			    resolve(idb)
	        }
    	    r.onerror = function (e) {
			    alert("Enable to open IndexedDB, " + e.target.errorCode)
	        }    
	    })
    }
    
    fill(idb, sname, arr) {
        return new Promise(function(resolve) {
	        let tactn = idb.transaction(sname, "readwrite")
            var store = tactn.objectStore(sname)
	        for(var obj of arr) {
   	       	    store.put(obj)
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
    		        resolve(true)
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
    		        resolve(true)
	    	    }
   	        }
        })
    }      

}





