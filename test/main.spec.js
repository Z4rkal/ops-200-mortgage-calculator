const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
  let httpServer = null;
  let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  // This is where your code is going to go
  it('The page should have an h1 element that contains \'Mortgage Calculator\'', () =>
    pageObject
      .wait()
      .evaluate(() => document.querySelector('h1').innerText == 'Mortgage Calculator' ? true : false)
      .then(output => {
        expect(output).to.be.true;
      })
  ).timeout(6500);

  it('The page should have an input field for the balance', () =>
    pageObject
      .wait()
      .evaluate(() => document.querySelector('#balance-input') != null ? true : false)
      .then(output => {
        expect(output).to.be.true;
      })
  ).timeout(6500);

  it('The page should have an input field for the rate', () =>
    pageObject
      .wait()
      .evaluate(() => document.querySelector('#balance-input') != null ? true : false)
      .then(output => {
        expect(output).to.be.true;
      })
  ).timeout(6500);

  it('The page should have a select field for the term', () =>
    pageObject
      .wait()
      .evaluate(() => document.querySelector('#term-select') != null ? true : false)
      .then(output => {
        expect(output).to.be.true;
      })
  ).timeout(6500);

  it('The page should have a button for calculating the mortgage', () =>
    pageObject
      .wait()
      .evaluate(() => document.querySelector('button').name == 'submit' ? true : false)
      .then(output => {
        expect(output).to.be.true;
      })
  ).timeout(6500);

  it('The page shouldn\'t have an output field before calculating the mortgage', () =>
    pageObject
      .wait()
      .evaluate(() => document.querySelector('#output-p') == null ? true : false)
      .then(output => {
        expect(output).to.be.true;
      })
  ).timeout(6500);

  it('The output field should display after calculating the mortgage', () =>
    pageObject
      .wait()
      .type('input[name=balance]', 200000)
      .type('input[name=rate]', 8.4)
      .select('select[name=term]', 30)
      .click('button[name=submit]')
      .evaluate(() => document.querySelector('#output-p') != null ? true : false)
      .then(output => {
        expect(output).to.be.true;
      })
  ).timeout(6500);

  it('The page should correctly calculate mortgage', () =>
    pageObject
      .wait()
      .type('input[name=balance]', 300000)
      .type('input[name=rate]', 3.75)
      .select('select[name=term]', 30)
      .click('button[name=submit]')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then((outputText) => {
        expect(outputText).to.equal('1389.35');
      })
  ).timeout(6500);
})