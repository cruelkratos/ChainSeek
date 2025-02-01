"use client"

import { useState } from "react";

type AbiType = any; // Define a proper ABI type if available

export default function CompileButton() {
    const [abi, setAbi] = useState<AbiType | null>(null);
    const [solidityFile, setSolidityFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.name.endsWith(".sol")) {
            setSolidityFile(file);
        } else {
            alert("Please upload a valid .sol file");
        }
    };

    const handleCompile = async () => {
        if (!solidityFile) {
            alert("Please select a .sol file to compile.");
            return;
        }

        console.log("Sending file:", solidityFile.name); // Log file name

        const formData = new FormData();
        formData.append("file", solidityFile);

        // Log FormData to inspect its contents
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await fetch("http://localhost:3001/compile", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setAbi(data.abi);
            console.log("ABI:", data.abi);
        } catch (error) {
            console.error("Error compiling contract:", error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="file"
                accept=".sol"
                onChange={handleFileChange}
                className="mb-4"
            />
            <button
                onClick={handleCompile}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
                Compile Solidity File
            </button>
            {abi && <pre className="mt-4 text-white">{JSON.stringify(abi, null, 2)}</pre>}
        </div>
    );
}
