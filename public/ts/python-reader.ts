import { TokenType } from "./python-data.js"

class Token
{
    type: TokenType;
    content: string;

    constructor(type: TokenType, content: string)
    {
        this.type = type;
        this.content = content;
    }
}

class Line
{
    tokens: Token[];

    constructor(tokens: Token[])
    {
        this.tokens = tokens;
    }
}

class Statement
{
    constructor()
    {
        
    }

    to_recipe(): string
    {
        return ""
    }
}

class Scope extends Statement
{
    statements: Statement[]

    constructor(indent: number)
    {
        super()
        this.statements = []
    }
}

const wrapper_token_map: {[id: string]: TokenType} = {
    "[": TokenType.BracketStart,
    "]": TokenType.BracketEnd,
    "(": TokenType.ParenthesisStart,
    ")": TokenType.ParenthesisEnd,
    "+": TokenType.Operator,
    "-": TokenType.Operator,
    "+=": TokenType.Operator,
    "-=": TokenType.Operator,
    "=": TokenType.Operator,
    "==": TokenType.Operator,
    "%": TokenType.Operator,
    "*": TokenType.Operator,
    "/": TokenType.Operator,
    "//": TokenType.Operator,
    ",": TokenType.Comma,
}

function StringToLine(python_string: string)
{
    let tokens: Token[] = [];

    let current_token = "";
    let in_comment = false;
    let in_string = false;
    let string_type = null;
    let in_multiline_string = false;

    function reset_token_counters()
    {
        current_token = "";
        in_comment = false;
        in_string = false;
        string_type = null;
        in_multiline_string = false;
    }

    function new_token()
    {
        let token_type: TokenType = TokenType.Variable

        if (current_token == "") {return;}

        if (in_comment)
        {
            token_type = TokenType.Comment;
        }

        tokens.push(new Token(token_type, current_token));
        reset_token_counters();
    }

    for (let i = 0; i < python_string.length; i++ )
    {
        const char = python_string.charAt(i)
        const char2 = python_string.substring(i, i+2)
        const char3 = python_string.substring(i, i+3)
        
        if (in_comment)
        {
            current_token += char;
            continue;
        }

        if (in_string)
        {
            if (char == string_type)
            {
                tokens.push(new Token(TokenType.String, current_token));
                reset_token_counters();
                continue;
            } else {
                current_token += char;
                continue;
            }
        }

        if (char == "#")
        {
            in_comment = true;
            continue;
        }

        if (char == '"')
        {
            in_string = true;
            string_type = '"';
            continue;
        }

        if (char == "'")
        {
            in_string = true;
            string_type = "'";
            continue;
        }
        
        if (char == " " || char == "\t")
        {
            new_token()
            continue
        }

        if (wrapper_token_map[char] != null)
        {
            new_token()
            tokens.push(new Token(wrapper_token_map[char], char));
            continue;
        }

        if (wrapper_token_map[char2] != null)
        {
            new_token()
            tokens.push(new Token(wrapper_token_map[char2], char2));
            i+=1;
            continue;
        }

        if (wrapper_token_map[char3] != null)
        {
            new_token()
            tokens.push(new Token(wrapper_token_map[char3], char3));
            i+=2;
            continue;
        }

        current_token += char;
    }

    new_token()
    return tokens
}

function GetStringIndent(str: string): number
{
    let indent: number = 0;
    while (true)
    {
        if (str.startsWith("    "))
            str = str.substring(4)
        else if (str.startsWith("\t")) 
            str = str.substring(1)
        else 
            break

        indent++;
    }

    return indent
}

function ConvertToSequences(python_string: string)
{
    const lines: string[] = python_string.split("\n")
    const line_indents: number[] = []
    lines.map((line) => {
        console.log(StringToLine(line))
    })

}

export { StringToLine, ConvertToSequences }