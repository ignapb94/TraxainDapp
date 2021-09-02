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
            <td>Something's wrong, please check you are connected to Metamask and that imputs are correct </td>
            
            <td>
            { {/*!product.purchased*/}
                       ?
              <button onClick={(event) => {this.props.errorStatus()}}>Refresh</button>
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