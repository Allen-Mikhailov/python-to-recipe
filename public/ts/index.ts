import { StringToLine } from "./python-reader.js";

const compile_button: HTMLElement | null = document.getElementById("compile-button")
const code_input: HTMLInputElement | null = document.getElementById("code-input") as HTMLInputElement

if (compile_button == null) throw new Error("compile-button was not found");
if (code_input == null) throw new Error("compile-input was not found");

function compile(ev: MouseEvent)
{
    const python_string = code_input?.value || ""
    console.log("python_string", python_string)

    StringToLine(python_string)

}

compile_button.onclick = compile