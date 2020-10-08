var url = "data.json";
var table;
$(document).ready(function() {
	$.ajax({
		url: url,
		success: function(data){
			console.log(data.Jobs[0])
			table = $('#table').dataTable({
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
					title: 'Accquisition Date'
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