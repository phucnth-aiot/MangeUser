import { useState } from "react";

export default function RegiterConfirm () {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [code, setCode] = useState("");

  return (
    <div>
        <div className="text-center bg-blue-500">
            <h1>CONFIRM CODE FORM EMAIL</h1>
            <div className="relative">
                <input 
                  type="text"
                  placeholder="_ _ _ _ _ _"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
            </div>
        </div>
    </div>
  );
}