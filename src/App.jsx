import { useState, useCallback , useEffect,useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useRef hook

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`'!@#$%^&*_-+=[]{}()~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  
  const copyPasswordToClipbord = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password).then (()=>{
      alert('Text copied to clipboard!');
    }).catch((err) =>{
      console.error('failed to copy:',err)
    })
    
  },[password])

useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 scale-120">
        <h1 className="text-white text-center  my-3 ">password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white "
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button onClick={copyPasswordToClipbord} className="outline-none hover:scale-105 hover:bg-blue-500 cursor-pointer bg-blue-700 text-white px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>

        <div className="flex text-base gap-x-2 pb-4">
          <div className="flex items-center gap-x-1">
            <input
              id="rangeInput"
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="rangeInput">Length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
