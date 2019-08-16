const DfaState = {
    Initial: 'Initial',
    Id: 'Id',
    IntConstant: 'IntConstant',
    GT: 'GT',
    GE: "GE"
}

const TokenType = {
    Identifier: 'Identifier',
    IntConstant: 'IntConstant',
    RelOp: 'RelOp'
}

let nextState = DfaState.Initial;

const isAlpha = (ch) => {
    return /[a-zA-Z_]/.test(ch);
}

const isDigit = (ch) => {
    return /[0-9]/.test(ch);
}

let token = {
    type: TokenType.Identifier,
    text: ''
}

const initToken = (ch) => {
    token.text = ch;
    if(isAlpha(ch)) {
        nextState = DfaState.Id;
        token.type = TokenType.Identifier;
    } else if(isDigit(ch)) {
        nextState = DfaState.IntConstant;
        token.type = TokenType.IntConstant;
    } else if (ch === '>') {
        nextState = DfaState.GT;
        token.type = TokenType.RelOp;
    } else {
        nextState = DfaState.Initial;
        token.type = TokenType.Identifier;
    }
    return nextState;
}

const lexicalAnalyser = (code) => {
    let state = DfaState.Initial;
    for (let ch of code) {
        switch(state) {
            case DfaState.Initial:
                state = initToken(ch);
                break;
            case DfaState.Id:
                if(isAlpha(ch) || isDigit(ch)) {
                    token.text += ch;
                } else {
                    console.log(`${token.type}        ${token.text}`)
                    state = initToken(ch);
                }
                break;
            case DfaState.IntConstant:
                if(isDigit(ch)) {
                    token.text += ch;
                } else {

                    console.log(`${token.type}        ${token.text}`)
                    state = initToken(ch);
                }
                break;
            case DfaState.GT:
                if(ch == '=') {
                    state = DfaState.GE;
                    token.text += ch;
                } else {
                    console.log(`${token.type}        ${token.text}`)
                    state = initToken(ch)
                }
                break;
            case DfaState.GE:

                console.log(`${token.type}        ${token.text}`)
                state = initToken(ch);
                break;
            default:
                state = initToken(ch);
        }
    }
    console.log(`${token.type}        ${token.text}`)
}

lexicalAnalyser('age >= 45');