import React, { Component } from 'react'





class Creation extends Component {

    render() {
        return (
          <div id= "content" className="mt-3">
            <div className="card mb-4" >

            <div className="card-body">
            <form className="mb-3" onSubmit={(event) => {
              event.preventDefault()
              let stringRef = this.stringRef.value
              let bufferDay =this.bufferDay.value
              let payDay =this.payDay.value
              let amount7
              amount7 = this.amount7.value.toString()
              amount7 = window.web3.utils.toWei(amount7, 'Ether')
              let verifier =this.verifier.value
       
              this.props.createTrip(stringRef,bufferDay,payDay,amount7,verifier)
            }}>
            <div>
              <label className="float-left"><b>Crear viaje</b></label>
              <span className="float-right text-muted">
                Service nº: {this.props.numberTrip}
              </span>
            </div>

            <div className="input-group mb-4">
              <input
                
                ref={(stringRef) => { this.stringRef = stringRef }}
                className="form-control form-control-lg"
                placeholder="0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                  REFERENCE
                </div>
              </div>
            </div>

            <div className="input-group mb-4">
              <input
                
                ref={(bufferDay) => { this.bufferDay = bufferDay }}
                className="form-control form-control-lg"
                placeholder="0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                  COMPLAINING PERIOD (DAYS)
                </div>
              </div>
            </div>

            <div className="input-group mb-4">
              <input
                
                ref={(payDay) => { this.payDay = payDay }}
                className="form-control form-control-lg"
                placeholder="0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                  PAYING PERIOD (DAYS)
                </div>
              </div>
            </div>

            <div className="input-group mb-4">
              <input
                
                ref={(amount7) => { this.amount7 = amount7 }}
                className="form-control form-control-lg"
                placeholder="0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                  DEPOSIT
                </div>
              </div>
            </div>
            

            <div className="input-group mb-4">
              <input
                
                ref={(verifier) => { this.verifier = verifier }}
                className="form-control form-control-lg"
                placeholder="0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                  VERIFIER
                </div>
              </div>
            </div>
            
            
            <button type="submit" className="btn btn-primary btn-block btn-lg">Crear</button>
            </form>
            </div>
            </div>
            </div>
        )
      }
 }

 export default Creation;