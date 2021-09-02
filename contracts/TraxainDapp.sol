// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import  "./TraxainToken.sol";
import "./IERC20.sol";
import "./SafeERC20.sol";
import "./Address.sol";
import "./SafeMath.sol";



contract TraxainDapp {
    
    
    
    TraxainToken public traxainToken;
    uint public mainID;
    uint public time;
    address public applicant;
    address payable public depositer;
    //uint[][] public subs;
    
    struct Trip {
           uint creationDay;
           string extRef;
           uint bufferDay;
           uint payDay;
           uint status;
           address verifier;
           uint[] idSub;
           
   }


   struct Sub {
           uint idS;
           address participant;
           uint price;
           uint mainTrip;
           
   }

   struct User {
           
           address participant;
           uint[] idSub;
           
   }

  
     
    mapping (uint => Trip) public everyTrip;
    mapping (uint => Sub) public Subs;
    mapping (address => User) public Users;
    mapping (uint => Sub) public Main;
    
    constructor(TraxainToken _traxainToken, address payable _depositer)  {
    
        traxainToken = _traxainToken;
        depositer = _depositer;
      
    }
    
  
   
   
   
   function createTrip (string memory _extRef, uint  _bufferDay, uint  _payDay, uint _deposited, address _verifier) public payable {
       mainID ++;
       mainID ++;
       Trip storage newTrip = everyTrip[mainID];
       newTrip.creationDay = time;
       newTrip.extRef = _extRef;
       newTrip.idSub.push(mainID);
       newTrip.bufferDay = _bufferDay + time;
       newTrip.payDay = _payDay + time;
       
       //deposit(mainID,_deposited);
       newTrip.status = 1;
       newTrip.verifier = _verifier;
       traxainToken.transferFrom(msg.sender,depositer,_deposited);
       uint original = mainID - 1;
        Subs[mainID] = Sub(mainID,msg.sender,_deposited,original);
        Users[msg.sender].idSub.push(mainID);

       
      
   }
   
   function addSub (uint _mainID, address _provider, uint _price)  public  {
       
       //uint IDsub = trips[_mainID].idSub.length;
       generalRequirements(_mainID);
       uint index = everyTrip[_mainID].idSub.length-1;
       uint currentSub = everyTrip[_mainID].idSub[index];
       require( _price <= Subs[currentSub].price, "price must be equal or smaller than amount deposited");
       mainID++;
       mainID ++;
       uint original = _mainID -1;
        Subs[mainID] = Sub(mainID,_provider,_price,original);
       everyTrip[_mainID].idSub.push(mainID);
       everyTrip[_mainID].status = 2;
       Users[_provider].idSub.push(mainID);
    }
       
   
     

    function confirmByClient (uint _mainID ) public returns(bool){
        confRequirements(_mainID);

        require(msg.sender == Subs[everyTrip[_mainID].idSub[0]].participant, "you must be the client");
        everyTrip[_mainID].status = 3;
        return true;
        
       
    }

    function confirmByVeryfier (uint _mainID ) public returns(bool){
        confRequirements(_mainID);
        require(msg.sender == everyTrip[_mainID].verifier , "you must be the verifier");
        everyTrip[_mainID].status = 3;
        return true;
        
       
   }
   
    function complaintByClient (uint _mainID ) public {
       require(everyTrip[_mainID].bufferDay> time, "Too late to complain");
    require(msg.sender == Subs[everyTrip[_mainID].idSub[0]].participant, "you must be the client");
       everyTrip[_mainID].status = 4;
   }
   
    function solveComplaint (uint _mainID) public {
    require(msg.sender == everyTrip[_mainID].verifier , "you must be the verifier");
       everyTrip[_mainID].status = 3;

   }
   
    function unlockFunds (uint _mainID) public {
       require(everyTrip[_mainID].status == 3, "There's a problem, review the data & confirm there aren't complaints");
       require( everyTrip[_mainID].bufferDay<= time, "Too early to unlock");
       everyTrip[_mainID].status = 5;

   }
    function sendFunds (uint _mainID  ) public payable{
        require(everyTrip[_mainID].status == 5, "There's a problem, review the data & confirm there aren't complaints");
        require(everyTrip[_mainID].payDay<= time, "Too early to send");
        uint balance;
        uint i = 0;
        for (i;i< everyTrip[_mainID].idSub.length - 1;i++){
            balance = Subs[everyTrip[_mainID].idSub[i]].price-Subs[everyTrip[_mainID].idSub[i+1]].price;
            traxainToken.transferFrom(depositer,Subs[everyTrip[_mainID].idSub[i]].participant ,balance);
        }
        traxainToken.transferFrom(depositer,Subs[everyTrip[_mainID].idSub[i]].participant ,Subs[everyTrip[_mainID].idSub[i]].price);
        everyTrip[_mainID].status = 6;
   }
   
    function markAsPaid (uint _mainID) public {
         require (_mainID <= mainID, "id must exist");
            require(msg.sender == everyTrip[_mainID].verifier , "you must be the verifier");
            
        everyTrip[_mainID].status = 6;
   }


   function setTime () public returns (uint){
         
            require(msg.sender == depositer , "you must be the depositer");
            
       uint timeSet = time++;
       return timeSet;
   }
   


//------------------------------------------------------------------------

  function getTripExtRef(uint _id)  public view returns (string memory) {
       Trip memory _tripRef = everyTrip[_id];
                    string memory ref = _tripRef.extRef;
                   return ref;
   }

    function getDepositer()  public view returns (address) {
                    address depos = depositer;
                   return depos;
   }

    function getMsgSender()  public view returns (address) {
                    
                   return msg.sender;
   }




function getOwner(uint _id) public view returns (address){
  require (_id <= mainID, "id must exist-owner");
    Trip memory _tripSub = everyTrip[_id];
                   uint currentSub = _tripSub.idSub[_tripSub.idSub.length-1];
                   

Sub memory _sub = Subs[currentSub];
address owner = _sub.participant;
return owner;
 }


  
  
  





      function getSender() public view returns (address){

        
       return msg.sender;
   }
      
    function generalRequirements(uint _id) public view {
        require (_id <= mainID, "id must exist-general");
       
        address owner = getOwner(_id);
        address sender = getSender();
       
       require (sender == owner , "you are not the contract's owner");
       
   }
   
   function confRequirements(uint _id) private view{
       require (_id <= mainID, "id must exist-conf");
        require(everyTrip[_id].status > 1, "no carrier was selected for this trip");
        
    }

   function getSubs(uint _mainID) public view returns(uint) {
Trip memory _tripSub = everyTrip[_mainID];
                   uint lastSubNo = _tripSub.idSub.length;


      //uint result = trips[_mainID].idSub[lastSubNo];
      return lastSubNo;
   }
   
    function getSubAddress(uint _idSub) public view returns(address){
      address resultTwo = Subs[_idSub].participant;
      return resultTwo;
   }
   
    function getSubPrices(uint _idSub) public view returns(uint){
      uint result3 = Subs[_idSub].price;
      return result3;
   }

   function getSubIds(uint _mainID, uint _ind) public view returns(uint){
      uint myId = everyTrip[_mainID].idSub[_ind];
      return myId;
   }

   function getSubsArray(address _user) public view returns(uint[] memory){
      uint[] memory myArray = Users[_user].idSub;
      return myArray;
   }

   function getMainFromSub(uint _idSub) public view returns(uint){
    uint main = Subs[_idSub].mainTrip;
    return main;
      
   }

   


   
  
   
}