import React, { useState } from "react";

export default function Calculator() {
  const [currentInput, setCurrentInput] = useState("");
  const [previousInput, setPreviousInput] = useState("");
  const [operator, setOperator] = useState("");
  const [resultDisplayed, setResultDisplayed] = useState(false);

  const updateDisplayText = () => {
    if (previousInput && operator && currentInput)
      return `${previousInput} ${operator} ${currentInput}`;
    if (previousInput && operator) return `${previousInput} ${operator}`;
    if (currentInput) return currentInput;
    return "0";
  };

  const handleNumber = (val) => {
    if (resultDisplayed) {
      setCurrentInput("");
      setResultDisplayed(false);
    }
    if (val === ".") {
      if (currentInput.includes(".")) return;
      if (currentInput === "") setCurrentInput("0.");
      else setCurrentInput((s) => s + ".");
      return;
    }
    setCurrentInput((s) => (s === "0" ? val : s + val));
  };

  const handleClear = () => {
    setCurrentInput("");
    setPreviousInput("");
    setOperator("");
    setResultDisplayed(false);
  };

  const handlePlusMinus = () => {
    if (!currentInput) return;
    setCurrentInput((s) => (parseFloat(s) * -1).toString());
  };

  const handlePercent = () => {
    if (!currentInput) return;
    setCurrentInput((s) => (parseFloat(s) / 100).toString());
  };

  const handleOperator = (op) => {
    if (!currentInput) return;
    setOperator(op);
    setPreviousInput(currentInput);
    setCurrentInput("");
  };

  const handleEqual = () => {
    if (!currentInput || !previousInput || !operator) return;
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let r = 0;
    switch (operator) {
      case "+":
        r = a + b;
        break;
      case "-":
        r = a - b;
        break;
      case "x":
        r = a * b;
        break;
      case "÷":
        r = b !== 0 ? a / b : "Error";
        break;
      default:
        r = 0;
    }
    setCurrentInput(String(r));
    setPreviousInput("");
    setOperator("");
    setResultDisplayed(true);
  };

  const onButton = (value) => {
    if (!isNaN(value) || value === ".") return handleNumber(value);
    if (value === "AC") return handleClear();
    if (value === "±") return handlePlusMinus();
    if (value === "%") return handlePercent();
    if (["+", "-", "x", "÷"].includes(value)) return handleOperator(value);
    if (value === "=") return handleEqual();
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#060606",
      }}
    >
      <style>{`
        .iphone{position:relative;width:320px;height:680px;background:white;border-radius:45px;border:8px solid #0a0a01;box-shadow:0 0 200px rgb(193,149,149);overflow:hidden}
        .dynamic-island{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:100px;height:26px;background:black;border-radius:13px}
        .home-bar{position:absolute;bottom:6px;left:50%;transform:translateX(-50%);width:120px;height:5px;background:black;border-radius:3px}
        .display{margin-top:95px;padding:20px;font-size:56px;text-align:right;color:black}
        .buttons{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;padding:18px}
        .btn{height:72px;border-radius:50%;border:none;font-size:24px;cursor:pointer}
        .btn:active{transform:scale(0.95);opacity:0.8}
        .lightGrey{background:#d4d4d2}
        .darkGrey{background:#505050;color:white}
        .orange{background:#ff9500;color:white}
        .zero{grid-column:span 2;border-radius:40px;text-align:left;padding-left:30px}
        .credit{position:absolute;bottom:22px;width:100%;text-align:center;font-size:10px;color:black;opacity:0.6}
      `}</style>

      <div className="iphone">
        <div className="dynamic-island" />

        <div className="calculator">
          <div className="display">{updateDisplayText()}</div>

          <div className="buttons">
            {[
              ["AC", "±", "%", "÷"],
              ["7", "8", "9", "x"],
              ["4", "5", "6", "-"],
              ["1", "2", "3", "+"],
              ["0", "0", ".", "="],
            ].map((row, ri) =>
              row.map((b, bi) => {
                // For last row we want a zero spanning two columns
                const isZero = ri === 4 && bi === 0;
                const label = ri === 4 && bi === 1 ? null : b; // avoid duplicate 0
                if (!label) return null;
                const classes = ["btn"];
                if (["AC", "±", "%"].includes(label)) classes.push("lightGrey");
                else if (
                  [
                    "7",
                    "8",
                    "9",
                    "4",
                    "5",
                    "6",
                    "1",
                    "2",
                    "3",
                    "0",
                    ".",
                  ].includes(label)
                )
                  classes.push("darkGrey");
                else classes.push("orange");
                if (isZero) classes.push("zero");
                return (
                  <button
                    key={`${ri}-${bi}`}
                    className={classes.join(" ")}
                    onClick={() => onButton(label)}
                  >
                    {label}
                  </button>
                );
              }),
            )}
          </div>
        </div>

        <div className="credit">
          Calculator biult & designed by <strong>Sem Bunly</strong>
        </div>

        <div className="home-bar" />
      </div>
    </div>
  );
}
