let display = document.getElementById('display')
let buttons = Array.from(document.getElementsByClassName('btn'))
let history = document.getElementById("history")

if (display.innerText === ""){
    display.innerText = "0";
}

function pretty(display){
    if (display.innerText.indexOf("*") != -1){
        display.innerText = display.innerText.slice(0, display.innerText.indexOf("*")) + "×" + display.innerText.slice(display.innerText.indexOf("*") + 1)
    }

    if (display.innerText.indexOf("/") != -1){
        display.innerText = display.innerText.slice(0, display.innerText.indexOf("/")) + "÷" + display.innerText.slice(display.innerText.indexOf("/") + 1)
    }
    return display.innerText;
}

buttons.map((button)=>{
    button.addEventListener("click", (e) => {
        switch (e.target.innerText) {
            case "C":
                display.innerText = "0"
                break;

            case "=":
                if (display.innerHTML === "0")
                    break;
                const equation = document.createElement("p");
                equation.className = "history-item";
                if (display.innerText.indexOf("×") != -1){
                    display.innerText = display.innerText.slice(0, display.innerText.indexOf("×")) + "*" + display.innerText.slice(display.innerText.indexOf("×") + 1)
                }

                if (display.innerText.indexOf("÷") != -1){
                    display.innerText = display.innerText.slice(0, display.innerText.indexOf("÷")) + "/" + display.innerText.slice(display.innerText.indexOf("÷") + 1)
                }
                if (display.innerText != ""){
                    equation.innerText = display.innerText;
                }

                try {
                    display.innerText = eval(display.innerText);
                    if (display.innerText.indexOf(".") != -1) {
                        display.innerText = eval(display.innerText).toFixed(2);
                    }
                    equation.innerText += " = " + display.innerText;
                    equation.innerText = pretty(equation);
                    history.appendChild(equation);
                } catch {
                    display.innerText = "Error"
                }

                break;

            case "⌫":
                if (display.innerText === "Error")
                    display.innerText = "0"
                
                else
                    if (!(display.innerText === "0" && display.innerText.length === 1))
                        display.innerText = display.innerText.slice(0, display.innerText.length - 1);
                    
                    if (display.innerText.length === 0)
                        display.innerText = 0;
                    
                break;

            case "+/-":
                display.innerText += "-"
                break;

            default:
                if (display.innerText === "0")
                    display.innerText = e.target.innerText;
                else{
                    if (e.target.innerText === "+" || e.target.innerText === "-" || e.target.innerText === "÷" || e.target.innerText === "*"){
                        display.innerText += " " + e.target.innerText;
                    }

                    else
                        display.innerText += e.target.innerText;
                    
                }
                break;
        }
    })
});
