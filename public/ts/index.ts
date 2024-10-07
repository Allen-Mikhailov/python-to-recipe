import { StringToLine, ConvertToSequences } from "./python-reader.js";
import { example1 } from "./python_example.js";

const compile_button: HTMLElement | null = document.getElementById("compile-button")
const code_input: HTMLInputElement | null = document.getElementById("code-input") as HTMLInputElement

if (compile_button == null) throw new Error("compile-button was not found");
if (code_input == null) throw new Error("compile-input was not found");

code_input.value = example1;

function compile(ev: MouseEvent)
{
    const python_string = code_input?.value || ""
    console.log("python_string", python_string)

    ConvertToSequences(python_string)

}

compile_button.onclick = compile