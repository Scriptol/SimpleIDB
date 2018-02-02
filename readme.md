# SimpleIDB

Class interface to IndexedDB.

Basic demo: [SimpleIDB Basic Demo](https://www.scriptol.com/javascript/demoIDB.html)
Index demo: [SimpleIDB Index Demo](https://www.scriptol.com/javascript/demoIndex.html)



## Getting Started

### Install

The script is loaded in a web page from the server with this command:

`<script type="text/javascript" src="SimpleIDB.js"></script>`

Since the functions return a promise and are called with await, they must be called from an async function.

### Define an instance

`var cidb = SimpleIDB()`

### Open the database

`var idb = await cidb.open("basename", "storename", { schema: s, index: i })`

A simple schema may have the form:

`{ keyPath: "name"}`

A simple index may be:

`["icolor", "color", { unique: false }]`

The third parameter is optional or may holds only a schema or an index. The index option may be a single object or an array of objects.

### Fill the database

An array of objects is assigned to the main property of an object.
It may be loaded as a JSON file or, for the demo, embedded in the page.

`await cidb.fill(idb, "storename", data["mainprop"])`

### Dump the contents

`var cont = await cidb.dump(idb, "storename")`

Cont now how a list of objects, you can display dependant of their structure.

### Read a record

`var infos = await cidb.read("storename", key)`

The key is the value of the property defined in keyPath for a record.

### Add or replace a record

A record is added is the key does not exists, otherwise it is replaced by the new record.

`await cidb.write("storename`, obj)

The obj parameter is an object with the same structure as the other obects recorded.

### Search a record or a set of records matching a value in an index

`await cidb.getIndex("storename", "indexname", "value")`

An array of identifiers is returned. To get a record, use the read method with an identifier as argument.

### Remove a record from the database

`await cidb.remove("storename", key)`

The key here also is the value of the property defined in keyPath or an identifier if no schema is given.

### Delete a database

`await cidb.kill("databasename")`

An HTML file is included to delete a database, that is required if you change the schema or the index without upgrading the version.

---
&copy; 2018 [Scriptol.com](https://www.scriptol.com/)