import React from 'react';
import DEMO  from './../../../../../store/constant';
import Aux from "../../../../../hoc/_Aux";

const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        
        <Aux>
 <div className="navbar-brand " style={{marginLeft:10,marginTop:10}} >
                <a href={DEMO.BLANK_LINK} className="b-brand">
                    {
// localStorage.getItem("org_name").length > 17?
// (
//     <span className="b-title" style={{ fontSize: 17,color:'white' }}>Hi, {localStorage.getItem("org_name").substring(0,17).toUpperCase()} ...</span>

// ):
//     (
        // <span className="b-title" style={{ fontSize: 17,color:'white'}}>Hi, {localStorage.getItem("org_name").substring(0,17).toUpperCase()}</span>

    // )

                    }

                </a>
            </div>
                        <div className="navbar-brand header-logo" style={{marginRight:20}}>
                
                 <a href={DEMO.BLANK_LINK} className="b-brand">                 
                    <span className="b-title" style={{fontSize:15,fontWeight:'bold',paddingRight:10}}>Trang quản lý</span>
                 </a>
                <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
            </div>
        </Aux>
    );
};

export default navLogo;
