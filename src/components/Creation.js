import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';









class Creation extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: new Date(),
      
      endDate:new Date(),

      bufferday:'',
      payday:''
    };
    this.handleChangeBuff = this.handleChangeBuff.bind(this);
    this.handleChangePay = this.handleChangePay.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async handleChangeBuff(dateBuff) {
    this.setState({
      startDate: dateBuff

    })
    let rowCurrentDate =await  new Date()
    let currentDate =await  Date.parse(rowCurrentDate)
    let formattedDate =await  Date.parse(dateBuff)
    let buffer =await  Math.round((formattedDate - currentDate)/(3600000*24))
    await this.setState({
      bufferday: buffer

    })
  }


  async handleChangePay(datePay) {
    this.setState({
      
      endDate: datePay

    })
    let rowCurrentDate =await  new Date()
    let currentDate =await  Date.parse(rowCurrentDate)
    let formattedPayDate =await  Date.parse(datePay)
    let pay =await  Math.round((formattedPayDate - currentDate)/(3600000*24))
    await this.setState({
      payday: pay

    })
  }

  onFormSubmit(e) {
    e.preventDefault();
    
  }

    render() {

      
     
        return (
          <div>
           
  
          <div id= "content" className="mt-3">
            <div className="card mb-4" >

            <div className="card-body">
            <form className="mb-3" onSubmit={(event) => {
              event.preventDefault()
              let stringRef = this.stringRef.value
              let bufferDay =this.state.bufferday
              console.log(bufferDay)
              let payDay =this.state.payday
              console.log(payDay)
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
            <div className="input-group mb-4" >
            <table className=" table-borderless text-muted text-center">
              <tbody>
              <tr>
                <td>
             
                  Complaining period
                
                </td>
                <td style={{width:"50px"}}>
                      
                </td>
                <td>
                
                  Paying period
              
                </td>
                </tr>
                <tr> <td><DatePicker
            className="form-control form-control-lg"
                selected={ this.state.startDate }
                onChange={ this.handleChangeBuff }
                placeholder="0"
                required 
                />
                </td>
                <td style={{width:"50px"}}>
                      
                </td>
                <td><DatePicker
                selected={ this.state.endDate }
                onChange={ this.handleChangePay }
                
                className="form-control form-control-lg"
                placeholder="0"
                required />
                </td>
                </tr>
              
          
             
              </tbody>
              </table>
            </div>
            
            <button type="submit" className="btn btn-primary btn-block btn-lg">Crear</button>
            </form>
            </div>
            </div>
            </div>
            </div>
        )
      }
 }

 export default Creation;