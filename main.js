async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    const tokenDepositWithdraw = new web3.eth.Contract(
        TokenDepositWithdraw_ABI,
        TokenDepositWithdraw_NETWORKS[networkId].address
    );

    const WSGBBalance = await tokenDepositWithdraw.methods.balancesWSGB(accounts[0]).call();
    const GuigzTokenBalance = await tokenDepositWithdraw.methods.balancesGuigzToken(accounts[0]).call();

    document.getElementById("WSGBBalance").innerText = `WSGB Balance: ${WSGBBalance}`;
    document.getElementById("GuigzTokenBalance").innerText = `GuigzToken Balance: ${GuigzTokenBalance}`;
}

loadBlockchainData();
