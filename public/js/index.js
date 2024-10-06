import { StringToLine } from "./python-reader.js";
const compile_button = document.getElementById("compile-button");
const code_input = document.getElementById("code-input");
if (compile_button == null)
    throw new Error("compile-button was not found");
if (code_input == null)
    throw new Error("compile-input was not found");
function compile(ev) {
    const python_string = (code_input === null || code_input === void 0 ? void 0 : code_input.value) || "";
    console.log("python_string", python_string);
    StringToLine(python_string);
}
compile_button.onclick = compile;
