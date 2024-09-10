const { expect } = require("chai");

describe("BloodChain", function () {
    it("Should register a donor and a medical center", async function () {
        const [owner, donor, medicalCenter] = await ethers.getSigners();
        const BloodChain = await ethers.getContractFactory("BloodChain");
        const bloodChain = await BloodChain.deploy();
        await bloodChain.deployed();

        // Inscrire un donateur
        await bloodChain.connect(donor).registerDonor("John Doe", "O+");
        const registeredDonor = await bloodChain.donors(donor.address);
        expect(registeredDonor.isRegistered).to.be.true;
        expect(registeredDonor.name).to.equal("John Doe");

        // Inscrire un centre médical
        await bloodChain.connect(medicalCenter).registerMedicalCenter("MedCenter", "Paris");
        const registeredCenter = await bloodChain.medicalCenters(medicalCenter.address);
        expect(registeredCenter.isRegistered).to.be.true;
        expect(registeredCenter.name).to.equal("MedCenter");
    });
});
