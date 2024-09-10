import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './SignUp.css';

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
const bloodChainAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Adresse du contrat déployé

const SignUp = () => {
    const [name, setName] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const init = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(bloodChainAddress, BloodChainABI, signer);
            setProvider(provider);
            setContract(contract);
        };
        init();
    }, []);

    const registerDonor = async () => {
        try {
            const tx = await contract.registerDonor(name, bloodType);
            await tx.wait();
            alert("Enregistrement réussi !");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement", error);
        }
    };

    return (
        <div className="signup-form">
            <h2><u>Inscription</u></h2>
            <div className="form-group">
                <label>Nom :</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Groupe Sanguin :</label>
                <input type="text" value={bloodType} onChange={(e) => setBloodType(e.target.value)} />
            </div>
            <button onClick={registerDonor}>S'inscrire</button>
        </div>
    );
};

export default SignUp;