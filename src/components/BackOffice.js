import React, { Component } from 'react'


class BackOffice extends Component {



  render() {
    return (
<div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
 <div id= "content" className="mt-3">


<div className="card mb-4" >

<div className="card-body">
<form className="mb-3" onSubmit={(event) => {
  event.preventDefault()
  
  let _tripSelect = this._tripSelect.value
  
  _tripSelect = parseInt(_tripSelect, 10) - 1
 
  this.props.search(_tripSelect)
}}>
<div>
  <label className="float-left"><b>SelectTrip</b></label>
 
</div>



<div className="input-group mb-4">
  <input
    
    ref={(_tripSelect) => { this._tripSelect = _tripSelect }}
    className="form-control form-control-lg"
    placeholder="0"
    required />
  <div className="input-group-append">
    <div className="input-group-text">
    Select Trip
    </div>
  </div>
</div>

<button type="submit" className="btn btn-primary btn-block btn-lg">Select Trip</button>
</form>
</div>
</div>




  <div className="card mb-4" >

<div className="card-body">
<form className="mb-3" onSubmit={(event) => {
  event.preventDefault()
  
 
  this.props.confirmVer()
}}>
<div>
  <label className="float-left"><b>Confirmar by verifer</b></label>
 
</div>



<button type="submit" className="btn btn-primary btn-block btn-lg">Confirm Verifier</button>
</form>
</div>
</div>


<div className="card mb-4" >

<div className="card-body">
<form className="mb-3" onSubmit={(event) => {
  event.preventDefault()
 
  this.props.complainSolve()
}}>
<div>
  <label className="float-left"><b>Solve Complaint</b></label>
 
</div>







<button type="submit" className="btn btn-primary btn-block btn-lg">Solve Complaint</button>
</form>
</div>
</div>


<div className="card mb-4" >

<div className="card-body">
<form className="mb-3" onSubmit={(event) => {
  event.preventDefault()
  
 
  this.props.increaseCount()
}}>
<div>
  <label className="float-left"><b>Update date</b></label>
 
</div>



<button type="submit" className="btn btn-primary btn-block btn-lg">Update date</button>
</form>
</div>
</div>





<div className="card mb-4" >

<div className="card-body">
<form className="mb-3" onSubmit={(event) => {
  event.preventDefault()
  

 
  this.props.unlock()
}}>
<div>
  <label className="float-left"><b>Unlock</b></label>
 
</div>





<button type="submit" className="btn btn-primary btn-block btn-lg">Unlock</button>
</form>
</div>
</div>









<div className="card mb-4" >

<div className="card-body">
<form className="mb-3" onSubmit={(event) => {
  event.preventDefault()

  
  this.props.send()
}}>
<div>
  <label className="float-left"><b>Send</b></label>
 
</div>





<button type="submit" className="btn btn-primary btn-block btn-lg">Send</button>
</form>
</div>
</div>






<div className="card mb-4" >

<div className="card-body">
<form className="mb-3" onSubmit={(event) => {
  event.preventDefault()
  let _idM = this._idM.value
 
 
  this.props.mark(_idM)
}}>
<div>
  <label className="float-left"><b>Mark as Paid</b></label>
 
</div>

<div className="input-group mb-4">
  <input
    
    ref={(_idM) => { this._idM = _idM }}
    className="form-control form-control-lg"
    placeholder="0"
    required />
  <div className="input-group-append">
    <div className="input-group-text">
      
    </div>
  </div>
</div>


<button type="submit" className="btn btn-primary btn-block btn-lg">Mark As Paid</button>
</form>
</div>
{/*


<div className="card-body">
             <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let incAmount
                incAmount = this.incAmount.value.toString()
                incAmount = window.web3.utils.toWei(incAmount, 'Ether')
               
                this.props.incAllow(incAmount)
              }}>
              <div>
                <label className="float-left"><b>Unlock</b></label>
                <span className="float-right text-muted">
                  Unlocked by you: {window.web3.utils.fromWei(this.props.allowed, 'Ether')}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(incAmount) =>  this.incAmount = incAmount }
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    
                    &nbsp;&nbsp;&nbsp; TXN
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">Unlock funds</button>
  
              </form>
              </div>
            */}

</div>






</div>
</div>
</main>
</div></div>

    )
  }
}

export default BackOffice
;


