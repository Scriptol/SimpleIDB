# SimpleIDB

Class interface to IndexedDB.

Demo: [SimpleIDB Demo](https://www.scriptol.com/javascript/demoIDB.html)



## Getting Started

### Install

The script is loaded in a web page from the server with this command:

`<script type="text/javascript" src="SimpleIDB.js"></script>`

Since the functions return a promise and are called with await, they must be called from an async function.

### Define an instance

`var cidb = SimpleIDB()`

### Open the database

`var idb = await cidb.open("basename", "storename", schema)`

A simple schema may have the form:

`{ keyPath: "name"}`

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

### Remove a record from the database

`await cidb.remove("storename", key)`

The key here also is the value of the property defined in keyPath or an identifier is no schema is given.

---
&copy; 2018 [Scriptol.com](https://www.scriptol.com/)