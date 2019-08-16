var DfaState = {
    Initial: 'Initial',
    Id: 'Id',
    IntConstant: 'IntConstant',
    GT: 'GT',
    GE: "GE"
};
var TokenType = {
    Identifier: 'Identifier',
    IntConstant: 'IntConstant',
    RelOp: 'RelOp'
};
var nextState = DfaState.Initial;
var isAlpha = function (ch) {
    return /[a-z]/.test(ch);
};
var isDigit = function (ch) {
    return /[0-9]/.test(ch);
};
var token = {
    type: TokenType.Identifier,
    text: ''
};
var initToken = function (ch) {
    token.text = ch;
    if (isAlpha(ch)) {
        nextState = DfaState.Id;
        token.type = TokenType.Identifier;
    }
    else if (isDigit(ch)) {
        nextState = DfaState.IntConstant;
        token.type = TokenType.IntConstant;
    }
    else if (ch === '>') {
        nextState = DfaState.GT;
        token.type = TokenType.RelOp;
    }
    else {
        nextState = DfaState.Initial;
        token.type = TokenType.Identifier;
    }
    return nextState;
};
var lexicalAnalyser = function (code) {
    var state = DfaState.Initial;
    for (var _i = 0, code_1 = code; _i < code_1.length; _i++) {
        var ch = code_1[_i];
        switch (state) {
            case DfaState.Initial:
                state = initToken(ch);
                break;
            case DfaState.Id:
                if (isAlpha(ch) || isDigit(ch)) {
                    token.text += ch;
                }
                else {
                    console.log(token.type + "    " + token.text);
                    state = initToken(ch);
                }
                break;
            case DfaState.IntConstant:
                if (isDigit(ch)) {
                    token.text += ch;
                }
                else {
                    console.log(token.type + "    " + token.text);
                    state = initToken(ch);
                }
                break;
            case DfaState.GT:
                if (ch == '=') {
                    state = DfaState.GE;
                    token.text += ch;
                }
                else {
                    console.log(token.type + "    " + token.text);
                    state = initToken(ch);
                }
                break;
            case DfaState.GE:
                console.log(token.type + "    " + token.text);
                state = initToken(ch);
                break;
            default:
                state = initToken(ch);
        }
    }
    console.log(token.type + "    " + token.text);
};
lexicalAnalyser('age >= 45');
