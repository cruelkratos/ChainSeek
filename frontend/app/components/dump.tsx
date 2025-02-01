"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { InputSkeleton } from "./components/InputSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function GetNewPolicy() {
    const [solFile, setSolFile] = useState<File | null>(null)
    const [floatValue, setFloatValue] = useState("")
    const [contractAddress, setContractAddress] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [premium, setPremium] = useState<number | null>(null)
    const [showSuccess, setShowSuccess] = useState(false)
    const [countdown, setCountdown] = useState(5)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const calculatedPremium = 100
        setPremium(calculatedPremium)
        setIsLoading(false)
    }

    const handleAccept = () => {
        setShowSuccess(true)
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
                <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-4">Policy Accepted!</h3>
                    <p className="text-3xl font-bold text-green-400 mb-4">Success</p>
                    <p>Returning to form in {countdown} seconds...</p>
                </div>
            )
        }

        if (premium !== null) {
            return (
                <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-4">Calculated Premium Amount</h3>
                    <p className="text-3xl font-bold text-purple-400 mb-6">${premium.toFixed(2)}</p>
                    <div className="space-x-4">
                        <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-700 text-white">
                            Accept
                        </Button>
                        <Button onClick={handleReject} className="bg-red-600 hover:bg-red-700 text-white">
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

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Submit Policy
                </Button>
            </form>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
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
    )
}

