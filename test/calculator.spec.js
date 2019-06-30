const React = require('react');
const chai = require('chai');
const { expect } = require('chai');
const enzyme = require('enzyme');
const chaiEnzyme = require('chai-enzyme');
const Input = require('../src/Input').default;
const App = require('../src/App').default;
const Adapter = require('enzyme-adapter-react-16')
const Calculator = require('../src/lib/Calculator');

chai.use(chaiEnzyme());

enzyme.configure({ adapter: new Adapter() });

//Calculator unit tests
describe('Calculator', () => {
    let calculator = null;

    beforeEach(() => {
        calculator = new Calculator();
    });

    it('should have an add function', () => {
        expect(calculator.add).to.exist;
    });

    it('should add 2 + 2 together correctly', () => {
        expect(calculator.add(2, 2)).to.equal(4);
    });

    it('should have a subtract function', () => {
        expect(calculator.subtract).to.exist;
    });

    it('should subtract 2 from 2 correctly', () => {
        expect(calculator.subtract(2, 2)).to.equal(0);
    });

    it('should have a multiply function', () => {
        expect(calculator.multiply).to.exist;
    });

    it('should multiply 3 by 3 correctly', () => {
        expect(calculator.multiply(3, 3)).to.equal(9)
    });

    it('should have a divide function', () => {
        expect(calculator.divide).to.exist;
    });

    it('should divide 12 by 3 correctly', () => {
        expect(calculator.divide(12, 3)).to.equal(4);
    });
});

let wrapper = null;

//App component unit tests
describe('App Component', () => {

    beforeEach(() => {
        wrapper = enzyme.mount(<App/>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('We should be able to create a new instance of App and it should have an initial state of balance 0, rate 0 term 15 and result \'\'', () => {
        expect(wrapper.state('balance')).to.equal(0);
        expect(wrapper.state('rate')).to.equal(0);
        expect(wrapper.state('term')).to.equal(15);
        expect(wrapper.state('result')).to.equal('');
    });

    it('App should have a function for updating input that changes the state', () => {
        wrapper.instance().updateInput('balance', 150000);
        expect(wrapper.state('balance')).to.equal(150000);
    });

    it('App should have a function for calculating the results', () => {
        expect(wrapper.state('result')).to.equal('');
        wrapper.instance().calculate();
        wrapper.update();
        expect(wrapper.exists('#output-p')).to.equal(true);
    });

    it('With a principal of 2000000, an interest of 8.4%, and a term of 30 years, calculating should return $1523.68', () => {
        wrapper.instance().updateInput('balance', 200000);
        wrapper.instance().updateInput('rate', 8.4);
        wrapper.instance().updateInput('term', 30);
        wrapper.instance().calculate();
        wrapper.update();
        expect(wrapper.find('#output').render().text()).to.equal('1523.68')
    });

    it('With a principal of 150000, an interest of 5%, and a term of 15 years, it should return $1186.19', () => {
        wrapper.instance().updateInput('balance', 150000);
        wrapper.instance().updateInput('rate', 5);
        wrapper.instance().updateInput('term', 15);
        wrapper.instance().calculate();
        wrapper.update();
        expect(wrapper.find('#output').render().text()).to.equal('1186.19');
    });

    it('With a principal of 150000, an interest of 5%, and a term of 30 years, it should return $805.23', () => {
        wrapper.instance().updateInput('balance', 150000);
        wrapper.instance().updateInput('rate', 5);
        wrapper.instance().updateInput('term', 30);
        wrapper.instance().calculate();
        wrapper.update();
        expect(wrapper.find('#output').render().text()).to.equal('805.23');
    });
});

let input = null;

describe('Input Component', () => {

    beforeEach(() => {
        wrapper = enzyme.mount(<App/>);
        input = wrapper.find('Input');
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('The input component should exist', () => {
        expect(input).to.exist;
    });

    it('The input component should have balance, rate, and term props', () => {
        expect(input.prop('balance')).to.exist;
        expect(input.prop('rate')).to.exist;
        expect(input.prop('term')).to.exist;
    });

    it('The input component should have a prop for sending up a change to updateInput in the App class', () => {
        expect(input.prop('updateInput')).to.exist;
    });

    it('The updateInput prop should update the state correctly', () => {
        expect(input.instance().props.updateInput('balance', 200000)).to.not.throw;
        wrapper.update();
        expect(wrapper.state('balance')).to.equal(200000);
        expect(input.find('#balance-input').render().attr('value')).to.equal('200000');
    });
});