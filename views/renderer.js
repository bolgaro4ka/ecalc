const { ipcRenderer } = require('electron');

const keys = {
    "clearAll": "clearAll",
    "devide": "/",
    "multiply": "*",
    "←": "backspace",
    "7": "7",
    "8": "8",
    "9": "9",
    "minus": "-",
    "4": "4",
    "5": "5",
    "6": "6",
    "plus": "+",
    "1": "1",
    "2": "2",
    "3": "3",
    "0": "0",
    "dot": ".",
    "equal": "=",
    "+": "+",
    "-": "-",
    "/": "/",
    "*": "*",
    ".": ".",
    "(": "(",
    ")": ")",
    "%": "%",
    "sin": "sin(",
    "cos": "cos(",
    "tan": "tan(",
    "sqrt": "sqrt(",
    "log2": "log2(",
    "log10": "log10(",
    "xiny": "**",
    "modulus": "abs(",
    "round": "round(",
    "factorial": "fac(",
    "pi": "pi",
    "e": "e",
    "bktl": "(",
    "bktr": ")",
    "toDeg": "degToRad(",
    "toRad": "radToDeg(",

    "arcsin": "asin(",
    "arccos": "acos(",
    "arctg": "atan(",

    "hypot": "hypot(",

    "infinity": "Infinity",

    "sinh": "sinh(",
    "cosh": "cosh(",
    "tanh": "tanh(",

    ',' : ','

}

const historyEl = document.getElementsByClassName("history")[0]

const history = []

function addToHistory(text) {
    history.push(text)
    historyEl.appendChild(document.createElement("p")).innerHTML = text
}


const input = document.getElementById("input")

const buttons = document.querySelectorAll(".buttons button")

buttons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.id;
            const startPos = input.selectionStart;
            const endPos = input.selectionEnd;
    
            console.log(id);
    
            if (id === "clearAll") {
                input.value = "";
                return;
            } else if (id === "backspace") {
                if (startPos == 0 && endPos == 0) {
                    input.value =  input.value.slice(0, -1);
                }
                if (startPos !== endPos) {
                    // Удаление выделенного текста
                    input.value = input.value.substring(0, startPos) + input.value.substring(endPos);
                    input.setSelectionRange(startPos, startPos);
                } else if (startPos > 0) {
                    // Удаление символа слева от каретки
                    input.value = input.value.substring(0, startPos - 1) + input.value.substring(endPos);
                    input.setSelectionRange(startPos - 1, startPos - 1);
                }
                return;
            } else if (id === "equals") {
                try {
                    const answer = eval(input.value.split(' ').join(''));
                    addToHistory(input.value + " = " + answer);
                    if (!answer.toString().includes(".") && !answer.toString().includes("e")) {
                        // То заделяем число по 3 числам
                        input.value = answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    } else {
                        input.value = answer;
                    }
                    scrollToBottomOfChat();
                } catch (e) {
                    input.value = 'Ошибка ' + e;
                }
                if (input.value === "NaN") {
                    input.value = "Не число";
                }
                input.select();
                return;
            } else if (id === "percent") {
                input.value = input.value / 100;
                return;
            }
    
            if (id in keys) {
                // Вставка символа на месте каретки
                input.focus()
                
                const keyValue = keys[id];
                if (document.activeElement !== input) {
                    input.value =  input.value + keyValue; console.log('Yep1'); 
                    
                } else if (startPos == 0) {
                    input.value =   keyValue + input.value;console.log('Yep2');
                } else {
                    console.log('Yep3');
                    input.value = input.value.substring(0, startPos) + keyValue + input.value.substring(endPos);
                }
                input.setSelectionRange(startPos + keyValue.length, startPos + keyValue.length);
            }
        });
    });


console.log('hi')
window.addEventListener("keydown", async (event) => {
    input.focus()
    if (event.ctrlKey && event.key == "a") {
        input.select(); return
    }
    if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
        return
    }
    if ((event.ctrlKey && event.key) || (document.activeElement === input && event.key== "Backspace")) { 
        return;
    }
    event.preventDefault()

    if (event.key == "=" || event.key == "Enter") {
        document.getElementById("equals").click()


    } else if (event.key == "Backspace") {
        document.getElementById("backspace").click()
    }  else if (event.key in keys) {
        const id = event.key
        const startPos = input.selectionStart;
        const endPos = input.selectionEnd;
        const keyValue = keys[id];
        if (document.activeElement !== input) {
            input.value =  input.value + keyValue; console.log('Yep1'); 
            
        } else if (startPos == 0) {
            input.value =   keyValue + input.value;console.log('Yep2'); 
        } else {
            console.log('Yep3');
            input.value = input.value.substring(0, startPos) + keyValue + input.value.substring(endPos);
        }

        input.setSelectionRange(startPos + keyValue.length, startPos + keyValue.length);

    } else if (event.key == "c") {
        document.getElementById("cos").click()
    } else if (event.key == "x") {
        document.getElementById("xiny").click()
    } else if (event.key == "s") {
        document.getElementById("sin").click()
    } else if (event.key == "t") {
        document.getElementById("tan").click()
    } else if (event.key == "l") {
        document.getElementById("log2").click()
    } else if (event.key == "p") {
        document.getElementById("pi").click()
    } else if (event.key == "e") {
        document.getElementById("e").click()
    } else if (event.key == "L") {
        document.getElementById("log10").click()
    } else if (event.key == "C") {
        document.getElementById("arccos").click()
    } else if (event.key == "S") {
        document.getElementById("arcsin").click()
    } else if (event.key == "T") {
        document.getElementById("arctg").click()
    } else if (event.key == "X") {
        document.getElementById("sqrt").click()
        
    } else if (event.key == "m") {
        document.getElementById("modulus").click()
    } else if (event.key == "R") {
        document.getElementById("toRad").click()
    } else if (event.key == "D") {
        document.getElementById("toDeg").click()
    } else if (event.key == "r") {
        document.getElementById("round").click()
    } else if (event.key == "Escape") {
        document.getElementById("clearAll").click()
    } else if (event.altKey && event.key == "c") {
        document.getElementById("cosh").click()

    } else if (event.altKey && event.key == "s") {
        document.getElementById("sinh").click()

    } else if (event.altKey && event.key == "t") {
        document.getElementById("tanh").click()
    } else if (event.key == "h") {
        document.getElementById("hypot").click()
    } else if (event.key == "ArrowUp") {
        input.value = history[history.length - 1].split(' = ')[0]

    }


    // Simple commands. For example Ctrl + C - copy

})




function abs(...args) {
    return Math.abs(...args)
}

function fac(n) {
    if (n < 0) {
        return -1; // Факториал отрицательного числа не определен
      }
      if (n === 0 || n === 1) {
        return 1; // Факториал 0 и 1 равен 1
      }
      return n * fac(n - 1);
    }

function round(...args) {
    return Math.round(...args)
}

function sqrt(...args) {
    return Math.sqrt(...args)
}

function log2(...args) {
    return Math.log2(...args)
}

function log10(...args) {
    return Math.log10(...args)
}

function sin(...args) {
    return Math.sin(...args)
}

function cos(...args) {
    return Math.cos(...args)
}

function tan(...args) {
    return Math.tan(...args)
}

function round(...args) {
    return Math.round(...args)
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}
  
function radToDeg(rad) {
    return rad / (Math.PI / 180);
}

function asin(...args) {
    return Math.asin(...args)
}

function acos(...args) {
    return Math.acos(...args)
}

function atan(...args) {
    return Math.atan(...args)
}

function hypot(...args) {
    return Math.hypot(...args)
}

function cosh(...args) {
    return Math.cosh(...args)
}

function sinh(...args) {
    return Math.sinh(...args)
}

function tanh(...args) {
    return Math.tanh(...args)
}

const pi = Math.PI
const e = Math.E

function scrollToBottomOfChat() {
    var elem = document.getElementsByClassName('history')[0]
    var scrollBottom = elem.scrollHeight + elem.scrollTop + elem.clientHeight;
    elem.scrollTo({ top: scrollBottom+2000 });

}