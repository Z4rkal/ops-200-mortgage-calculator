import React, { Component } from 'react';
import { inherits } from 'util';
import Input from './Input';

class App extends Component {
    constructor() {
        super();
        this.state = {
            balance: 0,
            rate: 0,
            term: 15,
            result: ''
        }

        this.updateInput = this.updateInput.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    updateInput(field, value) {
        this.setState({
            [field]: value
        });
    }

    calculate() {
        const balance = this.state.balance * 100;
        const monthly = this.state.rate / 100 / 12;
        const months = this.state.term * 12;
        let rateCalc = Math.pow(1 + monthly, months);

        let result = Math.round(balance * (monthly * rateCalc) / (rateCalc - 1)) / 100;
        if (result)
            this.setState({
                result: (<p id='output-p' className='col-sm-6 col-sm-offset-3 lead' style={{ textAlign: 'center', border: '2px, solid, #d0d0d0', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>$<span id='output'>{result}</span> is your montly payment.</p>)
            });
        else this.setState({
            result: (<p id='output-p' className='col-sm-6 col-sm-offset-3 lead' style={{ textAlign: 'center', border: '2px, solid, #d0d0d0', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>$<span id='output'>{Math.round(balance / months) / 100}</span> is your monthly payment.</p>)
        });
    }

    render() {
        return (
            <div className='container form-horizontal'>
                <Input balance={this.state.balance} rate={this.state.rate} term={this.state.term} updateInput={this.updateInput} calculate={this.calculate}/>
                <div name='output' className='form-group'>
                    {this.state.result}
                </div>
            </div >)
    }
}

export default App;