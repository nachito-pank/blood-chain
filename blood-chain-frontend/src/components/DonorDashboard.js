import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './DonorDashboard.css';

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

const bloodChainAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; // Adresse du contrat

const DonorDashboard = () => {
    const [donor, setDonor] = useState(null);
    const [donations, setDonations] = useState([]);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    const getDonorData = async () => {
        if (!signer) return;
        try {
            const contract = new ethers.Contract(bloodChainAddress, BloodChainABI, signer);
            const donorData = await contract.donors(await signer.getAddress());
            setDonor(donorData);
        } catch (error) {
            console.error('Erreur lors de la récupération des informations du donateur:', error);
        }
    };

    const getDonations = async () => {
        if (!signer) return;
        try {
            const contract = new ethers.Contract(bloodChainAddress, BloodChainABI, signer);
            const donorAddress = await signer.getAddress();
            const donationIds = await contract.getDonationsForDonor(donorAddress);
            const donationPromises = donationIds.map(id => contract.getDonation(id));
            const donationsData = await Promise.all(donationPromises);
            setDonations(donationsData);
        } catch (error) {
            console.error('Erreur lors de la récupération des dons:', error);
        }
    };

    useEffect(() => {
        const initializeProviderAndSigner = async () => {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setProvider(provider);
                setSigner(signer);
            } catch (error) {
                console.error('Erreur lors de l\'initialisation du provider et du signer:', error);
            }
        };

        initializeProviderAndSigner();
    }, []);

    useEffect(() => {
        if (signer) {
            getDonorData();
            getDonations();
        }
    }, [signer]);

    return (
        <div className="donor-dashboard">
            <h2>Tableau de Bord du Donateur</h2>
            {donor && (
                <div>
                    <h3>Informations du Donateur</h3>
                    <p>Nom: {donor.name}</p>
                    <p>Type de sang: {donor.bloodType}</p>
                    <p>Adresse: {donor.donorAddress}</p>
                </div>
            )}
            <h3>Dons Réalisés</h3>
            {donations.length > 0 ? (
                <ul>
                    {donations.map((donation, index) => (
                        <li key={index}>
                            <p>ID: {donation.donationId.toString()}</p>
                            <p>Centre médical: {donation.medicalCenter}</p>
                            <p>Type de sang: {donation.bloodType}</p>
                            <p>Date: {new Date(donation.date * 1000).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun don trouvé.</p>
            )}
        </div>
    );
};

export default DonorDashboard;