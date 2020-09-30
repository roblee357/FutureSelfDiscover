function fetch_jobs(jobName ,location ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 ) {
      jobs_json = JSON.parse(this.responseText);
         //   document.getElementById("demo").innerHTML = JSON.stringify(jobs_json.Jobs,null,'\t');
         tableCreate(jobs_json);
       }
     };
     jobName = document.getElementById("jname").value;
     location = document.getElementById("lname").value;
     distance = document.getElementById("distName").value;
     jobName = encodeURIComponent(jobName.trim());
     location = encodeURIComponent(location.trim());
     distance = encodeURIComponent(distance.trim());
     xhttp.open("GET", "https://api.careeronestop.org/v1/jobsearch/bSzANWeySBZwyEB/" + jobName + "/" + location + "/" + distance + "/jobtitle/ASC/1/10/20", true);
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
      // var table_insert = document.getElementById('table_insert');
      // table_insert.removeChild();
      // table_insert.appendChild(document.createTextNode(this.responseText));
      document.getElementById('table_insert').value = this.responseText
      buildHtmlTable('#excelDataTable')
        }
     };
     report_type = document.getElementById("report_type").value;
     report_type = encodeURIComponent(report_type.trim());
     xhttp.open("GET", "https://api.careeronestop.org/v1/occupationsreports/bSzANWeySBZwyEB/" + report_type + "/US/0/0/0/0/10", true);
     xhttp.setRequestHeader('Authorization','Bearer hpC99KhTcsZFp6AyxI/uJFOwkjXPy6+8IVSpPV0eKL7nnP/uWioTvtdsV2Nvg+J9KeQz6rfVFAwuD7nsTX961g==');
     xhttp.send();     
     //return jobs_json;

}

     var myList = [
  { "name": "abc", "age": 50 },
  { "age": "25", "hobby": "swimming" },
  { "name": "xyz", "hobby": "programming" }
];

// Builds the HTML Table out of myList.
function buildHtmlTable(selector) {
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