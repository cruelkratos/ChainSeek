"use client"
import { useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Terminal } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type AbiType = any 
const InsurancePortal = () => {
  const [formData, setFormData] = useState({
    solFile: null as File | null,
    contractAddress: "",
    floatingValue: "",
  })
  const handleFileChangeOld = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, solFile: e.target.files![0] }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }
  const [isCalculating, setIsCalculating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [account, setAccount] = useState("")
  const [balance, setBalance] = useState("")
  const [active, setActive] = useState(false)
  const [premium, setPremium] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("new")
  const [loading, setLoading] = useState(true)
  const [solFile, setSolFile] = useState<File | null>(null)
  const [floatValue, setFloatValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bool, setBool] = useState(false)
  const [contractAddress, setContractAddress] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [polStatus , setpolStatus] = useState(0)
  const [policies, setPolicies] = useState<{
    contractAddresses: string[]
    premiumAmounts: string[]
    coverageAmounts: string[]
    timeRems: string[]
    statuses: string[]
  }>({
    contractAddresses: [],
    premiumAmounts: [],
    coverageAmounts: [],
    timeRems: [],
    statuses: [],
  })

  const [abi, setAbi] = useState<AbiType | null>(null)
  const [solidityFile, setSolidityFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.name.endsWith(".sol")) {
      setSolidityFile(file)
    } else {
      alert("Please upload a valid .sol file")
    }
  }

  const handleCompile = async () => {
    if (!solFile) {
      alert("Please select a .sol file to compile.")
      return
    }

    console.log("Sending file:", solFile.name) 

    const formData = new FormData()
    formData.append("file", solFile)

    for (const [key, value] of formData.entries()) {
      console.log(key, value)
    }

    try {
      const response = await fetch("http://localhost:3001/compile", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      setAbi(data["_abi"])
      console.log("ABI:", data.abi)
      console.log("ABI:", data["_abi"])
    } catch (error) {
      console.error("Error compiling contract:", error)
    }
  }

  const handleAccept = () => {
    setShowSuccess(true)
    setFloatValue("")
    setContractAddress("")
  }

  const handleReject = () => {
    setPremium(null)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showSuccess && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      setShowSuccess(false)
      setPremium(null)
      setCountdown(5)
    }
    return () => clearTimeout(timer)
  }, [showSuccess, countdown])

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4 py-6">
          <Skeleton className="h-4 w-[200px] mx-auto bg-gray-800" />
          <Skeleton className="h-8 w-[150px] mx-auto bg-gray-800" />
        </div>
      )
    }

    if (showSuccess) {
      return (
        <div className="text-center py-2">
          <h3 className="text-xl font-semibold mb-4 text-gradient">Policy Accepted!</h3>
          <p className="text-3xl font-bold text-green-400 mb-4">Success</p>
          <p className="text-gradient">Returning to form in {countdown} seconds...</p>
        </div>
      )
    }

    if (premium !== null) {
      return (
        <div className="text-center py-2">
          <h3 className="text-xl font-semibold mb-4 text-gradient">Calculated Premium Amount</h3>
          <p className="text-3xl font-bold text-purple-400 mb-6">{premium} ETH</p>
          <p className="text-xm font-semibold mb-5 text-white text-gradient">insurance plan for smart contract: {contractAddress} with coverage amount: {floatValue} ETH</p>
          <div className="space-x-4">
            <Button onClick={handleBuyPolicy} className="bg-green-600 hover:bg-green-700 text-white rounded-xl">
              Accept
            </Button>
            <Button onClick={handleReject} className="bg-red-600 hover:bg-red-700 text-white rounded-xl">
              Reject
            </Button>
          </div>
        </div>
      )
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="solFile" className="block text-sm font-medium text-gray-200">
            Smart Contract File (.sol)
          </label>
          <Input
            id="solFile"
            type="file"
            accept=".sol"
            onChange={(e) => setSolFile(e.target.files?.[0] || null)}
            className="bg-gray-900 border-gray-800 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contractAddress" className="block text-sm font-medium text-gray-200">
            Contract Address
          </label>
          <Input
            id="contractAddress"
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="bg-gray-900 border-gray-800 text-white"
            placeholder="0x..."
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="float" className="block text-sm font-medium text-gray-200">
            Float Value
          </label>
          <Input
            id="float"
            type="number"
            step="0.01"
            value={floatValue}
            onChange={(e) => setFloatValue(e.target.value)}
            className="bg-gray-900 border-gray-800 text-white"
            required
          />
        </div>

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleCompile}>
          Submit Policy
        </Button>
      </form>
    )
  }

  const connectWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      console.log(address)
      setAccount(address)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const fetchBalance = async () => {
    if (account) {
      // console.log("give me your balance");
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const balanceWei = await provider.getBalance(account);
      // const balanceeth = ethers.formatEther(balanceWei);
      // setBalance(balanceeth);
      const response = await fetch("http://localhost:3001/test/accounts/1",{
        method : "GET",
        headers : {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      setBalance(data["balance"])
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          })
          if (accounts.length > 0) {
            setAccount(accounts[0])
            setIsAuthenticated(true)
          }
        } catch (error) {
          console.error("Failed to check connection:", error)
        }
      } else {
        console.log("MetaMask is not installed.")
      }
      setLoading(false)
    }
    checkConnection()
  }, [])

  useEffect(() => {
    if (account) {
      fetchBalance();
      const interval = setInterval(fetchBalance, 1000); 
      return () => clearInterval(interval); 
    }
  }, [account]);

  const checkValid = async (userWalletAddress: string) => {
    console.log("hello")
    const accounts = await ethers.getSigners()
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i] === userWalletAddress) setBool(true)
    }
    console.log(accounts[0])
    return setBool(false)
  }

  const calculatePremium = async () => {
    setIsCalculating(true)
    setPremium(null)

    try {
      let fileContent = ""
      if (solFile) {
        fileContent = await solFile.text()
        console.log("hello")
      }
      console.log(fileContent)

      const jsonPayload = {
        code: fileContent,
        coverageAmount: floatValue,
      }

      const response = await fetch("http://localhost:3001/flask", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonPayload),
      })

      if (!response.ok) throw new Error("Calculation failed")

      const data = await response.json()
      console.log(data)
      setPremium(data.premium_amt)

    } catch (error) {
      console.error("Error calculating premium:", error)

    } finally {
      setIsCalculating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await calculatePremium()
    setIsLoading(false)
  }

  const handlePolicyFetch = useCallback(async () => {
    try {
      console.log("called")

      const response = await fetch("http://localhost:3001/data/getcontractaddresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet_address: account }),
      })

      const data = await response.json()

      if (data.contract_addresses) {
        data.premium_amounts = data.premium_amounts.map((amount: string) => ethers.formatEther(amount));
        data.coverage_amounts = data.coverage_amounts.map((amount: string) => ethers.formatEther(amount));
        data.time_rems = data.time_rems.map((time: string) => {
          const _time = Number(time) + 60 - Math.round(Date.now() / 1000)
          if (_time >= 0) {
            return String(_time)
          } else {
            return String(0);
          }
        })
        setPolicies({
          contractAddresses: Array.from(data.contract_addresses),
          premiumAmounts: Array.from(data.premium_amounts),
          coverageAmounts: Array.from(data.coverage_amounts),
          timeRems: Array.from(data.time_rems),
          statuses: Array.from(data.statuses),
        })
      }
      
    } catch (error) {
      console.error(error)
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      handlePolicyFetch();
      const interval = setInterval(handlePolicyFetch, 1000); 
      return () => clearInterval(interval); 
    }
  }, [account, handlePolicyFetch]);


  const handleBuyPolicy = async () => {
    try {
      const payload = {
        wallet_address: account,
        contract_address: contractAddress,
        premium_amount: premium,
        coverage_amount: floatValue,
        time: Math.round(Date.now() / 1000)
      }

      const response = await fetch("http://localhost:3001/data/addclient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      })
      const data = await response.json()

      console.log("Start monitoring");

      const monitor_payload = {
        abi: abi,
        contract_address: contractAddress
      }

      const monitor = await fetch("http://localhost:3001/monitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(monitor_payload),
      })

      const monitor_data = await monitor.json()

      console.log("Charge an initial amount");

      const charge_payload = {
        wallet_address: account,
        contract_address: contractAddress,
        premium_amount: premium,
        coverage_amount: floatValue,
        time: Math.round(Date.now() / 1000)
      }
      
      const initial_charge = await fetch("http://localhost:3001/api/premium/paypremium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      })

      const receipt = await initial_charge.json()

      handleAccept()

    } catch (error) {
      console.error("BT: ", error)
    }
  }

  const handlePayPremium = async (contractAddress: string, premium: string, coverage: string, _time: Number) => {
    try {
      console.log(`Paying premium for contract: ${contractAddress} ${premium} ${coverage}`)

      const payload = {
        wallet_address: account,
        contract_address: contractAddress,
        premium_amount: premium,
        coverage_amount: coverage,
        time: Math.round(Date.now() / 1000) + Number(_time)
      }

      console.log("hereee1")
      const response = await fetch("http://localhost:3001/api/premium/paypremium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      })
      const data = await response.json()

    } catch (error) {
      console.error("BT: ", error)
    }
  }

  return (

    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        {!isAuthenticated ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-gradient">Welcome to Web3 Insurance</h1>
            <p className="text-xl text-muted-foreground mb-8">Connect your wallet to access your insurance portal.</p>
            <button
              onClick={connectWallet}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-colors inline-flex items-center"
            >
              <Wallet className="mr-2" />
              Connect with MetaMask
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gradient">Insurance Portal</h1>
              <div className="flex flex-col items-end">
                <p className="text-muted-foreground">Connected: {account}</p>
                <p className="text-muted-foreground">Balance: {balance} ETH</p>
              </div>
            </div>
            <div className="mb-6">
              <div className="border-b border-border">
                <nav className="-mb-px flex">
                  <button
                    onClick={() => setActiveTab("new")}
                    className={`mr-8 py-4 text-sm font-medium ${activeTab === "new"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-[#8E4BB5]"
                      }`}
                  >
                    Get New Policy
                  </button>

                  <button
                    onClick={() => setActiveTab("all")}
                    className={`py-4 text-sm font-medium ${activeTab === "all"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-[#8E4BB5]"
                      }`}
                  >
                    Show All Policies
                  </button>
                </nav>
              </div>
            </div>

            {activeTab === "new" ? (
              <div className="bg-card p-6 rounded-2xl border border-border purple-gradient max-w-lg w-full mx-auto mt-10">
                <Card className="max-w-md mx-auto bg-[#1a1825] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Get a New Policy</CardTitle>
                    <CardDescription className="text-gray-400">
                      Fill out the form below to get a new insurance policy.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{renderContent()}</CardContent>
                </Card>
              </div>
            ) : (
              <div className="bg-card p-6 rounded-lg border border-border purple-gradient">
                <h2 className="text-2xl font-semibold mb-4 text-white">Your Policies</h2>
                <p className="text-muted-foreground mb-4">Here's a list of all your active insurance policies.</p>
                {/* <button
                  className="bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-md font-medium transition-colors mb-4"
                  onClick={handlePolicyFetch}
                >
                  Fetch Policies
                </button> */}
                {policies.contractAddresses.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Contract Address</TableHead>
                          <TableHead>Premium Amount</TableHead>
                          <TableHead>Coverage Amount</TableHead>
                          <TableHead>Time Remaining</TableHead>
                          {/* <TableHead>Status</TableHead> */}
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      {policies.contractAddresses.map((address, index) => (
                        <TableRow key={address}>
                          <TableCell>{address.slice(0, 6)}...{address.slice(-4)}</TableCell>
                          <TableCell>{policies.premiumAmounts[index]}</TableCell>
                          <TableCell>{policies.coverageAmounts[index]}</TableCell>
                          <TableCell>{policies.timeRems[index]}</TableCell>
                          {/* <TableCell>{policies.statuses[index]}</TableCell> */}
                          <TableCell>
                              {Number(policies.timeRems[index]) > 0 ? (
                                <Button
                                  onClick={() => {
                                    console.log(address);
                                    console.log("log:", policies.premiumAmounts[index]);
                                    console.log("log:", policies.coverageAmounts[index]);
                                    console.log("log:", policies.timeRems[index]);
                                    handlePayPremium(address, 
                                      policies.premiumAmounts[index], 
                                      policies.coverageAmounts[index],
                                      Number(policies.timeRems[index])
                                    );
                                  }}
                                >
                                  Pay Premium
                                </Button>
                              ) : Number(policies.statuses[index]) === 3 ? (
                                <>
                                <span className="text-green-500 font-semibold">Insurance Paid</span>
                                
                                </>
                              ) : (
                                <span className="text-red-500 font-semibold">Policy Revoked</span>
                              )}
                            </TableCell>
                        </TableRow>
                      ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p>No policies found.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

export default InsurancePortal

