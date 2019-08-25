import Token from './class/Token';
import DFA_STATE from './enum/DfaState';
import TOKEN from './enum/Token';
import {isAlpha, isDigit} from './util/index';

export default (code: string) => {
    const tokens: Token[] = [];
    const newToken = (preToken: Token, ch: string) => {
        if(preToken.type !== TOKEN.None) {
            tokens.push(preToken);
        };
        return new Token(ch);
    }

    let token = new Token('');
    for (let ch of code) {
        switch (token.state) {
            case DFA_STATE.Initial:
                token = newToken(token, ch);
                break;
            case DFA_STATE.Identifier:
                if (isAlpha(ch) || isDigit(ch)) {
                    token.appendText(ch)
                } else {
                    token = newToken(token, ch);
                }
                break;
            case DFA_STATE.ID_int1:
                if (ch === 'n') {
                    token.state =DFA_STATE.ID_int2;
                    token.appendText(ch)
                } else if (isAlpha(ch) || isDigit(ch)) {
                    token.type = TOKEN.Identifier;
                    token.state =DFA_STATE.Int;
                } else {
                    token.type = TOKEN.Identifier;
                    token = newToken(token, ch);
                }
                break;
            case DFA_STATE.ID_int2:
                if (ch === 't') {
                    token.type = TOKEN.Int;
                    token.state =DFA_STATE.Int;
                    token.appendText(ch)
                } else if (isAlpha(ch) || isDigit(ch)) {
                    token.type = TOKEN.Identifier;
                    token.state =DFA_STATE.Identifier;
                    token.appendText(ch)
                } else {
                    token.type = TOKEN.Identifier;
                    token = newToken(token, ch);
                }
                break;
            case DFA_STATE.Int:
                if (isAlpha(ch) || isDigit(ch)) {
                    token.type = TOKEN.Identifier;
                    token.state =DFA_STATE.Identifier;
                    token.appendText(ch)
                } else {
                    token = newToken(token, ch);
                }
                break;
            case DFA_STATE.IntConstant:
                if (isDigit(ch)) {
                    token.appendText(ch)
                } else {
                    token = newToken(token, ch);
                }
                break;
            case DFA_STATE.GT:
                if (ch == '=') {
                    token.state =DFA_STATE.GE;
                    token.appendText(ch)
                } else {
                    token = newToken(token, ch);
                }
                break;
            case DFA_STATE.GE:
                token = newToken(token, ch);
                break;
            case DFA_STATE.Equal:
                token = newToken(token, ch);
                break;
            case DFA_STATE.Plus:
                token = newToken(token, ch);
                break;
            case DFA_STATE.Minus:
                token = newToken(token, ch);
                break;
            case DFA_STATE.Star:
                token = newToken(token, ch);
                break;
            case DFA_STATE.Slash:
                token = newToken(token, ch);
                break;
            default:
                token = newToken(token, ch);
        }
    }
    tokens.push(token);
    return tokens;
};