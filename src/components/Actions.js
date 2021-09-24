import React, { Component } from 'react'






class Actions extends Component {




    render() {
        return (

  <div id= "content" className="mt-3">




<div className="card mb-4" >

<div className="card-body">
<form className="mb-3" onSubmit={(event) => {
  event.preventDefault()
  let _tripSearched = this._tripSearched.value 
 



    this.props.searchManual(_tripSearched);
 


}}>



<div className="input-group mb-4">
  <input
    
    ref={(_tripSearched) => { this._tripSearched = _tripSearched }}
    className="form-control form-control-lg"
    placeholder="Service Number"
    required />
 
</div>

<button type="submit" className="btn btn-primary btn-block btn-lg">Search Trip</button>
</form>
</div>
</div>





  <div className="card mb-4" >
  
  <div className="card-body">
 <form className="mb-3" onSubmit={(event) => {
   event.preventDefault()
  
   this.props.usersTripCount()

 }}>
 

   
 
 <button type="submit" className="btn btn-primary btn-block btn-lg">My Trips</button>

 </form>
 </div>

 </div>
 



<div className="card mb-4" >             
<div id= "content" className="mt-4">
<div className="card-body">
 <form className="mb-3" onSubmit={(event) => {
   event.preventDefault()
  
   this.props.showCreationFields()

 }}>
 <div>
   
  
 </div>

   
 
 <button type="submit" className="btn btn-primary btn-block btn-lg">Create Trip</button>

 </form>
 </div>

 </div>

 

 <table className="table table-borderless text-muted text-center">
          
          <tbody>
            
            <tr>
            <td>
            Your Traxain Token balance
              </td>
            <td>{this.props.traxainTokenBalance} TXN </td>
            
            <td>
            { {/*!product.purchased*/}
                       ?
              <button style={{ marginRight:"0px"}} onClick={(event) => {this.props.refreshPage()}}>Refresh</button>
              :null
                    }
              </td>
            
            </tr>


            




       

 
             
              
              
                
                  <tr>
                    <td> 
                <div>
                <span className="float-center text-muted"
                style={{width:"30px"}}>
                  Allowed: {this.props.allowed}
                </span>
                </div>
              </td>
                    <td>
                    <span className="float-right input-group" style={{textAlign:"center"}}>
                <input
                  type="text"
                  style={{width:"30px"}}
                  ref={(incAmount) =>  this.incAmount = incAmount }
                  className="form-control form-control-lg float-right"
                  placeholder="0"
                  required />
                
              </span>
                    </td>
                    <td>
                    <span className="float-center text-muted">
                    <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let incAmount
                incAmount = this.incAmount.value.toString()
                incAmount = window.web3.utils.toWei(incAmount, 'Ether')
               
                this.props.incAllow(incAmount)
              }}>
                    <button  type="submit" >Unlock</button>
                    </form>
                    </span>
                    </td>
                  </tr>
                
             
              
  
             
              </tbody>
                </table>
              </div>
 </div>
        )
      }
 }

 export default Actions;