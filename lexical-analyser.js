var DfaState = {
    Initial: 'Initial',
    Identifier: 'Identifier',
    IntConstant: 'IntConstant',
    GT: 'GT',
    GE: 'GE',
    Int: 'Int',
    ID_int1: 'ID_int1',
    ID_int2: 'ID_int2',
    Equal: 'Equal',
    Plus: 'Plus',
    Minus: 'Minus',
    Star: 'Star',
    Slash: 'Slash'
};
var TokenType = {
    Identifier: 'Identifier',
    IntConstant: 'IntConstant',
    RelOp: 'RelOp',
    Int: 'Int',
    Equal: 'Equal',
    Plus: 'Plus',
    Minus: 'Minus',
    Star: 'Star',
    Slash: 'Slash'
};
var lexicalAnalyser = function (code) {
    var state = DfaState.Initial;
    var isAlpha = function (ch) {
        return /[a-zA-Z_]/.test(ch);
    };
    var isDigit = function (ch) {
        return /[0-9]/.test(ch);
    };
    var token = {
        type: TokenType.Identifier,
        text: ''
    };
    var initToken = function (ch) {
        var nextState = DfaState.Initial;
        if (state !== DfaState.Initial) {
            console.log(token.type + "        " + token.text);
        }
        token.text = ch;
        if (isAlpha(ch)) {
            if (ch == 'i') {
                token.type = TokenType.Int;
                nextState = DfaState.ID_int1;
            }
            else {
                nextState = DfaState.Identifier;
                token.type = TokenType.Identifier;
            }
        }
        else if (isDigit(ch)) {
            nextState = DfaState.IntConstant;
            token.type = TokenType.IntConstant;
        }
        else if (ch === '=') {
            nextState = DfaState.Equal;
            token.type = TokenType.Equal;
        }
        else if (ch === '>') {
            nextState = DfaState.GT;
            token.type = TokenType.RelOp;
        }
        else if (ch === '+') {
            nextState = DfaState.Plus;
            token.type = TokenType.Plus;
        }
        else if (ch === '-') {
            nextState = DfaState.Minus;
            token.type = TokenType.Minus;
        }
        else if (ch === '*') {
            nextState = DfaState.Star;
            token.type = TokenType.Star;
        }
        else if (ch === '/') {
            nextState = DfaState.Slash;
            token.type = TokenType.Slash;
        }
        else {
            nextState = DfaState.Initial;
            token.type = TokenType.Identifier;
        }
        return nextState;
    };
    for (var _i = 0, code_1 = code; _i < code_1.length; _i++) {
        var ch = code_1[_i];
        switch (state) {
            case DfaState.Initial:
                state = initToken(ch);
                break;
            case DfaState.Identifier:
                if (isAlpha(ch) || isDigit(ch)) {
                    token.text += ch;
                }
                else {
                    state = initToken(ch);
                }
                break;
            case DfaState.ID_int1:
                if (ch === 'n') {
                    state = DfaState.ID_int2;
                    token.text += ch;
                }
                else if (isAlpha(ch) || isDigit(ch)) {
                    token.type = TokenType.Identifier;
                    state = DfaState.Int;
                }
                else {
                    token.type = TokenType.Identifier;
                    state = initToken(ch);
                }
                break;
            case DfaState.ID_int2:
                if (ch === 't') {
                    state = DfaState.Int;
                    token.text += ch;
                }
                else if (isAlpha(ch) || isDigit(ch)) {
                    token.type = TokenType.Identifier;
                    state = DfaState.Identifier;
                    token.text += ch;
                }
                else {
                    token.type = TokenType.Identifier;
                    state = initToken(ch);
                }
                break;
            case DfaState.Int:
                if (isAlpha(ch) || isDigit(ch)) {
                    token.type = TokenType.Identifier;
                    state = DfaState.Identifier;
                    token.text += ch;
                }
                else {
                    token.type = TokenType.Identifier;
                    state = initToken(ch);
                }
                break;
            case DfaState.IntConstant:
                if (isDigit(ch)) {
                    token.text += ch;
                }
                else {
                    state = initToken(ch);
                }
                break;
            case DfaState.GT:
                if (ch == '=') {
                    state = DfaState.GE;
                    token.text += ch;
                }
                else {
                    state = initToken(ch);
                }
                break;
            case DfaState.GE:
                state = initToken(ch);
                break;
            case DfaState.Equal:
                state = initToken(ch);
                break;
            case DfaState.Plus:
                state = initToken(ch);
                break;
            case DfaState.Minus:
                state = initToken(ch);
                break;
            case DfaState.Star:
                state = initToken(ch);
                break;
            case DfaState.Slash:
                state = initToken(ch);
                break;
            default:
                state = initToken(ch);
        }
    }
    console.log(token.type + "        " + token.text);
};
['int age >= 45', 'intA = 10', 'int a = 5 + 1 - 2 / 4'].forEach(function (example) {
    console.log(example);
    lexicalAnalyser(example);
    console.log('------------');
});
