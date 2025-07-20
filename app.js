// 🌍 EFIK Smart Contract Logic - app.js

async function loadContract() {
  try {
    // 📦 Fetch ABI from external JSON file
    const abiResponse = await fetch("abi.json");
    const abi = await abiResponse.json();

    // 🔗 Connect to browser wallet
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // 🧬 Set your deployed EFIK token contract address
    const contractAddress = "0x75779e763c725838E93685cC68B442637D47Ddcc";0xBeB63406959ED322AfC0d2881217D28F6c85815b
    const efikContract = new ethers.Contract(contractAddress, abi, signer);

    return efikContract;
  } catch (error) {
    console.error("🔴 Failed to load EFIK contract:", error);
    alert("Connection error. Check ABI path or wallet access.");
    return null;
  }
}

// 💧 Trigger Airdrop Function
async function claimEFIKAirdrop() {
  const contract = await loadContract();
  if (!contract) return;

  try {
    const recipient = await contract.signer.getAddress();
    const amount = ethers.utils.parseUnits("100", 18); // 🎁 100 EFIK

    const tx = await contract.transfer(recipient, amount);
    await tx.wait();
    alert("✅ EFIK Airdrop claimed!");
  } catch (error) {
    console.error("❌ Airdrop failed:", error);
    alert("Transaction failed. Check gas or contract.");
  }
  }
