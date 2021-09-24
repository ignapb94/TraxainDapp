const TraxainToken = artifacts.require("TraxainToken");
const SafeMath = artifacts.require("SafeMath");
const SafeERC20 = artifacts.require("SafeERC20");
const IERC20Metadata = artifacts.require("IERC20Metadata");
const Address = artifacts.require("Address");
const TraxainDapp = artifacts.require("TraxainDapp");




module.exports = async function(deployer) {
  await deployer.deploy(TraxainToken);
  const traxainToken = await TraxainToken.deployed()

  await deployer.deploy(TraxainDapp, traxainToken.address, '0xBdc50027c1CC234C6f30838656D969365de91a2b');
  const traxainDapp = await TraxainDapp.deployed()
 
  await deployer.deploy(SafeMath);
  const safeMath = await SafeMath.deployed()

  await deployer.deploy(SafeERC20);
  const safeERC20 = await SafeERC20.deployed()


  await deployer.deploy(Address);
  const address = await Address.deployed()

 
  


};
