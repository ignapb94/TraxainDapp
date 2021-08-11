import React, { Component } from 'react'
import Web3 from 'web3'

//import App from './App'
import dai from '../dai.png'





class Creation extends Component {

    render() {
        return (

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
       
              {this.props.createTrip(stringRef,bufferDay,payDay,amount7,verifier)}
            }}>
            <div>
              <label className="float-left"><b>Crear viaje</b></label>
              <span className="float-right text-muted">
                Viaje nº: {this.props.numberTrip}
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
                  REFERENCIA
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
                  DÍAS HASTA DESBLOQUEO
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
                  DÍAS HASTA PAGO
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
                  DEPÓSITO
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
                  VERIFICADOR
                </div>
              </div>
            </div>
            
            
            <button type="submit" className="btn btn-primary btn-block btn-lg">Crear</button>
            </form>
            </div>
            </div>
        )
      }
 }

 export default Creation;