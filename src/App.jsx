import { useCallback, useState, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [Numbers, setNumbers] = useState(false);
  const [Character, setCharacter] = useState(false);
  const [textPassword, setPassword] = useState();

  const Password = useCallback(() => {
    let pass = "";
    let txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let number = "1234567890";
    let char = "!@#$%^&*()_-+={}]|";

    if (Numbers) txt += number;
    if (Character) txt += char;

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * txt.length);
      pass += txt[index];
    }
    setPassword(pass);
  }, [length, Numbers, Character]);

  useEffect(() => {
    Password();
  }, [length, Numbers, Character, setPassword]);

  const passwordRef =useRef(null);
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
   

    window.navigator.clipboard.writeText(textPassword);
  },[textPassword]);

  return (
    <div className="bg-yellow-200 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-yellow-400 p-12  rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
        <div className="flex">
  <input
  type="text"
  value={textPassword}
  placeholder="Password"
  readOnly
  className="w-full pl-4 py-2 mb-8 rounded-md shadow-md outline-none text-black bg-white"
  style={{ height: "2.25rem" }} 
/>  
  <button onClick={copyToClipboard} className="ml-5 bg-blue-500 hover:bg-blue-700 text-white  py-0 px-8  rounded" style={{ height: "2.25rem" }}>
    Copy
  </button>
</div>


        <div className="flex items-center mb-4">
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="ml-4">Length: {length}</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            defaultChecked={Numbers}
            onChange={() => {
              setNumbers((prev) => !prev);
            }}
            className="mr-2"
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={Character}
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
            className="mr-2"
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
