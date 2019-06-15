import React from 'react';
import { inherits } from 'util';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      rate: 0.00,
      term: 15,
      result: '',
      amort: [{
        sPrincipal: 0,
        payment: 0,
        princPay: 0,
        interPay: 0,
        ePrincipal: 0
      }]
    }
  }

  updateInput(field, event) {
    this.setState({
      [field]: event.target.value
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
        result: (<p id='output-p' className='col-sm-6 col-sm-offset-3 lead' style={{ textAlign: 'center', borderTop: '2px solid #d0d0d0', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', borderBottom: '2px solid #d0d0d0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>$<span id='output'>{result}</span> is your montly payment.</p>)
      });
    else this.setState({
      result: (<p id='output-p' className='col-sm-6 col-sm-offset-3 lead' style={{ textAlign: 'center', borderTop: '2px solid #d0d0d0', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', borderBottom: '2px solid #d0d0d0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>${Math.round(balance / months) / 100} is your monthly payment.</p>)
    });
    this.buildAmort(result);
  }

  buildAmort(pay) {
    let noAmort = {
      sPrincipal: 0,
      payment: 0,
      princPay: 0,
      interPay: 0,
      ePrincipal: 0
    }

    if (this.state.rate == 0) {
      this.setState({
        amort: [noAmort]
      })
      return;
    }
    pay = pay * 100;
    const rate = this.state.rate / 100 / 12;
    const balance = this.state.balance * 100;
    const months = this.state.term * 12;
    let iPay = rate * balance;

    let amorts = [{
      sPrincipal: (balance / 100).toFixed(2),
      payment: (pay / 100).toFixed(2),
      princPay: (Math.round(pay - iPay) / 100).toFixed(2),
      interPay: (Math.round(iPay) / 100).toFixed(2),
      ePrincipal: (Math.max((Math.round(balance - Math.round(pay - iPay)) / 100), 0)).toFixed(2)
    }]
    //alert(console.log(amorts[0]));

    for (let i = 1; i < months; i++) {
      iPay = rate * (amorts[i - 1].ePrincipal * 100);
      amorts[i] = {
        sPrincipal: amorts[i - 1].ePrincipal,
        payment: (pay / 100).toFixed(2),
        princPay: (Math.round(pay - iPay) / 100).toFixed(2),
        interPay: (Math.round(iPay) / 100).toFixed(2),
        ePrincipal: (Math.max(Math.round(amorts[i - 1].ePrincipal * 100 - Math.round(pay - iPay)) / 100, 0)).toFixed(2)
      }
    }
    this.setState({
      amort: amorts
    });
    // alert(console.log(amorts));
  }

  buildTable() {
    const amort = this.state.amort;

    return (<div className='col-sm-10 col-sm-offset-1' style={{ borderTop: '2px solid #d0d0d0', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
      <h6 className='lead' style={{ textAlign: 'center' }}>Example Amortization Schedule for this Mortgage</h6>
      <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
            <th>Month</th>
            <th>Beginning Principal</th>
            <th>Payment</th>
            <th>Principal Portion</th>
            <th>Interest Portion</th>
            <th>Ending Principal</th>
          </tr>
        </thead>
        <tbody>
          {amort.map((element, index) => (
            <tr key={element.sPrincipal + ' ' + index}>
              <th>{index + 1}</th>
              <td>${element.sPrincipal}</td>
              <td>${element.payment}</td>
              <td>${element.princPay}</td>
              <td>${element.interPay}</td>
              <td>${element.ePrincipal}</td>
            </tr> 
          ))}
        </tbody>
      </table>
    </div>)
  }

  // your Javascript goes here
  render() {
    return (
      <div className='container form-horizontal'>
        <div className='form-group'>
          <div className='col-sm-6 col-sm-offset-3' style={{ textAlign: 'center', borderBottom: '2px solid #d0d0d0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
            <h1>Mortgage Calculator</h1>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='balance-input' className='col-sm-3 control-label' id='balance-desc'>Loan Balance</label>
          <div className='col-sm-6'>
            <input value={this.state.balance} className='form-control' id='balance-input' name='balance' type='number' onChange={(e) => this.updateInput('balance', e)}></input>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='rate-input' className='col-sm-3 control-label' id='interest-desc'>Interest Rate (%)</label>
          <div className='col-sm-6'>
            <input value={this.state.rate} value={this.state.rate} className='form-control' id='rate-input' name='rate' type='number' step='0.01' onChange={(e) => this.updateInput('rate', e)}></input>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='term-select' className='col-sm-3 control-label' id='term-desc'>Loan Term (Years)</label>
          <div className='col-sm-6'>
            <select value={this.state.term} value={this.state.term} className='form-control' id='term-select' name='term' onChange={(e) => this.updateInput('term', e)}>
              <option value='15'>15</option>
              <option value='30'>30</option>
            </select>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-6 col-sm-offset-3'>
            <button name='submit' className='btn btn-default' onClick={() => this.calculate()}>Calculate</button>
          </div>
        </div>
        <div name='output' className='form-group'>
          {this.state.result}
        </div>
        <div name='amort-out' className='form-group'>
          {(this.state.amort[0].sPrincipal != 0) ? this.buildTable() : ''}
        </div>
      </div >
    );
  }
}
