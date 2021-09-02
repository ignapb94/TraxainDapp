import React, { Component } from 'react'






class Main extends Component {

render() {
  return (
    
    <div id= "content" className="lg-4">
     

        
   
 
                
                
<div className="card mb-4" >

<div className="card-body">
<form className="mb-3" onSubmit={(event) => {
  event.preventDefault()
  let provider =this.provider.value
  let subPrice = this.subPrice.value.toString()
  subPrice = window.web3.utils.toWei(subPrice, 'Ether')
  

  this.props.addSub(provider,subPrice)
}}>





<table style={{width: "100%"}}>

        
          <tbody>
        <tr>
          <td style={{verticalAlign: "top"}}>
              <div class="col" >
               
               
              <input
    
                  ref={(subPrice) => { this.subPrice = subPrice }}
                  className="form-control form-control-lg"
                  placeholder="Precio"
                  required />   

                

              </div>
          </td>
          <td style={{verticalAlign: "top"}}>
              <div class="col" >
               
               
              <input
    
                  ref={(provider) => { this.provider = provider }}
                  className="form-control form-control-lg"
                  placeholder="Transportista"
                  required />

                

              </div>
          </td>
        </tr>
        </tbody>
        </table>





<button type="submit" className="btn btn-primary btn-block btn-lg" style={{marginTop:"20px"}}>Contract out</button>
</form>
</div>
</div>

<div className="card mb-4" >

<div className="card-body">
<form className="mb-3" onSubmit={(event) => {
  event.preventDefault()
  
  
  this.props.confirmClient()
}}>


<button type="submit" className="btn btn-primary btn-block btn-lg">Confirm Service execution</button>
</form>
</div>
</div>







<div className="card mb-4" >

<div className="card-body">
<form className="mb-3" onSubmit={(event) => {
  event.preventDefault()
 
  this.props.complainCli()
}}>





<button type="submit" className="btn btn-primary btn-block btn-lg">Complain</button>
</form>
</div>
</div>






















          
          
    </div>
  );
}

}
export default Main;
