import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanagerapp';
  public employees: Employee[] | undefined;
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");

    if (mode === "add") {
      button.setAttribute("data-target", "#addEmployeeModal");
    }
    else if (mode === "edit") {
      this.editEmployee = employee;
      button.setAttribute("data-target", "#updateEmployeeModal");
    }
    else if (mode === "delete") {
      this.deleteEmployee = employee;
      button.setAttribute("data-target", "#deleteEmployeeModal");
    }

    container?.appendChild(button);
    button.click();
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];

    this.employees!.forEach(employee => {
      // -1 = it is not present
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    });

    this.employees = results;

    if (/*results.length === 0 ||*/ !key) {
      this.getEmployees();
    }
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById("add-employee-form")?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.addEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(id: number | undefined): void {
    this.employeeService.deleteEmployee(id!).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
