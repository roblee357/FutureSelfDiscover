

var table;
var previous_search = "";

//$(document).ready(function() {
function tableCreate2(data) {
  // $.ajax({
   // url: url,
    // success: function(data){
      console.log(data.Jobs[0])
      table = $('#table').dataTable({
        "initComplete": function () {
            var api = this.api();
            api.$('td').click( function () {
              console.log("Fetching jobs. Please stand by... " + previous_search);
              if (this.innerHTML != previous_search && !this.innerHTML.includes('http')){
                console.log("length" + api.search.length);
                api.search( this.innerHTML ).draw()  ;
                     previous_search = this.innerHTML;  
                   } else {
                    console.log("Matching potato pants!");
                      api.search( "" ).draw()  ;
                      previous_search = this.innerHTML;  
                    }
              
              } );
          }
        ,
        "pageLength": 25,
        "oLanguage": {
           "sSearch": "Filter Results"
         }
        data: data.Jobs,
        columns: [{
          data: 'JvId',
          title: 'Job ID'
        },{
          data: 'JobTitle',
          title: 'Job Title'
        },{
          data: 'Company',
          title: 'Company'
        },{
          data: 'AccquisitionDate',
          title: 'Date Posted'
        },{
          data: 'URL',
          title: 'URL'
        },{
          data: 'Location',
          title: 'Location'
        }],

  "columnDefs": [ {
    "targets": 4,
    "data": "download_link",
    "render": function ( data, type, row, meta ) {
      return '<a href="'+data+'" target="_blank">Apply</a>';
    }
  } ]


      });
    }
  // })
// };

// $(document).ready(function() {
//     $('#table').DataTable( {
//         "initComplete": function () {
//             var api = this.api();
//             api.$('td').click( function () {
//                 api.search( this.innerHTML ).draw();
//             } );
//         }
//     } );
// } );

function fetch_Occupations(jobName ,location ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 ) {
      var raw_response = document.getElementById('raw_response');
      raw_response.innerHTML = this.responseText;
      jobs_json = JSON.parse(this.responseText);
         //   document.getElementById("demo").innerHTML = JSON.stringify(jobs_json.Jobs,null,'\t');
         tableCreateOccupations(jobs_json);
       }
     };
     keyword = document.getElementById("keyword").value;
     keyword = encodeURIComponent(keyword.trim());
// https://api.careeronestop.org/v1/occupation/bSzANWeySBZwyEB/developer/Y/0/10
     xhttp.open("GET", "https://api.careeronestop.org/v1/occupation/bSzANWeySBZwyEB/" + keyword + "/Y/0/10", true);
     xhttp.setRequestHeader('Authorization','Bearer hpC99KhTcsZFp6AyxI/uJFOwkjXPy6+8IVSpPV0eKL7nnP/uWioTvtdsV2Nvg+J9KeQz6rfVFAwuD7nsTX961g==');
     xhttp.send();     
     //return jobs_json;
   }
   function tableCreateOccupations(jobs_json) {

    var RecordCount = document.getElementById('RecordCount');
    RecordCount.innerHTML = jobs_json.RecordCount
    var DidYouMean = document.getElementById('DidYouMean');
    DidYouMean.innerHTML = jobs_json.DidYouMean
    var AutoCorrection = document.getElementById('AutoCorrection');
    AutoCorrection.innerHTML = jobs_json.AutoCorrection


    var table_insert = document.getElementById('table_insert');
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < jobs_json.Jobs.length; i++) {
      var tr = document.createElement('tr');
      if (i == 0 ) {
        var th1 = document.createElement('td');
        th1.appendChild(document.createTextNode("Job Title"))
        tr.appendChild(th1)
        var th2 = document.createElement('td');
        th2.appendChild(document.createTextNode("Company"))
        tr.appendChild(th2)
        var th3 = document.createElement('td');
        th3.appendChild(document.createTextNode("Location"))
        tr.appendChild(th3)
        var th4 = document.createElement('td');
        th4.appendChild(document.createTextNode("LocationCount"))
        tr.appendChild(th4)
        tbdy.appendChild(tr);
      } else {
         var th1 = document.createElement('td');
         var a = document.createElement('a');
         a.href = jobs_json.Jobs[i].URL;
         a.title = jobs_json.Jobs[i].JobTitle;
         a.appendChild(document.createTextNode(jobs_json.Jobs[i].JobTitle))
         th1.appendChild(a);
         tr.appendChild(th1)
         var th2 = document.createElement('td');
         th2.appendChild(document.createTextNode(jobs_json.Jobs[i].Company))
         tr.appendChild(th2)
         var th3 = document.createElement('td');
         th3.appendChild(document.createTextNode(jobs_json.Jobs[i].Location));
         tr.appendChild(th3)
         var th4 = document.createElement('td');
         th4.appendChild(document.createTextNode(jobs_json.Jobs[i].LocationCount));
         tr.appendChild(th4)
         tbdy.appendChild(tr);
     }
   }
   tbl.appendChild(tbdy);
   table_insert.appendChild(tbl)
 }


function fetch_jobs(jobName ,location ) {

  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 ) {
      //var raw_response = document.getElementById('raw_response');
      //raw_response.innerHTML = this.responseText;
      jobs_json = JSON.parse(this.responseText);
         //   document.getElementById("demo").innerHTML = JSON.stringify(jobs_json.Jobs,null,'\t');
         //tableCreate(jobs_json);
         tableCreate2(jobs_json);
       }
     };
     jobName = document.getElementById("jname").value;
     location = document.getElementById("lname").value;
     distance = document.getElementById("distName").value;
     jobName = encodeURIComponent(jobName.trim());
     location = encodeURIComponent(location.trim());
     distance = encodeURIComponent(distance.trim());
     xhttp.open("GET", "https://api.careeronestop.org/v1/jobsearch/bSzANWeySBZwyEB/" + jobName + "/" + location + "/" + distance + "/jobtitle/ASC/1/1000/60", true);
     xhttp.setRequestHeader('Authorization','Bearer hpC99KhTcsZFp6AyxI/uJFOwkjXPy6+8IVSpPV0eKL7nnP/uWioTvtdsV2Nvg+J9KeQz6rfVFAwuD7nsTX961g==');
     xhttp.send();     
     //return jobs_json;
   }
   function tableCreate(jobs_json) {
    var table_insert = document.getElementById('table_insert');
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < jobs_json.Jobs.length; i++) {
      var tr = document.createElement('tr');
      if (i == 0 ) {
        var th1 = document.createElement('td');
        th1.appendChild(document.createTextNode("Job Title"))
        tr.appendChild(th1)
        var th2 = document.createElement('td');
        th2.appendChild(document.createTextNode("Company"))
        tr.appendChild(th2)
        var th3 = document.createElement('td');
        th3.appendChild(document.createTextNode("Location"))
        tr.appendChild(th3)
        var th4 = document.createElement('td');
        th4.appendChild(document.createTextNode("LocationCount"))
        tr.appendChild(th4)
        tbdy.appendChild(tr);
      } else {
         var th1 = document.createElement('td');
         var a = document.createElement('a');
         a.href = jobs_json.Jobs[i].URL;
         a.title = jobs_json.Jobs[i].JobTitle;
         a.target="_blank"
         a.appendChild(document.createTextNode(jobs_json.Jobs[i].JobTitle))
         th1.appendChild(a);
         tr.appendChild(th1)
         var th2 = document.createElement('td');
         th2.appendChild(document.createTextNode(jobs_json.Jobs[i].Company))
         tr.appendChild(th2)
         var th3 = document.createElement('td');
         th3.appendChild(document.createTextNode(jobs_json.Jobs[i].Location));
         tr.appendChild(th3)
         var th4 = document.createElement('td');
         th4.appendChild(document.createTextNode(jobs_json.Jobs[i].LocationCount));
         tr.appendChild(th4)
         tbdy.appendChild(tr);
     }
   }
   tbl.appendChild(tbdy);
   table_insert.appendChild(tbl)
 }
 document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('fetch_button').disabled = true;
}, false);

 function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}


function fast_growing_job_report(jobName ,location ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 ) {
      // jobs_json = JSON.parse(this.responseText);
               var jobs_json = [
               {"Occupations":[{"Rank":11,"ID":"1","OccupationTitle":"Physical therapist assistants","EstYear":"2018","ProjYear":"2028","PercentChange":"27","StateAbbrev":"US","StateName":"United States","StateFips":"00","Quartitle":"2","Definition":"Median wage is between $39,100 to $61,200 per year","TypicalEducation":"Associate's degree","SocCode":"312021","EducationTitle":[{"Name":"Associate's degree","Value":"4294967290"}],"EstimatedEmployment":"98,400","ProjectedEmployment":"125,000","ProjectedAnnualJobOpening":"16,500","JobFamily":"31","OptStatus":"101000000","NodeID":"2","Level":"edu4","Median":null,"Annualizedwage":null,"HourlyWage":null},{"Rank":50,"ID":"10","OccupationTitle":"Healthcare social workers","EstYear":"2018","ProjYear":"2028","PercentChange":"17","StateAbbrev":"US","StateName":"United States","StateFips":"00","Quartitle":"2","Definition":"Median wage is between $39,100 to $61,200 per year","TypicalEducation":"Master's degree","SocCode":"211022","EducationTitle":[{"Name":"Master's degree or higher","Value":"4294967291"}],"EstimatedEmployment":"180,500","ProjectedEmployment":"211,100","ProjectedAnnualJobOpening":"22,200","JobFamily":"21","OptStatus":"101000000","NodeID":"2","Level":null,"Median":null,"Annualizedwage":null,"HourlyWage":null},{"Rank":6,"ID":"10515","OccupationTitle":"Information security analysts","EstYear":"2018","ProjYear":"2028","PercentChange":"32","StateAbbrev":"US","StateName":"United States","StateFips":"00","Quartitle":"1","Definition":"Median wage is greater than $61,200 per year","TypicalEducation":"Bachelor's degree","SocCode":"151122","EducationTitle":[{"Name":"Bachelor's degree","Value":"4294967292"}],"EstimatedEmployment":"112,300","ProjectedEmployment":"147,700","ProjectedAnnualJobOpening":"12,800","JobFamily":"15","OptStatus":"101000000","NodeID":"2","Level":"edu3","Median":null,"Annualizedwage":null,"HourlyWage":null},{"Rank":478,"ID":"17520","OccupationTitle":"Secondary school teachers, except special and career/technical education","EstYear":"2018","ProjYear":"2028","PercentChange":"4","StateAbbrev":"US","StateName":"United States","StateFips":"00","Quartitle":"1","Definition":"Median wage is greater than $61,200 per year","TypicalEducation":"Bachelor's degree","SocCode":"252031","EducationTitle":[{"Name":"Bachelor's degree","Value":"4294967292"}],"EstimatedEmployment":"1,072,500","ProjectedEmployment":"1,110,600","ProjectedAnnualJobOpening":"80,300","JobFamily":"25","OptStatus":"101000000","NodeID":"2","Level":"edu3","Median":null,"Annualizedwage":null,"HourlyWage":null},{"Rank":61,"ID":"15","OccupationTitle":"Business teachers, postsecondary","EstYear":"2018","ProjYear":"2028","PercentChange":"15","StateAbbrev":"US","StateName":"United States","StateFips":"00","Quartitle":"1","Definition":"Median wage is greater than $61,200 per year","TypicalEducation":"Doctoral or professional degree","SocCode":"251011","EducationTitle":[{"Name":"Master's degree or higher","Value":"4294967291"}],"EstimatedEmployment":"108,000","ProjectedEmployment":"123,900","ProjectedAnnualJobOpening":"11,200","JobFamily":"25","OptStatus":"101000000","NodeID":"2","Level":null,"Median":null,"Annualizedwage":null,"HourlyWage":null},{"Rank":244,"ID":"3510","OccupationTitle":"Statistical assistants","EstYear":"2018","ProjYear":"2028","PercentChange":"8","StateAbbrev":"US","StateName":"United States","StateFips":"00","Quartitle":"2","Definition":"Median wage is between $39,100 to $61,200 per year","TypicalEducation":"Bachelor's degree","SocCode":"439111","EducationTitle":[{"Name":"Bachelor's degree","Value":"4294967292"}],"EstimatedEmployment":"13,100","ProjectedEmployment":"14,100","ProjectedAnnualJobOpening":"1,800","JobFamily":"43","OptStatus":"101000000","NodeID":"2","Level":"edu3","Median":null,"Annualizedwage":null,"HourlyWage":null},{"Rank":422,"ID":"3534","OccupationTitle":"Receptionists and information clerks","EstYear":"2018","ProjYear":"2028","PercentChange":"5","StateAbbrev":"US","StateName":"United States","StateFips":"00","Quartitle":"3","Definition":"Median wage is between $28,750 to $39,100 per year","TypicalEducation":"High school diploma or equivalent","SocCode":"434171","EducationTitle":[{"Name":"High school diploma or equivalent","Value":"4294967293"}],"EstimatedEmployment":"1,101,500","ProjectedEmployment":"1,160,800","ProjectedAnnualJobOpening":"157,900","JobFamily":"43","OptStatus":"101000000","NodeID":"2","Level":"edu7","Median":null,"Annualizedwage":null,"HourlyWage":null},{"Rank":487,"ID":"17521","OccupationTitle":"Architectural and engineering managers","EstYear":"2018","ProjYear":"2028","PercentChange":"3","StateAbbrev":"US","StateName":"United States","StateFips":"00","Quartitle":"1","Definition":"Median wage is greater than $61,200 per year","TypicalEducation":"Bachelor's degree","SocCode":"119041","EducationTitle":[{"Name":"Bachelor's degree","Value":"4294967292"}],"EstimatedEmployment":"192,500","ProjectedEmployment":"197,900","ProjectedAnnualJobOpening":"14,600","JobFamily":"11","OptStatus":"101000000","NodeID":"2","Level":"edu3","Median":null,"Annualizedwage":null,"HourlyWage":null},{"Rank":489,"ID":"17522","OccupationTitle":"Butchers and meat cutters","EstYear":"2018","ProjYear":"2028","PercentChange":"3","StateAbbrev":"US","StateName":"United States","StateFips":"00","Quartitle":"3","Definition":"Median wage is between $28,750 to $39,100 per year","TypicalEducation":"No formal educational credential","SocCode":"513021","EducationTitle":[{"Name":"Some high school","Value":"4294967288"}],"EstimatedEmployment":"135,500","ProjectedEmployment":"139,500","ProjectedAnnualJobOpening":"17,400","JobFamily":"51","OptStatus":"101000000","NodeID":"2","Level":null,"Median":null,"Annualizedwage":null,"HourlyWage":null},{"Rank":467,"ID":"3539","OccupationTitle":"Middle school teachers, except special and career/technical education","EstYear":"2018","ProjYear":"2028","PercentChange":"4","StateAbbrev":"US","StateName":"United States","StateFips":"00","Quartitle":"2","Definition":"Median wage is between $39,100 to $61,200 per year","TypicalEducation":"Bachelor's degree","SocCode":"252022","EducationTitle":[{"Name":"Bachelor's degree","Value":"4294967292"}],"EstimatedEmployment":"615,700","ProjectedEmployment":"637,100","ProjectedAnnualJobOpening":"48,300","JobFamily":"25","OptStatus":"101000000","NodeID":"2","Level":"edu3","Median":null,"Annualizedwage":null,"HourlyWage":null}],"RecordCount":601,"AreaValidationErr":"","AreaRecordCountList":[{"Item":"US","Count":601,"Value":null}],"EducationTitle":{"UndoList":[],"FilterList":[{"Item":"High school diploma or equivalent (193)","Count":193,"Value":"4294967293"},{"Item":"Bachelor's degree (156)","Count":156,"Value":"4294967292"},{"Item":"Master's degree or higher (99)","Count":99,"Value":"4294967291"},{"Item":"Some high school (74)","Count":74,"Value":"4294967288"},{"Item":"Some college (40)","Count":40,"Value":"4294967289"},{"Item":"Associate's degree (39)","Count":39,"Value":"4294967290"}]}}];
    //   { "name": "abc", "age": 50 },
    //   { "age": "25", "hobby": "swimming" },
    //   { "name": "xyz", "hobby": "programming" }
    // ];
      // var table_insert = document.getElementById('table_insert');
      // table_insert.removeChild();
      // table_insert.appendChild(document.createTextNode(this.responseText));
      document.getElementById('table_insert').value = this.responseText
      buildHtmlTable('#excelDataTable', jobs_json)
        }
     };
     report_type = document.getElementById("report_type").value;
     report_type = encodeURIComponent(report_type.trim());
     xhttp.open("GET", "https://api.careeronestop.org/v1/occupationsreports/bSzANWeySBZwyEB/" + report_type + "/US/0/0/0/0/10", true);
     xhttp.setRequestHeader('Authorization','Bearer hpC99KhTcsZFp6AyxI/uJFOwkjXPy6+8IVSpPV0eKL7nnP/uWioTvtdsV2Nvg+J9KeQz6rfVFAwuD7nsTX961g==');
     xhttp.send();     
     //return jobs_json;

}


// var myList  = JSON.parse(yourJsonString);
// Builds the HTML Table out of myList.
function buildHtmlTable(selector,myList) {
  var columns = addAllColumnHeaders(myList, selector);

  for (var i = 0; i < myList.length; i++) {
    var row$ = $('<tr/>');
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = myList[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append($('<td/>').html(cellValue));
    }
    $(selector).append(row$);
  }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList, selector) {
  var columnSet = [];
  var headerTr$ = $('<tr/>');

  for (var i = 0; i < myList.length; i++) {
    var rowHash = myList[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
      }
    }
  }
  $(selector).append(headerTr$);

  return columnSet;
}
   

   function fast_growing_job_report_backup(jobName ,location ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 ) {
      // jobs_json = JSON.parse(this.responseText);
      // var table_insert = document.getElementById('table_insert');
      // table_insert.removeChild();
      // table_insert.appendChild(document.createTextNode(this.responseText));
      document.getElementById('table_insert').value = this.responseText
        }
     };
     report_type = document.getElementById("report_type").value;
     report_type = encodeURIComponent(report_type.trim());
     xhttp.open("GET", "https://api.careeronestop.org/v1/occupationsreports/bSzANWeySBZwyEB/" + report_type + "/US/0/0/0/0/10", true);
     xhttp.setRequestHeader('Authorization','Bearer hpC99KhTcsZFp6AyxI/uJFOwkjXPy6+8IVSpPV0eKL7nnP/uWioTvtdsV2Nvg+J9KeQz6rfVFAwuD7nsTX961g==');
     xhttp.send();     
     //return jobs_json;
   }

   /**
 * ***Project JSON Table Viewer***
 * 
 * A jQuery based plugin to display Javascript Objects/Arrays into a table based structure.
 * 
 * **Sample Usage:** [HTML]
 * 
 * <pre id='jsonView'></pre>
 * <script src="./path/to/jsonViewer.js"></script>
 * <script>
 *  var options={bootstrap:true,tableBordered:true}; //The options for conversion, check below for list of all options.
 *  var jsonObject={name:"Aniruddha Sarkar",country:"India"}; //The object to be converted into table.
 *  $('#jsonView').jsonTable(jsonObject,options); //Displaying the JS Object/Array
 * </script>
 * 
 * **Options:**
 * 1. bootstrap     : Whether to use the bootstrap classes or not. Default=true.
 * 2. arrayIndex    : Whether to view the indices of array elements. Default=false.
 * 3. tableBordered : Whether to use borders in table. Requires bootstrap to be enabled. Default=false.
 * 4. objectClass   : The class which to be used for coloring objects. Requires bootstrap to be enabled. Default="warning".
 * 5. arrayClass    : The class which to be used for coloring array. Requires bootstrap to be enabled. Default="info".
 * 6. valueClass    : The class which to be used for coloring primitive values. Requires bootstrap to be enabled. Default="success".
 * 7. nullClass     : The class which to be used for coloring null values. Requires bootstrap to be enabled. Default="danger".
 */

(function($){
    $.fn.jsonTable=function(__data,options={}){
        /** Checks if bootstrap is selected and available, or if bootstrap is unselected. */
        if( ! options.bootstrap || ( options.bootstrap && typeof $().modal == 'function')){

            /** Initialising default values if not set. */
            if(!options.hasOwnProperty('bootstrap'))options.bootstrap=true;
            if(!options.hasOwnProperty('arrayIndex'))options.arrayIndex=false;
            if(options.bootstrap){
                if(!options.hasOwnProperty('tableBordered'))options.tableBordered=false;
                if(!options.objectClass)options.objectClass="warning";
                if(!options.arrayClass)options.arrayClass="info";
                if(!options.nullClass)options.nullClass="danger";
                if(!options.valueClass)options.valueClass="success";
            }

            
            /** Checks if the data provided is an array. */
            if(Array.isArray(__data)){
                this.html(parseArray(__data,options));
            }
            
            /** Checks if the data provided is an object. */
            else if(__data instanceof Object){
                this.html(parseObject(__data,options));
            }
            
            /** Checks if the data provided is a primitive type. */
            else if(__data){
                this.html(__data);
            }
            
            /** Checks if the data provided is null. */
            else {
                this.html("");
            }
        }
        else{
            this.html("<div "+(options.bootstrap?"class='danger'":"")+">Bootstrap needs to be loaded before this plugin is loaded!</div>");
        }
    }
}(jQuery));

/**
 * Generates HTML table based on the __array parameter, using the options provided.
 * @param {*} __array The JS array which is to be converted to HTML.
 * @param {*} options The JS Object containing optional parameters for the conversion.
 * @returns String containing the HTML Output.
 */
function parseArray(__array,options){
    var data1="";
    var data2="";
    for (const __key in __array) {
        var __value=__array[__key];
        if(Array.isArray(__value)){
            data1+="<th "+(options.bootstrap?"class='"+(options.arrayClass)+"'":"")+">"+__key+"</th>";
            data2+="<td "+(options.bootstrap?"class='"+(options.arrayClass)+"'":"")+">"+parseArray(__value,options)+"</td>";
        }
        else if(__value instanceof Object){
            data1+="<th "+(options.bootstrap?"class='"+(options.objectClass)+"'":"")+">"+__key+"</th>";
            data2+="<td "+(options.bootstrap?"class='"+(options.objectClass)+"'":"")+">"+parseObject(__value,options)+"</td>";
        }
        else if(__value){
            data1+="<th "+(options.bootstrap?"class='"+(options.valueClass)+"'":"")+">"+__key+"</th>";
            data2+="<td "+(options.bootstrap?"class='"+(options.valueClass)+"'":"")+">"+__value+"</td>";
        }
        else{
            data1+="<th "+(options.bootstrap?"class='"+(options.nullClass)+"'":"")+">"+__key+"</th>";
            data2+="<td "+(options.bootstrap?"class='"+(options.nullClass)+"'":"")+">"+__value+"</td>";
        }
    }
    return "<table "+(options.bootstrap?"class='table table-bordered "+(options.arrayClass)+"'":"")+">"+(options.arrayIndex?"<thead>"+data1+"</thead>":"")+"<tbody><tr>"+data2+"</tr></tbody></table>";
}

/**
 * Generates HTML table based on the __array parameter, using the options provided.
 * @param {*} __object The JS array which is to be converted to HTML.
 * @param {*} options The JS Object containing optional parameters for the conversion.
 * @returns String containing the HTML Output.
 */
function parseObject(__object,options){
    var data="<table "+(options.bootstrap?"class='table "+(options.tableBordered?"table-bordered":"")+" "+(options.objectClass)+"'":"")+">";
    for (const __key in __object) {
        var __value=__object[__key];
        if(Array.isArray(__value)){
            data+="<tr "+(options.bootstrap?"class='"+(options.arrayClass)+"'":"")+"><td>"+__key+"</td><td "+(options.bootstrap?"class='"+(options.arrayClass)+"'":"")+">"+parseArray(__value,options)+"</td></tr>";
        }
        else if(__value instanceof Object){
            data+="<tr "+(options.bootstrap?"class='"+(options.objectClass)+"'":"")+"><td>"+__key+"</td><td "+(options.bootstrap?"class='"+(options.objectClass)+"'":"")+">"+parseObject(__value,options)+"</td></tr>";
        }
        else if(__value){
            data+="<tr "+(options.bootstrap?"class='"+(options.valueClass)+"'":"")+"><td>"+__key+"</td><td "+(options.bootstrap?"class='"+(options.valueClass)+"'":"")+">"+__value+"</td></tr>";
        }
        else{
            data+="<tr "+(options.bootstrap?"class='"+(options.nullClass)+"'":"")+"><td>"+__key+"</td><td "+(options.bootstrap?"class='"+(options.nullClass)+"'":"")+">"+__value+"</td></tr>";
        }
    }
    return data+"</table>";
}