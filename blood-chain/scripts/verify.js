async function main() {
    const { ethers, run } = require("hardhat");
    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

    console.log("Verifying contract:", contractAddress);

    await run("verify:verify", {
        address: contractAddress,
        constructorArguments: [], // Liste des arguments du constructeur, si nécessaire
    });

    console.log("Contract verified!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
