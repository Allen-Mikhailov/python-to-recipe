import { StringToLine } from "./python-reader.js";
const compile_button = document.getElementById("compile-button");
const code_input = document.getElementById("code-input");
if (compile_button == null)
    console.error("compile-button was not found");
if (compile_button == null)
    console.error("code_input was not found");
function compile() {
    const python_string = (code_input === null || code_input === void 0 ? void 0 : code_input.innerText) || "";
    StringToLine(python_string);
}
compile_button === null || compile_button === void 0 ? void 0 : compile_button.addEventListener("onclick", compile);
