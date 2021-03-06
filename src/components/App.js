import React, { Component } from 'react'
import Web3 from 'web3'
import $ from 'jquery';
import TraxainToken from '../artifacts/TraxainToken.json'
import TraxainDapp from '../artifacts/TraxainDapp.json'
import Main from './Main'
import Navbar from './Navbar'
import List from './List'
import TripDetails from './TripDetails'
import BackOffice from './BackOffice'
import Actions from './Actions'
import Creation from './Creation'
import ErrorHappened from './ErrorHappened'

import './App.css'
//import { render} from "react-dom";

//import { TRAXAIN_TOKEN_ABI,TRAXAIN_TOKEN_ADDRESS, TRAXAIN_DAPP_ABI,TRAXAIN_DAPP_ADDRESS} from '../config'




class App extends Component {

 

async componentWillMount() {
  

  
  let deviceType = await this.getDeviceType()
  await this.getDate()
  await this.setState({device:deviceType})
  await this.loadWeb3()
  await this.loadBlockchainData()
  await this.getTimeServer()
  await this.getMainID()

  

/*} catch(err) {
  await this.setState({errorHappened:true})

    console.log("estoy funcionando!!");
}*/


}




async loadWeb3() {

  try {

  if(window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    await this.setState({noWallet:false})
    console.log(this.state.noWallet)
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    await this.setState({noWallet:false})
    console.log(this.state.noWallet)


  }
  else {
    
   await this.setState({loading: true})
   await this.setState({somethingSearched:0}) 
   await this.setState({traxainToken: {}})
   await this.setState({traxainDapp: {}})
   await this.setState({allowed:0})
   await this.setState({myTrip:''})
   await this.setState({strStatus:''})
   await this.setState({noWallet:true})
   await this.setState({errorMsg:'You are currently on Normal Mode, if you want to use secure Mode, install metamask'})
   await this.setState({errorHappened:true})

   console.log("no nos hemos conectado")

  await console.log(this.state.errorMsg)
  
    
 
}
} catch(err) {
  await this.setState({noWallet:true})
  console.log("error en loadWeb3")


}
}



async loadBlockchainData() {

  
  try {
  const web3 = new Web3(Web3.givenProvider)// || "http://localhost:8545")

/*  const networkId = await web3.eth.net.getId()

  const traxainTokenData = TraxainToken.networks[networkId];
  const traxainDappData = TraxainDapp.networks[networkId];
  */
  const accounts = await web3.eth.getAccounts()
  this.setState({account: accounts[0]})
  const traxainToken = new web3.eth.Contract(TraxainToken.abi,  '0xC8EABB1F395D496C74344cd7e00E6E4b85d6Edd7')
  this.setState({traxainToken})
  const traxainDapp = new web3.eth.Contract(TraxainDapp.abi,  '0x371900FACC3725F5Ca03d7220e2673a627a211D7')
  this.setState({traxainDapp})
  let allowed = await this.state.traxainToken.methods.allowance(this.state.account, '0x371900FACC3725F5Ca03d7220e2673a627a211D7').call()
  allowed = await allowed.toString()
  allowed = await window.web3.utils.fromWei(allowed, 'ether')
  await this.setState({allowed: allowed})
  let traxainTokenBalance = await this.state.traxainToken.methods.balanceOf(this.state.account).call()
  traxainTokenBalance = await traxainTokenBalance.toString()
  traxainTokenBalance = await window.web3.utils.fromWei(traxainTokenBalance, 'ether')
  await this.setState({traxainTokenBalance: traxainTokenBalance})
/*
  let numberTrip = await this.state.traxainDapp.methods.mainID().call()   
  await this.setState({numberTrip: numberTrip})  
  */
  //let time = await this.state.traxainDapp.methods.time().call()
  //console.log(time)
  //await this.setState({time: time}) 
  
} catch(err) {
 
 console.log("error al loadblockchain")
 //   console.log("estoy funcionando!!");
}

  this.setState({loading: false})
}



async getDeviceType() {
   let ua = await navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};




async getTimeServer() {

  try {

console.log("inicio getTimeServer")
  var time
  var noWallet = await this.state.noWallet

  if(noWallet == true){
            console.log("error en nowallet treu")
            var url = await this.state.endPoint+ 'get-time';
            await fetch(url).then((response) => response.json())
            .then(function(data) { 
              time = data;
              
            })
            
            await this.setState({errorHappened:true})
            await this.setState({errorMsg:'You are currently on Normal Mode, if you want to use secure Mode, install metamask'})
            

          } else {

            time = await this.state.traxainDapp.methods.time().call()
            console.log("con wallet")
            console.log("error en nowallet false")

          }
  await this.setState({ time: time })
  console.log("Current Time " + this.state.time)
  
} catch(err) {
  
    console.log("error en getTime server");
    //window.location.replace("http://ecargo.link")
    
}

}



async getMainID() {

  try {


  var mainID
  var noWallet = await this.state.noWallet

  if(noWallet == true){

            var url = await this.state.endPoint+ 'get-mainID';
            await fetch(url).then((response) => response.json())
            .then(function(data) { 
              mainID = data;
              
            })
            console.log("sin wallet")
          } else {

            mainID = await this.state.traxainDapp.methods.mainID().call()
            console.log("con wallet")
   

          }
  await this.setState({ numberTrip: mainID })
  await console.log(mainID)
} catch(err) {
  await this.setState({errorHappened:true})
  await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

    console.log("error en getMain");
}

}




async getDate(){

try {

var today = await new Date();
today = await today.getTime()
  
today = await parseInt(today, 10);

await this.setState({date:today})
//await console.log(today)
} catch(err) {
  await this.setState({errorHappened:true})
  await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

    console.log("error en get Date");
}


}





  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      traxainToken: {},
      traxainDapp: {},
      endPoint:'https://traxain.online/',
      traxainTokenBalance: '0',
      allowed:'',
      numberTrip: 0,
      myTrip:'',
      loading: false,
      idSubs: '',
      Subs: [],
      thisTripID:'',
      myTripsCount:0,
      somethingSearched:0,
      wantToCreate:true,
      dontCall:false,
      userRole:'',
      strStatus:'',
      thisDeposited:'',
      errorHappened:false,
      time:'',
      noWallet:true,
      device:'',
      date:'',
      errorMsg:'',
      backOfficeView:false
    }
    this.incAllow = this.incAllow.bind(this)
    this.createTrip = this.createTrip.bind(this)
    this.addSub = this.addSub.bind(this)
    this.confirmClient = this.confirmClient.bind(this)
    this.confirmVer = this.confirmVer.bind(this)
    this.complainCli = this.complainCli.bind(this)
    this.complainSolve = this.complainSolve.bind(this)
    this.unlock = this.unlock.bind(this)
    this.send = this.send.bind(this)
    this.mark = this.mark.bind(this)
    this.search = this.search.bind(this)
    this.usersTripCount = this.usersTripCount.bind(this)
    this.viewBackOffice = this.viewBackOffice.bind(this)
    this.getUserRole = this.getUserRole.bind(this)
    this.showCreationFields = this.showCreationFields.bind(this)
    this.refreshPage = this.refreshPage.bind(this)
    this.errorStatus = this.errorStatus.bind(this)
    this.increaseCount = this.increaseCount.bind(this)
    this.searchManual = this.searchManual.bind(this)





  }

async incAllow(incAmount) {

  try {




  await this.state.traxainToken.methods.increaseAllowance('0x371900FACC3725F5Ca03d7220e2673a627a211D7' ,incAmount).send({from: this.state.account}).once('receipt',(receipt)=>{ 
  })
  await this.setState({loading: true})
  let allowed = await this.state.traxainToken.methods.allowance(this.state.account, '0x371900FACC3725F5Ca03d7220e2673a627a211D7').call()
  console.log(allowed)
      this.setState({allowed: allowed.toString()})
  
    this.setState({loading: false})
  
  } catch(err) {
    await this.setState({errorHappened:true})
    await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})
  
      console.log("estoy funcionando!!");
  }
  this.setState({loading:false})
      
  
}




async createTrip(stringRef,bufferDay,payDay,amount7,verifier) {

console.log(bufferDay)
try {

  await this.setState({loading: true})
  
  await this.state.traxainDapp.methods.createTrip(stringRef,bufferDay,payDay,amount7,verifier).send({from: this.state.account}).on('transactionHash',(hash) =>{
 })


let traxainTokenBalance2 = await this.state.traxainToken.methods.balanceOf(this.state.account).call()   
await this.setState({traxainTokenBalance: traxainTokenBalance2.toString()})  
let numberTrip = await this.state.traxainDapp.methods.mainID().call()   
await this.setState({numberTrip: numberTrip})  




this.setState({loading:false})
} catch(err) {
  await this.setState({errorHappened:true})
  await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})
  


}
    }

async addSub(provider, amount3) {
  
  try {



 console.log(this.state.thisTripID)
  console.log(provider)
  await this.setState({loading: true})
  let trip = parseInt(this.state.thisTripID , 10) +1;
  console.log(trip)
  await this.state.traxainDapp.methods.addSub(trip, provider, amount3).send({from: this.state.account}).once('receipt',(receipt)=>{ 
  })
  let numberTrip = await this.state.traxainDapp.methods.mainID().call()   
await this.setState({numberTrip: numberTrip}) 
 
    
  } catch(err) {
    await this.setState({errorHappened:true})
    await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

      console.log("estoy funcionando!!");
  }
  this.setState({loading:false})
    }




async confirmClient() {
  
  try {



  await this.setState({loading: true})
  let trip = parseInt(this.state.thisTripID , 10) +1;
  await this.state.traxainDapp.methods.confirmByClient(trip).send({from: this.state.account}).on('transactionHash',(hash) =>{ 
  })
  } catch(err) {
    await this.setState({errorHappened:true})
    await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

      console.log("estoy funcionando!!");
  }
  this.setState({loading:false})
    }


async confirmVer() {
  
  try {



  await this.setState({loading: true})
  let trip = parseInt(this.state.thisTripID , 10) +1;
  await this.state.traxainDapp.methods.confirmByVeryfier(trip).send({from: this.state.account}).once('receipt',(receipt)=>{ 
  })
  } catch(err) {
    await this.setState({errorHappened:true})
    await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

      console.log("estoy funcionando!!");
  }
  this.setState({loading:false})
    }

    


async complainCli() {
  
  try {



  await this.setState({loading: true})
  let trip = parseInt(this.state.thisTripID , 10) +1;
console.log(trip)
  await this.state.traxainDapp.methods.complaintByClient(trip).send({from: this.state.account}).once('receipt',(receipt)=>{ 
  })
  } catch(err) {
    await this.setState({errorHappened:true})
    await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

      console.log("estoy funcionando!!");
  }
  this.setState({loading:false})
    }


async errorStatus() {

  this.setState({loading: true})

  if(this.state.errorHappened === true){

  await this.setState({errorHappened:false})
  console.log("no hya error")
}

  else {
    await this.setState({errorHappened:true})
    console.log("hay error")
  }
    this.setState({loading:false})
    }
    





async complainSolve() {
  
  try {



  await this.setState({loading: true})
  let trip = parseInt(this.state.thisTripID , 10) +1;

  await this.state.traxainDapp.methods.solveComplaint(trip).send({from: this.state.account}).once('receipt',(receipt)=>{ 
  })
  } catch(err) {
    await this.setState({errorHappened:true})
    await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

      console.log("estoy funcionando!!");
  }
  this.setState({loading:false})
    }
    
 
    
async unlock() {
  
  try {



  await this.setState({loading: true})
  let trip = parseInt(this.state.thisTripID , 10) +1;
  console.log(trip)
  await this.state.traxainDapp.methods.unlockFunds(trip).send({from: this.state.account}).once('receipt',(receipt)=>{ 
  })
    
    } catch(err) {
    await this.setState({errorHappened:true})
    await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

      console.log("estoy funcionando!!");
  }
  this.setState({loading:false})
  }

send = () => {
  
  try {



  this.setState({loading: true})
  let trip = parseInt(this.state.thisTripID , 10) +1;
  console.log(trip)
  
  this.state.traxainDapp.methods.sendFunds(trip).send({from: this.state.account}).on('transactionHash', (hash)  => {
  })


} catch(err) {
   this.setState({errorHappened:true})
    this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

}
this.setState({loading:false})
    
    }
    
 

async mark(_idM) {
  
  try {



  await this.setState({loading: true})
  await this.state.traxainDapp.methods.markAsPaid(_idM).send({from: this.state.account}).once('receipt',(receipt)=>{ 
  })

  } catch(err) {
    await this.setState({errorHappened:true})
    await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

      console.log("estoy funcionando!!");
  }
  this.setState({loading:false})
        }
        
  

  async searchManual(subToSearch) {
    try {
    
    var noWallet = await this.state.noWallet
    var tripToSearch
    if(noWallet == true){
      
        var url = await this.state.endPoint+ 'get-trip-from-sub'+ '/' + subToSearch;
      await fetch(url).then((response) => response.json())
      .then(function(data) { 
        tripToSearch = data;
      })
    } else {
      tripToSearch = await this.state.traxainDapp.methods.getMainFromSub(subToSearch).call()

    }


      let tripMinus = parseInt(tripToSearch, 10);
      this.search(tripMinus);
    
 
      this.setState({loading:false})

    }
    catch(err) {
      await this.setState({errorHappened:true})
      await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})
  
    }
  
                }
        




async search(tripToSearch) {
  



  await this.setState({loading: true})

  tripToSearch =  await parseInt(tripToSearch , 10);
  
  let mainTripTosearch =  await  tripToSearch +1;

  var myTrip 
  //console.log(myTrip)
  var thisSub

  try {
  var noWallet = await this.state.noWallet
    var tripToSearch
    console.log(noWallet)
    if(noWallet == true){
      var url1 = await this.state.endPoint+ 'get-trip-by-ID'+'/'+ mainTripTosearch;
      await fetch(url1).then((response) => response.json())
      .then(function(data) { 
        myTrip = data;
        myTrip.creationDay = myTrip[0];
        myTrip.extRef = myTrip[1];
        myTrip.bufferDay = myTrip[2];
        myTrip.payDay = myTrip[3];
        myTrip.status = myTrip[4];
        myTrip.verifier = myTrip[5];
        myTrip.idSub = myTrip[5];
    })
      var url2 = await this.state.endPoint+ 'get-sub-by-ID'+'/'+ mainTripTosearch;
      await fetch(url2).then((response) => response.json())
      .then(function(data) { 
      thisSub = data;

      thisSub.idS = thisSub[0];
      thisSub.participant = thisSub[1];
      thisSub.price= thisSub[2];
      thisSub.mainTrip= thisSub[3];

    })
    }else{
      myTrip = await this.state.traxainDapp.methods.everyTrip(mainTripTosearch).call()
      thisSub = await this.state.traxainDapp.methods.Subs(mainTripTosearch).call()

    }
  }
  catch(err) {
    await this.setState({errorHappened:true})
    await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

      console.log("error al traer datos");
  }

    var thisSubPrice = await thisSub.price;

  if(noWallet == false){

    thisSubPrice = await window.web3.utils.fromWei(thisSubPrice, 'Ether')

  
} else {
  thisSubPrice = thisSubPrice/1000000000000000000	
}
  await this.setState({thisDeposited:thisSubPrice})

  

  try {

    var userRole
    if(noWallet=true){
    userRole = "Observer";
    }else{

    userRole = await this.getUserRole(mainTripTosearch);
    }
  
    this.setState({userRole:userRole})
    this.setState({myTrip:myTrip})
    console.log(userRole)
  

  if(this.state.backOfficeView === false){
    await this.setState({somethingSearched:2})
  } else {
    await this.setState({somethingSearched:0})
  }
  
  this.setState({idSubs:myTrip.idSub})
    this.setState({loading:false})
    this.setState({thisTripID: tripToSearch })
    

    let myStatus = await parseInt(this.state.myTrip.status, 10)
console.log(myStatus)

    switch(myStatus){
      case 1:
      this.setState({strStatus:"Not assigned"})
        break;
        case 2:
        this.setState({strStatus:"Pending service"})
        break;
        case 3:
        this.setState({strStatus:"Service executed"})
        break;
        case 4:
        this.setState({strStatus:"Pending complaint"})
        break;
        case 5:
        this.setState({strStatus:"Pending payment"})
        break;
        case 6:
        this.setState({strStatus:"Completed"})
        break;
        default:
        this.setState({strStatus:"Other"})
    }


}
catch(err) {
  await this.setState({errorHappened:true})
  await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

    console.log("error al operar los datos");
}
this.setState({loading:false})

        }


  async getUserRole(trip){

  try {

    await this.setState({loading: true})


    let myTrip = await this.state.traxainDapp.methods.everyTrip(trip).call()
    let verifierRole = await myTrip.verifier
        console.log(verifierRole)
    if (this.state.account === verifierRole){
      return "verifier"
    } else {
        let ownerSub = await this.state.traxainDapp.methods.getSubIds(trip,0).call()
        console.log(ownerSub)

        let ownerAddress =await this.state.traxainDapp.methods.getSubAddress(ownerSub).call()
        console.log(ownerAddress)

        if (this.state.account === ownerAddress){
          return "owner"
        } else {

          let numSubs =await this.state.traxainDapp.methods.getSubs(trip).call()
          numSubs = parseInt(numSubs,10)
          console.log(numSubs)
            let minusNumSubs = parseInt(numSubs , 10) -1;
            console.log(minusNumSubs)
          if(numSubs>1){

         
          for (var i =0; i < minusNumSubs; i++ ){
            console.log(i)
           let carrierSub =await this.state.traxainDapp.methods.getSubIds(trip,i).call()
           console.log(carrierSub)
           let carrierAddress = await this.state.traxainDapp.methods.getSubAddress(carrierSub).call()
           console.log(carrierAddress)
            if( carrierAddress === this.state.account){
              return "contractor"
            }
          }

          console.log("he salido del bucle")
          
          let effectiveCarrierSub = await this.state.traxainDapp.methods.getSubIds(trip,minusNumSubs).call()
          console.log(effectiveCarrierSub)

          let effectiveCarrierAddress = await this.state.traxainDapp.methods.getSubAddress(effectiveCarrierSub).call()


          console.log(effectiveCarrierAddress)
                if(effectiveCarrierAddress === this.state.account){
                  return "Effective Carrier"
                } else {
               return   "Other"
                }

        }else{
          return   "Other"
        }

      }
    }



      
  
  }
  catch(err) {
    await this.setState({errorHappened:true})
    await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

      console.log("estoy funcionando!!");
  }
  this.setState({loading:false})
}

  

  async viewBackOffice() {

  try {

    await this.setState({loading: true})
if(this.state.backOfficeView === false){
    this.setState({backOfficeView:true}) 
    await this.setState({loading:false})
  }
     else {
      this.setState({backOfficeView:false})
    }}
    catch(err) {
      await this.setState({errorHappened:true})
      await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

        console.log("estoy funcionando!!");
    }
    await this.setState({loading:false})

          }

  


  async showCreationFields() {


  try {

    await this.setState({loading: true})
    await this.setState({somethingSearched:0}) 

    if(this.state.wantToCreate === false){
        this.setState({wantToCreate:true})
        
        
    }else {
        this.setState({wantToCreate:false})
      }
     } catch(err) {
          await this.setState({errorHappened:true})
          await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

            console.log("estoy funcionando!!");
        }
        await this.setState({loading:false})

                      }


async defaultValues() {




    await this.setState({loading: true})
    await this.setState({somethingSearched:0}) 
    await this.setState({traxainToken: {}})
    await this.setState({traxainDapp: {}})
    await this.setState({allowed:0})
    await this.setState({myTrip:''})
    await this.setState({strStatus:''})
    await this.setState({errorHappened:true})
    await this.setState({time:0})
    await this.setState({noWallet:true})

    console.log("im working")
  
        
        
    }

  








async increaseCount() {


  try {

    await this.setState({loading: true})
   //let me = await this.state.traxainDapp.methods.getMsgSender().send({ from: this.state.account}).call()
   //console.log(me)

   //let depos = await this.state.traxainDapp.methods.getMsgSender().call()

   //console.log(depos)


   await this.state.traxainDapp.methods.setTime().send({ from: this.state.account})

   let time = await this.state.traxainDapp.methods.time().call()

   console.log(time)

   await this.setState({time: time}) 




    } catch(err) {
          await this.setState({errorHappened:true})
          await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

            console.log("estoy funcionando!!");
        }
        await this.setState({loading:false})

                      }












async usersTripCount() {


  try {

  this.setState({loading: true})
  await this.setState({wantToCreate:false})
  
  if(this.state.somethingSearched===0) {
  await  this.setState({somethingSearched:1})}else {
    await  this.setState({somethingSearched:0})
  }
  if(this.state.dontCall === false){

        
        let myUserArray = await this.state.traxainDapp.methods.getSubsArray(this.state.account).call()
        console.log(myUserArray)
        let myTripsCount = await myUserArray.length
        this.setState({myTripsCount:myTripsCount})
        var startbackwardCount = myTripsCount - 1;
       
            for (var i = startbackwardCount; i > -1; i--) {
              
              console.log("aqui estoy" + i)
              let subIndex = await myUserArray[i]
              const sub = await this.state.traxainDapp.methods.Subs(subIndex).call()
              
              this.setState({
                Subs: [...this.state.Subs, sub]
              })
              
            }
            await  this.setState({dontCall:true})
          }
            

       

       
      
      
    } catch(err) {
      await this.setState({errorHappened:true})
      await this.setState({errorMsg:'In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support'})

        console.log("estoy funcionando!!");
    }
    await this.setState({loading:false})

  }

  async refreshPage() {
    window.location.reload(false);
  }
    
    
    



      
  render() {
    let content




    if(this.state.loading) {
      content = <p id="loader" className="text-center" style={{fontSize:24,color:"#18a100"}}>Changes can take a few minutes to show, the network is processing the data...</p>
    } else {
      if(this.state.errorHappened === true ) {
        content = <ErrorHappened
        errorStatus={this.errorStatus}
        errorMsg={this.state.errorMsg}

        />
        console.log("estoy encontrando el error")

      } else {
      
     
      if(this.state.backOfficeView) {
        
        content = <div>
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
        <TripDetails
            myTrip = {this.state.myTrip}
            userRole = {this.state.userRole}
            strStatus = {this.state.strStatus}
      
      
      />
        </main>
        <BackOffice
            traxainTokenBalance = {this.state.traxainTokenBalance}
            allowed = {this.state.allowed}
            myTrip = {this.state.myTrip}
            incAllow={this.incAllow}
            createTrip={this.createTrip}
            addSub={this.addSub}
            numberTrip={this.state.numberTrip}
            confirmClient={this.confirmClient}
            confirmVer={this.confirmVer}
            complainCli={this.complainCli}
            complainSolve={this.complainSolve}
            unlock={this.unlock}
            send={this.send}
            mark={this.mark}
            search={this.search}
            usersTripCount={this.usersTripCount}
            viewBackOffice={this.viewBackOffice}
            increaseCount={this.increaseCount}
   
        
        />

        </div>


      }  }}

    let listContent
    
    if(this.state.wantToCreate===true) {

    

   

      listContent = <Creation
      myTrip = {this.state.myTrip}
      thisTripID = {this.state.thisTripID}
      createTrip={this.createTrip}
      somethingSearched = {this.state.somethingSearched}
      wantToCreate = {this.state.wantToCreate}
      numberTrip = {this.state.numberTrip}

      
      
      />

      
    } else {
      if(this.state.somethingSearched>=1) {
     
      listContent = <List
      myTrip = {this.state.myTrip}
      thisTripID = {this.state.thisTripID}
      somethingSearched = {this.state.somethingSearched}
      wantToCreate = {this.state.wantToCreate}

      Subs = {this.state.Subs}
      sub = {this.state.sub}
      search = {this.search}
      
      
      />
    } else {
      listContent = <p id="loader" className="text-center"></p>}
    }  
    
    let tripContent
    if(this.state.somethingSearched<2) {
      tripContent = <p id="loader" className="text-center"></p>
    } else {

     
      tripContent = <div>
      <TripDetails
      myTrip = {this.state.myTrip}
      userRole = {this.state.userRole}
      strStatus = {this.state.strStatus}
      thisDeposited = {this.state.thisDeposited}
      
      
      />
      
      <Main
      traxainTokenBalance = {this.state.traxainTokenBalance}
      allowed = {this.state.allowed}
      myTrip = {this.state.myTrip}
      incAllow={this.incAllow}
      createTrip={this.createTrip}
      addSub={this.addSub}
      numberTrip={this.state.numberTrip}
      confirmClient={this.confirmClient}
      confirmVer={this.confirmVer}
      complainCli={this.complainCli}
      complainSolve={this.complainSolve}
      unlock={this.unlock}
      send={this.send}
      mark={this.mark}
      search={this.search}
      usersTripCount={this.usersTripCount}
      viewBackOffice={this.viewBackOffice}
      
      />
      </div>
    } 


    let actions
   

      actions = <Actions
      usersTripCount={this.usersTripCount}
      showCreationFields={this.showCreationFields}
      traxainTokenBalance = {this.state.traxainTokenBalance}
      refreshPage={this.refreshPage}
      search={this.search}
      errorStatus={this.errorStatus}
      searchManual={this.searchManual}
      incAllow={this.incAllow}
      allowed = {this.state.allowed}

      
      />

      let table
      if(this.state.device==='desktop') {

        table = <table style={{width: "100%"}}>

        <thead style={{width: "100%"}}>
            <tr style={{width: "100%"}}>
              <th scope="col" className="text-center" style={{width: "33%",fontSize:30}}>Actions</th>
              <th scope="col" className="text-center" style={{width: "33%",fontSize:30}}>Services</th>
              <th scope="col" className="text-center" style={{width: "33%",fontSize:30}}>Details</th>
            </tr>
          </thead>
          <tbody>
        <tr>
        <td style={{verticalAlign: "top"}}>
              <div class="col" style={{align: "top"}}>
               
               
                {actions}

                

              </div>
              </td>
              <td style={{verticalAlign: "top"}}>
              <div class="col">
               
              {listContent}
                

              </div>
              </td>
              <td style={{verticalAlign: "top"}}>
              <div class="col">
               
              {tripContent}
                

              </div>
              </td>
     
          </tr>
          </tbody>
        </table>
      } else {
       
     table=<table style={{width: "100%"}}>
      <tbody>
     
         <tr style={{width: "100%"}}>
           <th scope="col" className="text-center" style={{width: "100%",height: "20"}}></th>
          </tr>
          <tr style={{width: "100%"}}>
          {actions}
          </tr>

          
          <tr style={{width: "100%"}}>
          {listContent}
          </tr>

         
          <tr style={{width: "100%"}}>
          {tripContent}
          </tr>
          
          
          </tbody>
        </table>
      }
      



    return (
      <div>
        <Navbar account={this.state.account} 
        device= {this.device}
        viewBackOffice={this.viewBackOffice}
        time={this.state.time}
        date={this.state.date}

        />
        <br></br><br></br><br></br><br></br>
        {content}
        {table}
        </div>

      
    );
  
  
  }
}
export default App;

