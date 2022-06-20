import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiServerUrl}/api/empoyee/all`);
    }

    public getEmployee(id: number): Observable<Employee> {
        return this.http.get<Employee>(`${this.apiServerUrl}/api/empoyee/find/${id}`);
    }

    public addEmployees(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiServerUrl}/api/empoyee/add`, employee);
    }

    public updateEmployees(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiServerUrl}/api/empoyee/update`, employee);
    }

    public deleteEmployees(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/empoyee/delete/${id}`);
    }
}