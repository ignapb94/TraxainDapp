import React, { Component } from 'react'




class ErrorHappened extends Component {




    render() {
        return (


<div className="card mb-4" >

<div className="card-body">


 <table className="table table-borderless text-muted text-center">
          <thead>
            
          </thead>
          <tbody>
            <tr>
            <td>In order to access all features, you need to get Metamask and some Traxain Tokens. Contact us at Traxain.com to get support</td>
            
            <td>
            { {/*!product.purchased*/}
                       ?
              <button onClick={(event) => {this.props.errorStatus()}}>Got it</button>
              :null
                    }
              </td>
            
            </tr>
          </tbody>
        </table>






 </div>
 </div>
        )
      }
 }

 export default ErrorHappened;