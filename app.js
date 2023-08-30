const { Web3 } = require('web3');
const fs = require('fs');

// Initialize endpoint URL
const nodeUrl = 'https://sepolia.infura.io/v3/code';

// Create the node connection
const web3 = new Web3(nodeUrl);

const PRIVATE_KEY = 'privkey';
const PUBLIC_KEY = 'addy';

// Read ABI
const abiJson = fs.readFileSync('abi.json');
const abi = JSON.parse(abiJson);

const contractAddress = 'addy';

const contract = new web3.eth.Contract(abi, contractAddress);

// Get DPP by DPP identifier
async function getDppHistory(dppIdentifier) {
  const dpp = await contract.methods.getDPPHistory(dppIdentifier).call();
  return dpp;
}

async function getDppFirst(dppIdentifier) {
  const dpp = await contract.methods.getFirstDPP(dppIdentifier).call();
  return dpp;
}

async function getDppLast(dppIdentifier) {
  const dpp = await contract.methods.getLastDPP(dppIdentifier).call();
  return dpp;
}

async function addDpp(companyName, productType, productDetail, manufactureDate) {
  // Get nonce
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY);

  // Create transaction
  const txData = contract.methods
    .addDPP(companyName, productType, productDetail, manufactureDate)
    .encodeABI();

  const txObject = {
    nonce: nonce,
    from: PUBLIC_KEY,
    gas: 250000,
    gasPrice: '1000000',
    data: txData,
  };

  // Sign transaction
  const signedTx = await web3.eth.accounts.signTransaction(txObject, PRIVATE_KEY);

  // Send transaction
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(receipt);

  return receipt;
}

async function updateDpp(dppIdentifier, companyName, productType, productDetail, manufactureDate) {
  // Get nonce
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY);

  // Create transaction
  const txData = contract.methods
    .updateDPP(dppIdentifier, companyName, productType, productDetail, manufactureDate)
    .encodeABI();

  const txObject = {
    nonce: nonce,
    from: PUBLIC_KEY,
    gas: 250000,
    gasPrice: '1000000',
    data: txData,
  };

  // Sign transaction
  const signedTx = await web3.eth.accounts.signTransaction(txObject, PRIVATE_KEY);

  // Send transaction
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(receipt);

  return receipt;
}

module.exports = {
  getDppHistory,
  getDppFirst,
  getDppLast,
  addDpp,
  updateDpp,
};
// Example usage:
// Replace the function calls and parameters as needed
