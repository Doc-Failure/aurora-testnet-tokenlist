const core = require('@actions/core');
const github = require('@actions/github');
var Web3 = require('web3');
const abi = require('./abi/ERC20TokenFactory.json');
const aurora_tokens = require('./aurora_tokens.json');
var fs = require('fs');

function retrieveContract(){
    contract.methods.getContracts().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, (error, result) => {
        if(!error){
            let tokenList=[];
            result.forEach(element => {
                let tokenElement = {
                    chainId: 1313161555,
                    address: element._address,
                    symbol: element._symbol,
                    name: element._name,
                    decimals: 18,
                    logoURI: 'https://raw.githubusercontent.com/sushiswap/icons/master/token/unknown.png',
                    tags: ['Aurora']
                };
                tokenList.push(tokenElement)
            });
            aurora_tokens.tokens=tokenList;
            fs.writeFileSync("aurora_tokens.json",JSON.stringify(aurora_tokens));
        }else{
            console.log(error);
        }
      })
}

try {
  console.log("launching v2.3")
  var web3 = new Web3("https://testnet.aurora.dev");
  var contract = new web3.eth.Contract(abi, '0xaeFAcfec21258446C63E0571782D8291c5244175');
  retrieveContract()
  // `who-to-greet` input defined in action metadata file

/*   const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  
  const time = (new Date()).toTimeString(); */
  core.setOutput("aurora_tokens.json updated!");
  // Get the JSON webhook payload for the event that triggered the workflow
  /* const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`); */
} catch (error) {
  core.setFailed(error.message);
}