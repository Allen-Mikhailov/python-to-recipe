import { StringToLine } from "./python-reader.js";

const compile_button: HTMLElement | null = document.getElementById("compile-button")
const code_input: HTMLElement | null = document.getElementById("code-input")

if (compile_button == null) console.error("compile-button was not found");
if (compile_button == null) console.error("code_input was not found");

function compile()
{
    const python_string = code_input?.innerText || ""

    StringToLine(python_string)

}

compile_button?.addEventListener("onclick", compile)