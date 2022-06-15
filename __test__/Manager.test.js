const Manager = require('../lib/Manager');

describe('Manager', () => {
    describe('Initialization', () => {
        it('Can set officeNumber via constructor arguments', () => {
            const manager = new Manager('John', 1, 'John@gmail.com', '666');
            expect(manager.getOfficeNumber()).toBe('666');
        });

        it('getRole should return "Manager"', () => {
            const manager = new Manager('John', 1, 'John@gmail.com', '666');
            expect(manager.getRole()).toBe('Manager');
        });

        it('Can get officeNumber via getOfficeNumber', () => {
            const manager = new Manager('John', 1, 'John@gmail.com', '666');
            expect(manager.getOfficeNumber()).toBe('666');
        });
    });
});