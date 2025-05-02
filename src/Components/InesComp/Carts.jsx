import React from 'react'
import mercedes from '../../assets/simple-icons_mercedes.svg'


export default function Carts() {
  return (
    <div className='relative' style={{marginTop:'5rem', width:'5rem',height:'375px',}}>
        <div className="first" style={{position:'absolute',width:'346px' ,backgroundColor:'#023E8A', height:'375px',borderRadius:'2rem',border:'1px solid  rgb(0, 0, 0)', boxShadow:'0 4px 6px rgba(0, 0, 0, 0.39)',right:'6rem'}}></div>
        <div className="second" style={{position:'absolute',width:'346px',background:'#023E8A' , height:'375px',borderRadius:'2rem',border:'1px solid  rgb(0, 0, 0)',boxShadow:'0 4px 6px rgba(0, 0, 0, 0.39)',right:'4rem',top:'8rem'}}></div>
        <div className="third"  style={{position:'absolute',width:'346px' ,background:'#023E8A', height:'375px',borderRadius:'2rem',border:'1px solid  rgb(0, 0, 0)',boxShadow:'0 4px 6px rgba(0, 0, 0, 0.39),',right:'2rem',top:'5rem',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <img src={mercedes} alt="" srcset="" />
         <h1 style={{color:'white'}}>Mercedes - Benz</h1>
        </div>
    </div>
  )
}
