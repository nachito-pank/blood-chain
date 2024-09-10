import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import './AdminPanel.css';

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

const AdminPanel = () => {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [centerName, setCenterName] = useState("");
    const [location, setLocation] = useState("");
    const [stockInfo, setStockInfo] = useState([]);
    const [donations, setDonations] = useState([]);

    // Initialise la connexion à Ethereum
    useEffect(() => {
        const init = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(provider);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(bloodChainAddress, BloodChainABI, signer);
            setContract(contract);
        };
        init();
    }, []);

    // Enregistre un centre médical
    const registerMedicalCenter = async () => {
        try {
            const tx = await contract.registerMedicalCenter(centerName, location);
            await tx.wait();
            alert("Centre médical enregistré avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du centre médical", error);
        }
    };

    // Obtenir les stocks de sang pour un centre
    const getStockInfo = async () => {
        try {
            const stock = await contract.getBloodStock(accounts[0], "A+"); // Exemple avec le type de sang "A+"
            setStockInfo(stock);
        } catch (error) {
            console.error("Erreur lors de la récupération des stocks", error);
        }
    };

    // Affiche les dons
    const getDonations = async () => {
        try {
            const donationCount = await contract.donations.length;
            const donationList = [];
            for (let i = 0; i < donationCount; i++) {
                const donation = await contract.getDonation(i);
                donationList.push(donation);
            }
            setDonations(donationList);
        } catch (error) {
            console.error("Erreur lors de la récupération des dons", error);
        }
    };

    return (
        <div className="admin-panel">
            <h2><u>Panneau d'administration</u></h2>
            <div className="form-group">
                <label>Nom du Centre Médical</label>
                <input
                    type="text"
                    value={centerName}
                    onChange={(e) => setCenterName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Localisation</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <button onClick={registerMedicalCenter}>Enregistrer Centre</button>

            <div className="stock-info">
                <button onClick={getStockInfo}>Voir les stocks</button>
                {stockInfo && <p>Stock : {stockInfo}</p>}
            </div>

            <div className="donations">
                <button onClick={getDonations}>Voir les Dons</button>
                {donations.length > 0 && donations.map((donation, index) => (
                    <div key={index}>
                        <p>Don ID: {donation.donationId}</p>
                        <p>Donateur: {donation.donor}</p>
                        <p>Centre Médical: {donation.medicalCenter}</p>
                        <p>Type de Sang: {donation.bloodType}</p>
                        <p>Date: {new Date(donation.date * 1000).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;