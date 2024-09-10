

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const BloodChain = await ethers.getContractFactory("BloodChain");
    const bloodChain = await BloodChain.deploy();

    console.log("BloodChain deployed to:", bloodChain.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
