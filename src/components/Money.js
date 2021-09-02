import React, { Component } from 'react'


class Money extends Component {



  render() {
    return (

      <div>
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
              <button style={{ marginRight:"25px"}} onClick={(event) => {this.props.refreshPage()}}>Refresh</button>
              :null
                    }
              </td>
            
            </tr>


            
          </tbody>
        </table>




       

 
             <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let incAmount
                incAmount = this.incAmount.value.toString()
                incAmount = window.web3.utils.toWei(incAmount, 'Ether')
               
                this.props.incAllow(incAmount)
              }}>
              
              <table className="table table-borderless text-muted text-center">
                
                <tbody>
                  <tr>
                    <td> 
                
                <span className="float-center text-muted"
                style={{ marginLeft:"35px",width:"30px"}}>
                  Allowed: {this.props.allowed}
                </span>
              </td>
                    <td>
                    <span className="float-right input-group" style={{textAlign:"center"}}>
                <input
                  type="text"
                  style={{ marginLeft:"30px",width:"30px"}}
                  ref={(incAmount) =>  this.incAmount = incAmount }
                  className="form-control form-control-lg float-right"
                  placeholder="0"
                  required />
                
              </span>
                    </td>
                    <td>
                    <span className="float-center text-muted">
                    <button style={{ marginRight:"15px"}} type="submit" >Unlock</button>
                    </span>
                    </td>
                  </tr>
                </tbody>
                </table>
             
              
  
              </form>
              </div>
    )
  }
}

export default Money;