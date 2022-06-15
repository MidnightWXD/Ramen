const Engineer = require('../lib/Engineer');

describe('Engineer', () => {
    describe('Initialization', () => {
        it('Can set github via constructor arguments', () => {
            const engineer = new Engineer('John', 1, 'John@gmail.com', 'JohnGithub');
            expect(engineer.getGithub()).toBe('JohnGithub');
        });

        it('getRole should return "Engineer"', () => {
            const engineer = new Engineer('John', 1, 'John@gmail.com', 'JohnGithub');
            expect(engineer.getRole()).toBe('Engineer');
        });

        it('Can get github via getGithub', () => {
            const engineer = new Engineer('John', 1, 'John@gmail.com', 'JohnGithub');
            expect(engineer.getGithub()).toBe('JohnGithub');
        });
    });
});
