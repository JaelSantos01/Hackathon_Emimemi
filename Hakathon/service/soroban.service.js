// ... (importaciones de stellar-sdk)

const XCO2_CONTRACT_ID = process.env.XCO2_CONTRACT_ID; 

/**
 * Llama al contrato XCO2 para acuñar tokens basados en la lectura de CO2.
 * @param {string} userWalletAddress - La dirección de la billetera Stellar del usuario.
 * @param {number} co2Value - El valor de CO2 leído.
 */
async function callMintCo2Tokens(userWalletAddress, co2Value) {
  console.log(`Acuñando tokens para ${userWalletAddress} basado en C02: ${co2Value}`);

  const args = [
    new Address(userWalletAddress).toScVal(),
    ScVal.fromU32(co2Value),                 
  ];

  const op = Operation.invokeHostFunction({
    contract: XCO2_CONTRACT_ID,
    function: "mint_for_co2", 
    args: args,
  });

  try {
    const sourceAccount = await server.getAccount(keypair.publicKey());
    const txBuilder = new TransactionBuilder(sourceAccount, {
      fee: "100000",
      networkPassphrase: NETWORK_PASSPHRASE,
    });

    txBuilder.addOperation(op);
    const tx = txBuilder.build();
    tx.sign(keypair);

    const txResponse = await server.sendTransaction(tx);
    

    console.log("¡Acuñación exitosa!");
    return { success: true, hash: txResponse.hash };

  } catch (error) {
    console.error("Error en callMintCo2Tokens:", error);
    throw error;
  }
}

module.exports = {
  callIncrementContract, 
  callMintCo2Tokens,   
};