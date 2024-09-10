import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'; // ethers v6
import './Login.css'; // Assure-toi que tu as bien le fichier CSS

const BloodChainABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "bloodType",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "medicalCenter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            }
        ],
        "name": "BloodDonated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "DonorRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "center",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "MedicalCenterRegistered",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "bloodStocks",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_medicalCenter",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_bloodType",
                "type": "string"
            }
        ],
        "name": "donateBlood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "donations",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "donationId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "medicalCenter",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "bloodType",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "donors",
        "outputs": [
            {
                "internalType": "address",
                "name": "donorAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "bloodType",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_centerAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_bloodType",
                "type": "string"
            }
        ],
        "name": "getBloodStock",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_donationId",
                "type": "uint256"
            }
        ],
        "name": "getDonation",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "donationId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "donor",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "medicalCenter",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "bloodType",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "date",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct BloodChain.BloodDonation",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "medicalCenters",
        "outputs": [
            {
                "internalType": "address",
                "name": "centerAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "location",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_bloodType",
                "type": "string"
            }
        ],
        "name": "registerDonor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_location",
                "type": "string"
            }
        ],
        "name": "registerMedicalCenter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const bloodChainAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const Login = () => {
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState(null);
    const [donorInfo, setDonorInfo] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const checkIfWalletIsConnected = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_accounts", []);
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                setConnected(true);
                fetchDonorInfo(accounts[0]);
            } else {
                setConnected(false);
            }
        }
    };

    const fetchDonorInfo = async (address) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(bloodChainAddress, BloodChainABI, provider);
        try {
            const donor = await contract.donors(address);
            if (donor.isRegistered) {
                setDonorInfo(donor);
            } else {
                setDonorInfo(null);
            }
        } catch (err) {
            setError("Erreur lors de la récupération des informations du donateur.");
        }
    };

    const connectWallet = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);
            setConnected(true);
            fetchDonorInfo(accounts[0]);
        } catch (err) {
            setError("Erreur lors de la connexion au portefeuille.");
        }
    };

    return (
        <div>
            {connected ? (
                <div>
                    {donorInfo ? (
                        <p>Bienvenue, {donorInfo.name}. Vous êtes inscrit comme donateur.</p>
                    ) : (
                        <p>Votre compte n'est pas encore enregistré en tant que donateur.</p>
                    )}
                </div>
            ) : (
                <button onClick={connectWallet}>Connectez votre portefeuille</button>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;