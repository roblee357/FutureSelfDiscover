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
        var th2 = document.createElement('td');
        var th3 = document.createElement('td');
        th1.appendChild(document.createTextNode("Job Title"))
        th2.appendChild(document.createTextNode("Company"))
        th3.appendChild(document.createTextNode("Details & Apply"))
        tr.appendChild(th1)
        tr.appendChild(th2)
        tr.appendChild(th3)
        tbdy.appendChild(tr);
      } else {
       var th1 = document.createElement('td');
       var th2 = document.createElement('td');
       var th3 = document.createElement('td');
       th1.appendChild(document.createTextNode(jobs_json.Jobs[i].JobTitle))
       th2.appendChild(document.createTextNode(jobs_json.Jobs[i].Company))
       var a = document.createElement('a');
       a.href = jobs_json.Jobs[i].URL;
       a.title = jobs_json.Jobs[i].URL;
       a.appendChild(document.createTextNode("Link"));
  //th3.appendChild(document.createTextNode("Website: "));
  th3.appendChild(a);
  //th3.appendChild(document.createTextNode("."));
           //th3.appendChild(job_link)
           tr.appendChild(th1)
           tr.appendChild(th2)
           tr.appendChild(th3)
           tbdy.appendChild(tr);
         }
       }
       tbl.appendChild(tbdy);
       table_insert.appendChild(tbl)
     }
     document.addEventListener('DOMContentLoaded', (event) => {
      document.getElementById('fetch_button').disabled = true;
    }, false);