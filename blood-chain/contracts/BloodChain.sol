// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BloodChain {
    // Struct pour stocker les informations des donateurs
    struct Donor {
        address donorAddress;
        string name;
        string bloodType;
        bool isRegistered;
    }

    // Struct pour stocker les informations des centres médicaux
    struct MedicalCenter {
        address centerAddress;
        string name;
        string location;
        bool isRegistered;
    }

    // Struct pour enregistrer un don de sang
    struct BloodDonation {
        uint donationId;
        address donor;
        address medicalCenter;
        string bloodType;
        uint date;
    }

    // Mappings pour stocker les donateurs et les centres
    mapping(address => Donor) public donors;
    mapping(address => MedicalCenter) public medicalCenters;

    // Mapping pour gérer les stocks de sang par centre médical et par type de sang
    mapping(address => mapping(string => uint)) public bloodStocks;

    // Liste des dons de sang
    BloodDonation[] public donations;

    // Événements pour notifier des actions importantes
    event DonorRegistered(address donor, string name);
    event MedicalCenterRegistered(address center, string name);
    event BloodDonated(address donor, string bloodType, address medicalCenter, uint date);

    // Inscription d'un donateur
    function registerDonor(string memory _name, string memory _bloodType) public {
        require(!donors[msg.sender].isRegistered, "Donor already registered");
        donors[msg.sender] = Donor(msg.sender, _name, _bloodType, true);
        emit DonorRegistered(msg.sender, _name);
    }

    // Inscription d'un centre médical
    function registerMedicalCenter(string memory _name, string memory _location) public {
        require(!medicalCenters[msg.sender].isRegistered, "Medical center already registered");
        medicalCenters[msg.sender] = MedicalCenter(msg.sender, _name, _location, true);
        emit MedicalCenterRegistered(msg.sender, _name);
    }

    // Ajouter un don de sang
    function donateBlood(address _medicalCenter, string memory _bloodType) public {
        require(donors[msg.sender].isRegistered, "Donor must be registered");
        require(medicalCenters[_medicalCenter].isRegistered, "Medical center must be registered");

        // Ajouter le don dans la liste
        uint donationId = donations.length;
        donations.push(BloodDonation(donationId, msg.sender, _medicalCenter, _bloodType, block.timestamp));
        
        // Mise à jour des stocks du centre médical
        bloodStocks[_medicalCenter][_bloodType]++;

        emit BloodDonated(msg.sender, _bloodType, _medicalCenter, block.timestamp);
    }

    // Consulter le stock de sang dans un centre médical
    function getBloodStock(address _centerAddress, string memory _bloodType) public view returns (uint) {
        require(medicalCenters[_centerAddress].isRegistered, "Medical center must be registered");
        return bloodStocks[_centerAddress][_bloodType];
    }

    // Consulter un don spécifique par son ID
    function getDonation(uint _donationId) public view returns (BloodDonation memory) {
        require(_donationId < donations.length, "Invalid donation ID");
        return donations[_donationId];
    }
}
