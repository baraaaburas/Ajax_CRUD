$(document).ready(function () {
    GetEmployees();
});
function GetEmployees() {
    $.ajax({
        url: 'employee/GetEmployees',
        type: 'get',
        datatype: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                var object = '';
                object += '<tr>';
                object += '<td colspan="5">' + 'Employees not avaliable' + '</td>';
                object += '</tr>';
                $('#tblBody').html(object);
            } else {
                var object = '';
                $.each(response, function (index, employee) {
                    object += '<tr>';
                    object += '<td>' + employee.id + '</td>';
                    object += '<td>' + employee.name + '</td>';
                    object += '<td>' + employee.department.name + '</td>';
                    object += '<td>' + employee.position.name + '</td>';
                    object += '<td>' + `${employee.manager ? employee.manager.name : '-'}` + '</td>';
                    object += '<td> <a href="#" class="btn btn-info btn-sm"  onclick="Edit(' + employee.id + ')">Edit</a>';
                    object += '<a href="#" class="btn btn-danger btn-sm" onclick="Delete(' + employee.id + ')">Delete</a> </td >';
                });
                $('#tblBody').html(object);
            }
        },
        error: function () {
            alert('Unable to Read The Data');
        }
    });
}

function HideModal() {
    $('#EmployeeModal').modal('hide');
}
$('#hide').click(function () {
    $('#EmployeeModal').modal('hide');

})

$('#btnAdd').click(function () {
    $('#EmployeeModal').modal('show');
    $('#modalTitle').text('Add Employee');
})


function Insert() {
    debugger;
    let employee =
    {
        Name: $('#Name').val(),
        DepartmentId: $('#DepartmentSelect').val(),
        PositionId: $('#PositionSelect').val(),
        ManagerId: $('#ManagersSelect').val(),
        Level: $('#Level').val()
    };


    $.ajax({
        url: '/employee/Insert',
        data: employee,
        type: 'post',


        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to save data');
            }
            else {
                GetEmployees();
                HideModal();
                alert(response);
            }
        },
        error: function () {
            alert('Unable to save data');
        }
    });
}
function Update() {
    debugger;
    let employee =
    {
        Id: $('#EditId').val(),
        Name: $('#EditName').val(),
        DepartmentId: $('#DepartmentSelectEdit').val(),
        PositionId: $('#PositionSelectEdit').val(),
        ManagerId: $('#ManagersSelectEdit').val(),
        Level: $('#EditLevel').val()
    };
    $.ajax({
        url: '/employee/Edit' ,
        type: 'put',
        contentType: 'application/json',
        datatype: 'json',
        data: JSON.stringify(employee),
        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable to read Data');
            }
            else if (response.length == 0) {
                alert('Data not avalible with id ' + id);
            }
            else {
                $('#EmployeeEdit').modal('hide');
                GetEmployees();
            
            }


        },
        error: function () {
            alert('Unable to read data');
        }
    })
}

function Edit(id) {
    $.ajax({
        url: '/employee/Edit?id=' + id,
        type: 'get',
        contentType: 'application/json;charset=utf-8',
        datatype: 'json',
        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable to read Data');
            }
            else if (response.length == 0) {
                alert('Data not avalible with id ' + id);
            }
            else {
                $('#EmployeeEdit').modal('show');
                $('#EditId').val(response.id);
                $('#EditName').val(response.name);
                $('#DepartmentSelectEdit').val(response.departmentId);
                $('#PositionSelectEdit').val(response.positionId);
                $('#ManagersSelectEdit').val(response.managerId);
                $('#EditLevel').val(response.level);
            }


        },
        error: function () {
            alert('Unable to read data');
        }
    })
}


function Delete(id) {
    if (confirm('Are You sure you want to delete this employee?')) {
        $.ajax({
            url: 'employee/Delete?id=' + id,
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            datatype: 'json',
            success: function (response) {
                if (response == null || response == undefined) {
                    alert('Unable to delete data');
                }

                else {
                    GetEmployees();
                    alert(response);
                }


            },
            error: function () {
                alert('Unable to delete data');
            }
        })
    }

}

$('#EditHide').click(function () {
    $('#EmployeeEdit').modal('hide');
});



$(document).ready(function () {
    $("#searchInput").on("keyup", function () {
        var searchText = $(this).val().toLowerCase();
        $("#employeeTable tbody tr").each(function () {
            var name = $(this).find("td").text().toLowerCase();
            if (name.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

