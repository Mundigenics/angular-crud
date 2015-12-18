$(function(){
	var operation = "A"; //"A"=Adding; "E"=Editing

	var selected_index = -1; //Index of the selected list item

	var tbChildren = localStorage.getItem("tbChildren");//Retrieve the stored data

	tbChildren = JSON.parse(tbChildren); //Converts string to object

	if(tbChildren == null) //If there is no data, initialize an empty array
		tbChildren = [];

	function Add(){
		var child = JSON.stringify({
			ID    : $("#txtID").val(),
			Name  : $("#txtName").val(),
			Age	  : $("#txtAge").val(),
			Group : $("#txtGroup").val(),
			Schedule : $("#txtSchedule").val()
		});
		tbChildren.push(child);
		localStorage.setItem("tbChildren", JSON.stringify(tbChildren));
		// alert("The data was saved.");
		return true;
	}

	function Edit(){
		tbChildren[selected_index] = JSON.stringify({
				ID    : $("#txtID").val(),
				Name  : $("#txtName").val(),
				Age   : $("#txtAge").val(),
				Phone : $("#txtGroup").val(),
				Email : $("#txtSchedule").val()
			});//Alter the selected item on the table
		localStorage.setItem("tbChildren", JSON.stringify(tbChildren));
		// alert("The data was edited.")
		operation = "A"; //Return to default value
		return true;
	}

	function Delete(){
		tbChildren.splice(selected_index, 1);
		localStorage.setItem("tbChildren", JSON.stringify(tbChildren));
		// alert("Client deleted.");
	}

	function List(){		
		$("#tblList").html("");
		$("#tblList").html(
			"<thead>"+
			"	<tr>"+
			"	<th></th>"+
			"	<th>ID</th>"+
			"	<th>Name</th>"+
			"	<th>Age</th>"+
			"	<th>Group</th>"+
			"	<th>Schedule</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);
		for(var i in tbChildren){
			var chi = JSON.parse(tbChildren[i]);
		  	$("#tblList tbody").append("<tr>"+
									 	 "	<td><img src='edit.png' alt='Edit"+i+"' class='btnEdit'/><img src='delete.png' alt='Delete"+i+"' class='btnDelete'/></td>" + 
										 "	<td>"+chi.ID+"</td>" + 
										 "	<td>"+chi.Name+"</td>" + 
										 "	<td>"+chi.Age+"</td>" +
										 "	<td>"+chi.Group+"</td>" + 
										 "	<td>"+chi.Schedule+"</td>" + 
		  								 "</tr>");
		}
	}

	$("#frmCadastre").live("submit",function(){		
		if(operation == "A")
			return Add();
		else
			return Edit();
	});

	List();

	$(".btnEdit").live("click", function(){

		operation = "E";
		selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
		
		var chi = JSON.parse(tbChildren[selected_index]);
		$("#txtID").val(chi.ID);
		$("#txtName").val(chi.Name);
		$("txtAge").val(chi.Age);
		$("#txtGroup").val(chi.Group);
		$("#txtSchedule").val(chi.Schedule);
		$("#txtID").attr("readonly","readonly");
		$("#txtName").focus();
	});

	$(".btnDelete").live("click", function(){
		selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
		Delete();
		List();
	});
});