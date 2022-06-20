package be.dc.employeemanager.Service;

import be.dc.employeemanager.Exception.UserNotFoundException;
import be.dc.employeemanager.Model.Employee;
import be.dc.employeemanager.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepository repository;

    @Autowired
    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public Employee addEmployee(Employee employee) {
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return repository.save(employee);
    }

    public List<Employee> findAllEmployees() {
        return repository.findAll();
    }

    public Optional<Employee> findById(Long id) {
        return Optional.ofNullable(repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found")));

        //return repository.findById(id);
    }

    public Employee update(Employee employee) {
        return repository.save(employee);
    }

    public void delete(Long id) {
        Employee employee = repository.findById(id).get();
        repository.delete(employee);

        //repository.deleteEmployeeById(id);
    }
}
