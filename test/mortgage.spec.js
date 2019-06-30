const expect = require('chai').expect;
const Mortgage = require('../src/lib/Mortgage');

let mortgage = null;

/*This file is obsolete since I ended up rebuilding my mortgage calculator code and running the same tests on that with enzyme and jsdom*/
describe('Mortgage Calculator', () => {

    it('The class should construct properly', () => {
        mortgage = new Mortgage(200000,8.4,30,12);
        expect(mortgage).to.be.an.instanceof(Mortgage);
        expect(mortgage.principal).to.equal(200000);
        expect(mortgage.interest).to.equal(8.4);
        expect(mortgage.term).to.equal(30);
        expect(mortgage.period).to.equal(12);
    });

    it('With a principal of 2000000, an interest of 8.4%, a term of 30 years and a period of 12 payments per year, the class should return $1523.68', () => {
        mortgage = new Mortgage(200000,8.4,30,12);
        expect(mortgage.monthlyPayment()).to.equal(1523.68);
    });

    it('With a principal of 150000, an interest of 5%, a term of 15 years and a period of 12 payments per year it should return $1186.19', () => {
        mortgage = new Mortgage(150000,5,15,12);
        expect(mortgage.monthlyPayment()).to.equal(1186.19);
    });

    it('With a principal of 150000, an interest of 5%, a term of 30 years, and a period of 12 payments per year, it should return $805.23', () => {
        mortgage = new Mortgage(150000,5,30,12);
        expect(mortgage.monthlyPayment()).to.equal(805.23);
    });
});