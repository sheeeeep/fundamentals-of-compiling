import 'mocha';
import * as fs from 'fs-extra';
import { expect } from 'chai';
import lexicalAnalyser from '../src/lexicalAnalyser';
import TOKEN from '../src/enum/Token';
import DFA_STATE from '../src/enum/DfaState';

describe('lexicalAnalyser', () => {
    const code1 = 'int age >= 45';
    it(code1, () => {
        const tokens = lexicalAnalyser(code1)
        expect(tokens.map(token => {return {type: token.type, text: token.text} })).to.deep.equal([{
            text: 'int',
            type: TOKEN.Int
        }, {
            text: 'age',
            type: TOKEN.Identifier
        }, {
            text: '>=',
            type: TOKEN.RelOp
        }, {
            text: '45',
            type: TOKEN.IntConstant
        }])
    });

    const code2 = 'intA = 10';
    it(code2, () => {
        const tokens = lexicalAnalyser(code2)
        expect(tokens.map(token => {return {type: token.type, text: token.text} })).to.deep.equal([{
            type: TOKEN.Identifier,
            text: 'intA'
        }, {
            type: TOKEN.Equal,
            text: '='
        }, {
            type: TOKEN.IntConstant,
            text: '10'
        }])
    });

    const code3 = 'int a = 5 + 1 - 2 / 4';
    it(code3, () => {
        const tokens = lexicalAnalyser(code3)
        expect(tokens.map(token => {return {type: token.type,text: token.text} })).to.deep.eq([{
            type: TOKEN.Int,
            text: 'int'
        }, {
            type: TOKEN.Identifier,
            text: 'a'
        }, {
            type: TOKEN.Equal,
            text: '='
        }, {
            type: TOKEN.IntConstant,
            text: '5'
        }, {
            type: TOKEN.Plus,
            text: '+'
        }, {
            type: TOKEN.IntConstant,
            text: '1'
        }, {
            type: TOKEN.Minus,
            text: '-'
        }, {
            type: TOKEN.IntConstant,
            text: '2'
        }, {
            type: TOKEN.Slash,
            text: '/'
        }, {
            type: TOKEN.IntConstant,
            text: '4'
        }])
    });
});
