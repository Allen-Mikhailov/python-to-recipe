import { TokenType } from "./python-data.js";
class Token {
    constructor(type, content) {
        this.type = type;
        this.content = content;
    }
}
class Line {
    constructor(tokens) {
        this.tokens = tokens;
    }
}
class Statement {
    constructor(name) {
        this.name = name;
    }
    matches_line(line) {
        return false;
    }
    to_recipe() {
        return "";
    }
}
const wrapper_token_map = {
    "[": TokenType.BracketStart,
    "]": TokenType.BracketEnd,
    "(": TokenType.ParenthesisStart,
    ")": TokenType.ParenthesisEnd,
    "+": TokenType.Operator
};
function StringToLine(python_string) {
    let tokens = [];
    let index = 0;
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
    }
    new_token();
}
function ConvertToSequences(python_string) {
}
export { StringToLine };
