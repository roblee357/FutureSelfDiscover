 # Project JSON Table Viewer
 
 A jQuery based plugin to display Javascript Objects/Arrays into a table based structure.

 ## Requirements

 * jQuery
 * Bootstrap (for colors!)
 
 ## Sample Usage: [HTML]
 
 ```
 <pre id='jsonView'></pre>

 <!-- import jQuery and bootstrap (if required) prior to this comment -->

 <script src="./path/to/jsonViewer.js"></script>

 <script>
  var options={bootstrap:true,tableBordered:true}; //The options for conversion, check below for list of all options.
  var jsonObject={name:"Aniruddha Sarkar",country:"India"}; //The object to be converted into table.
  $('#jsonView').jsonTable(jsonObject,options); //Displaying the JS Object/Array
 </script>
 ```
 
 ## Options:
 1. bootstrap     : Whether to use the bootstrap classes or not. Default=true.
 2. arrayIndex    : Whether to view the indices of array elements. Default=false.
 3. tableBordered : Whether to use borders in table. Requires bootstrap to be enabled. Default=false.
 4. objectClass   : The class which to be used for coloring objects. Requires bootstrap to be enabled. Default="warning".
 5. arrayClass    : The class which to be used for coloring array. Requires bootstrap to be enabled. Default="info".
 6. valueClass    : The class which to be used for coloring primitive values. Requires bootstrap to be enabled. Default="success".
 7. nullClass     : The class which to be used for coloring null values. Requires bootstrap to be enabled. Default="danger".

