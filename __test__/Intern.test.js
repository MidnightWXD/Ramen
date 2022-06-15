const Intern = require('../lib/Intern');

describe('Intern', () => {
    describe('Initialization', () => {
        it('Can set school via constructor arguments', () => {
            const intern = new Intern('John', 1, 'John@gmail.com', 'Toronto University');
            expect(intern.getSchool()).toBe('Toronto University');
        });

        it('getRole should return "Intern"', () => {
            const intern = new Intern('John', 1, 'John@gmail.com', 'JohnGithub');
            expect(intern.getRole()).toBe('Intern');
        });

        it('Can get school via getSchool', () => {
            const intern = new Intern('John', 1, 'John@gmail.com', 'JohnGithub');
            expect(intern.getSchool()).toBe('JohnGithub');
        });
    });
});