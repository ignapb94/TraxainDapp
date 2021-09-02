import React, { Component } from 'react'
import logo from '../logo.png'
import moment from 'moment';

class Navbar extends Component {



  async componentWillMount() {
    let deviceType = await this.getDeviceType()
  await this.setState({device:deviceType})
  }

  async getDeviceType() {
    let ua = await navigator.userAgent;
   if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
     return "tablet";
   }
   if (
     /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
       ua
     )
   ) {
     return "mobile";
   }
   return "desktop";
 };

  constructor(props) {
    super(props)
    this.state = {
      device:'',
    }
  }

  render() {

    

    
    let navigator 
    if(this.state.device === 'desktop') {navigator = <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-1 shadow">
    <a
      className="navbar-brand col-sm-3 col-md-2 mr-0"
      href="http://www.traxain.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={logo} width="80" height="30" className="d-inline-block align-top" alt="" />
      &nbsp; Traxain Dapp
    </a>
    <div>

<ul className="navbar-nav px-3">
<li  style={{textAlign:"right"}} class="text-center">
<small style={{textAlign:"right",fontSize:28,color:"FFFAFA",fontWeight:"bold"}} className="text-secondary">
{moment(this.props.date).format(" MMMM Do YYYY")}
  </small>
</li>
</ul>
</div>

    
<div>

    <ul className="navbar-nav px-3">
      <li class="text-center">
        <small className="text-secondary">
          <small id="account">{this.props.account}</small>
        </small>
      </li>
      <li class="text-center">
        <form className="d-inline-block"  onSubmit={(event) => {
                event.preventDefault()
                
              
                this.props.viewBackOffice()
              }}>
              <div>
              
              
              </div>
              <div class="text-center">
                

              <button type="submit" className="btn btn-primary btn-block align-center text-center" >Verifier area</button>
              </div>
        </form>
        </li>
        
    </ul>
    </div>
    </nav>

  console.log("esotu en en desktop")
  } else {navigator = <table style={{width: "100%"}}>
  {/* <tr style={{width: "100%"}}>
    
    <small id="account">{this.props.account}</small>
    </tr>*/}<tr style={{width: "100%"}}>
    <td>
    <a
      className="navbar-brand col-sm-3 col-md-2 mr-0"
      href="http://www.traxain.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={logo} width="80" height="30" className="d-inline-block align-top" alt="" />
      &nbsp; Traxain Dapp
    </a>
    </td>
    <td>
      <small style={{textAlign:"left",fontSize:18,color:"FFFAFA",fontWeight:"bold"}} className="text-secondary">
      {moment(this.props.date).format(" MMMM Do YYYY")}
  </small>
        </td>

    </tr><tr style={{width: "100%"}}>
      
      
    <li class="text-center">
        <form className="d-inline-block"  onSubmit={(event) => {
                event.preventDefault()
                
              
                this.props.viewBackOffice()
              }}>
              <div>
              
              
              </div>
              <div class="text-center">
                

              <button type="submit" className="btn btn-primary btn-block align-center text-center" >Verifier area</button>
              </div>
        </form>
        </li>
      
      </tr>

  </table>





  }
    


    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-1 shadow">
      {navigator}
      </nav>
    );
  }
}

export default Navbar;
