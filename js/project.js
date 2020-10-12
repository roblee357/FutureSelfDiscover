var url = "data.json";
var table;
$(document).ready(function() {
	$.ajax({
		url: url,
		success: function(data){
			console.log(data.Jobs[0])
			table = $('#table').dataTable({
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
				}]
			});
		}
	})
});