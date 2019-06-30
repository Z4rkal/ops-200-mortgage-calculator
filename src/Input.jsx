import React, { Component, Fragment } from 'react';

class Input extends Component {
    render() {
        return (
            <Fragment>
                <div className='form-group'>
                    <div className='col-sm-6 col-sm-offset-3' style={{ textAlign: 'center', borderBottom: '2px solid #d0d0d0', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
                        <h1>Mortgage Calculator</h1>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='balance-input' className='col-sm-3 control-label' id='balance-desc'>Loan Balance</label>
                    <div className='col-sm-6'>
                        <input value={this.props.balance} className='form-control' id='balance-input' name='balance' type='number' onChange={(e) => this.props.updateInput('balance', e.target.value)}></input>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='rate-input' className='col-sm-3 control-label' id='interest-desc'>Interest Rate (%)</label>
                    <div className='col-sm-6'>
                        <input value={this.props.rate} className='form-control' id='rate-input' name='rate' type='number' step='0.01' onChange={(e) => this.props.updateInput('rate', e.target.value)}></input>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='term-select' className='col-sm-3 control-label' id='term-desc'>Loan Term (Years)</label>
                    <div className='col-sm-6'>
                        <select value={this.props.term} className='form-control' id='term-select' name='term' onChange={(e) => this.props.updateInput('term', e.target.value)}>
                            <option value='15'>15</option>
                            <option value='30'>30</option>
                        </select>
                    </div>
                </div>
                <div className='form-group'>
                    <div className='col-sm-6 col-sm-offset-3'>
                        <button name='submit' className='btn btn-default' onClick={() => this.props.calculate()}>Calculate</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Input;