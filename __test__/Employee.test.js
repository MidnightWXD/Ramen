const Employee = require('../lib/Employee');

describe('Employee', () => {
    describe('Initialization', () => {
        it('Can instantinate Employee instance', () => {
            const employee = new Employee('John', 1, 'John@gmail.com');
            expect(employee).toBeInstanceOf(Employee);
        });

        it('Can set name via constructor arguments', () => {
            const employee = new Employee('John', 1, 'John@gmail.com');
            expect(employee.getName()).toBe('John');
        });

        it('Can set id via constructor arguments', () => {
            const employee = new Employee('John', 1, 'John@gmail.com');
            expect(employee.getId()).toBe(1);
        });

        it('Can set email via constructor arguments', () => {
            const employee = new Employee('John', 1, 'John@gmail.com');
            expect(employee.getEmail()).toBe('John@gmail.com');
        });

        it('Can get name via getName', () => {
            const employee = new Employee('John', 1, 'John@gmail.com');
            expect(employee.getName()).toBe('John');
        });

        it('Can get id via getId', () => {
            const employee = new Employee('John', 1, 'John@gmail.com');
            expect(employee.getId()).toBe(1);
        });

        it('Can get email via getEmail', () => {
            const employee = new Employee('John', 1, 'John@gmail.com');
            expect(employee.getEmail()).toBe('John@gmail.com');
        });

        it('getRole should return "Employee"', () => {
            const employee = new Employee('John', 1, 'John@gmail.com');
            expect(employee.getRole()).toBe('Employee');
        });
    });
});