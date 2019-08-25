import TOKEN from '../enum/Token';
import DFA_STATE from '../enum/DfaState';
import {isAlpha, isDigit} from '../util/index';

export default class Token {
    type: TOKEN;
    text = '';
    state: DFA_STATE;

    constructor(firstChar: string) {
        this.text = firstChar;
        this.guessTypeAndState(firstChar);
    }
    guessTypeAndState(firstChar: string) {
        if (isAlpha(firstChar)) {
            if (firstChar == 'i') {
                this.type = TOKEN.Int;
                this.state = DFA_STATE.ID_int1;
            } else {
                this.state = DFA_STATE.Identifier;
                this.type = TOKEN.Identifier;
            }
        } else if (isDigit(firstChar)) {
            this.type = TOKEN.IntConstant;
            this.state = DFA_STATE.IntConstant;
        } else if (firstChar === '=') {
            this.type = TOKEN.Equal;
            this.state = DFA_STATE.Equal;
        } else if (firstChar === '>') {
            this.type = TOKEN.RelOp;
            this.state = DFA_STATE.GT;
        } else if (firstChar === '+') {
            this.type = TOKEN.Plus;
            this.state = DFA_STATE.Plus;
        } else if (firstChar === '-') {
            this.type = TOKEN.Minus;
            this.state = DFA_STATE.Minus;
        } else if (firstChar === '*') {
            this.type = TOKEN.Star;
            this.state = DFA_STATE.Star;
        } else if (firstChar === '/') {
            this.type = TOKEN.Slash;
            this.state = DFA_STATE.Slash;
        } else {
            this.type = TOKEN.None;
            this.state = DFA_STATE.Initial;
        }
    }
    appendText(ch: string) {
        this.text += ch;
    }
}
