import React, { Component } from 'react';
import moment from 'moment';



class TripDetails extends Component {



  render() {
    return (

      
      <div id= "content" className="mt-3">
      <div className="card mb-4" >
  
      <div className="card-body">


<table className="table">
          <thead>
            <tr>
            <th scope="col">Max guarantee</th>
              <th scope="col">Reference</th>
              <th scope="col">Complain period</th>
             
              
            </tr>

            </thead>
            <tbody id="productList">
            <tr>

                  <td>{this.props.thisDeposited}</td>
                  <td>{this.props.myTrip.extRef}</td>
                  <td>{moment(1629969143000+parseInt(this.props.myTrip.bufferDay, 10)*3600000*24).format(" MMMM Do YYYY")}</td>
            
              
            </tr>
            </tbody>

            <thead>
           
                <tr>
                 
                  <th scope="col">Payday</th>
                  <th scope="col">Status</th>
                  <th scope="col">My Role</th>
  
                </tr>
            </thead>
            <tbody id="productList">
                <tr>
                
                <td>{moment(1629969143000+parseInt(this.props.myTrip.payDay, 10)*3600000*24).format(" MMMM Do YYYY")}</td>
                <td>{this.props.strStatus}</td>
                <td>{this.props.userRole}</td>


              </tr>



          </tbody>
 </table>

  </div>
  </div>
  </div>
    )
  }
}

export default TripDetails;