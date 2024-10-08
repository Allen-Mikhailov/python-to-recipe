import { Keywords, TokenType } from "./python-data.js";
class Token {
    constructor(type, content) {
        this.type = type;
        this.content = content;
    }
}
class Statement {
    constructor() {
    }
    to_recipe() {
        return "";
    }
}
class VariableSet {
    constructor(tokens) {
        this.tokens = tokens;
    }
}
class Scope extends Statement {
    constructor(indent) {
        super();
        this.indent = indent;
        this.statements = [];
    }
    add_statement(statement) {
        this.statements.push(statement);
    }
}
class ContainerStatement extends Statement {
    constructor(statements) {
        super();
        this.statements = statements;
    }
}
class VariableStatement extends Statement {
    constructor(name) {
        super();
        this.name = name;
    }
}
class StringStatement extends Statement {
    constructor(name) {
        super();
        this.name = name;
    }
}
class NumberStatement extends Statement {
    constructor(num) {
        super();
        this.num = num;
    }
}
class OperatorStatement extends Statement {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
}
class MultiplyStatement extends OperatorStatement {
    constructor(left, right) {
        super(left, right);
    }
}
class ForLoop extends Scope {
    constructor(indent, variables, loop_statement) {
        super(indent);
        this.variables = variables;
        this.loop_statement = loop_statement;
    }
}
const wrapper_token_map = {
    "[": TokenType.BracketStart,
    "]": TokenType.BracketEnd,
    "(": TokenType.ParenthesisStart,
    ")": TokenType.ParenthesisEnd,
    "{": TokenType.BracesStart,
    "}": TokenType.BracesEnd,
    "+": TokenType.Operator,
    "-": TokenType.Operator,
    "+=": TokenType.Operator,
    "-=": TokenType.Operator,
    "=": TokenType.Operator,
    "==": TokenType.Operator,
    "%": TokenType.Operator,
    "*": TokenType.Operator,
    "/": TokenType.Operator,
    ">": TokenType.Operator,
    "<": TokenType.Operator,
    ">=": TokenType.Operator,
    "<=": TokenType.Operator,
    "//": TokenType.Operator,
    ",": TokenType.Comma,
    ":": TokenType.Colon,
};
function StringToLine(python_string) {
    let tokens = [];
    let current_token = "";
    let in_comment = false;
    let in_string = false;
    let string_type = null;
    let in_multiline_string = false;
    function reset_token_counters() {
        current_token = "";
        in_comment = false;
        in_string = false;
        string_type = null;
        in_multiline_string = false;
    }
    function new_token() {
        let token_type = TokenType.Variable;
        if (current_token == "") {
            return;
        }
        if (in_comment) {
            token_type = TokenType.Comment;
        }
        else if (Number(current_token)) {
            token_type = TokenType.Number;
        }
        else if (Object.keys(Keywords).includes(current_token)) {
            token_type = TokenType.Keyword;
        }
        tokens.push(new Token(token_type, current_token));
        reset_token_counters();
    }
    for (let i = 0; i < python_string.length; i++) {
        const char = python_string.charAt(i);
        const char2 = python_string.substring(i, i + 2);
        const char3 = python_string.substring(i, i + 3);
        if (in_comment) {
            current_token += char;
            continue;
        }
        if (in_string) {
            if (char == string_type) {
                tokens.push(new Token(TokenType.String, current_token));
                reset_token_counters();
                continue;
            }
            else {
                current_token += char;
                continue;
            }
        }
        if (char == "#") {
            in_comment = true;
            continue;
        }
        if (char == '"') {
            in_string = true;
            string_type = '"';
            continue;
        }
        if (char == "'") {
            in_string = true;
            string_type = "'";
            continue;
        }
        if (char == " " || char == "\t") {
            new_token();
            continue;
        }
        if (wrapper_token_map[char] != null) {
            new_token();
            tokens.push(new Token(wrapper_token_map[char], char));
            continue;
        }
        if (wrapper_token_map[char2] != null) {
            new_token();
            tokens.push(new Token(wrapper_token_map[char2], char2));
            i += 1;
            continue;
        }
        if (wrapper_token_map[char3] != null) {
            new_token();
            tokens.push(new Token(wrapper_token_map[char3], char3));
            i += 2;
            continue;
        }
        current_token += char;
    }
    new_token();
    return tokens;
}
function GetStringIndent(str) {
    let indent = 0;
    while (true) {
        if (str.startsWith("    "))
            str = str.substring(4);
        else if (str.startsWith("\t"))
            str = str.substring(1);
        else
            break;
        indent++;
    }
    return indent;
}
const container_symbols = {
    [TokenType.BracesStart]: TokenType.BracesEnd,
    [TokenType.ParenthesisStart]: TokenType.ParenthesisEnd,
    [TokenType.BracketStart]: TokenType.BracketEnd
};
function EvaluateTokenSequence(tokens) {
    const tree = [...tokens];
    for (let i = 0; i < tokens.length; i++) {
    }
    throw Error("Unable to create Statement");
}
function ConvertToSequences(python_string) {
    const lines = python_string.split("\n");
    let last_indent = 0;
    let scope_stack = [new Scope(0)];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const tokens = StringToLine(line);
        if (tokens.length == 0)
            continue;
        const indent = GetStringIndent(line);
        console.log("indent", indent, line, tokens);
        const first_token = tokens[0];
        if (first_token.content === "for") {
            // Is a for loop
        }
    }
}
export { StringToLine, ConvertToSequences };
