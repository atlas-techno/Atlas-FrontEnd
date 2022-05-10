   
import '../App.css';
import '../Assets/Css/Form.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import React, { useState , useEffect } from "react";

function FormsEc2() {

  const [ec2, setEc2] = useState({
    resource_name: '',
    ami: 'ami-04505e74c0741db8d',
    type: 't2.nano',
    count: 1,
    tag_name: '',
    delete_on_termination: false
  }
  );
  const [loading, setLoading] = useState(false)
  const [loadingD, setLoadingD] = useState(true)
  const [loadingDe, setLoadingDe] = useState(true)

  const [TandF, setTandF] = useState(false)

  function createEc2(event) {
    setLoading(true)
    event.preventDefault()

    ec2.delete_on_termination = TandF
    console.log(ec2)
    console.log(TandF)

    axios.post('http://54.196.86.248:8000/create-ec2', ec2,)
      .then((r) => {
        console.log(r)
        toast.success('Ec2 has been created with success!')
        setLoading(false)
        setLoadingDe(false)
      })
      .catch((erro) => {
        console.log(erro)
        toast.error('Error on Ec2 creation')
        setLoading(false)
      })

  }

  function deployEc2(event) {
    event.preventDefault()
    setLoadingDe(true)
    toast.info('Deploy has been iniated, this should take some seconds')

    axios('http://54.196.86.248:8000/deploy')
      .then((r) => {
        console.log(r)
        toast.success('Ec2 has been deployed with success!')
        setLoading(false)
        setLoadingD(false)
        setLoadingDe(true)

      })
      .catch((erro) => {
        console.log(erro)
        toast.error('Error on Ec2 deploy')
        setLoadingD(false)
      })

  }

  function destoryEC2(event) {
    event.preventDefault()
    setLoading(true)
    
    setLoadingD(true)
    toast.info('Destroy has been iniated, this should take some seconds')

    axios('http://54.196.86.248:8000/destroy')
      .then((r) => {
        console.log(r)
        toast.success('Ec2 has been destroyed with success!')
        setLoading(false)
        setLoadingDe(true)
      })
      .catch((erro) => {
        console.log(erro)
        toast.error('Error on Ec2 creation')
        setLoading(false)
      })
  }

useEffect(() => {
  console.log(ec2.delete_on_termination)
}, [ec2.delete_on_termination]) 
 

  return (
    <div>
      
      
        <form className="Forms_P" onSubmit={createEc2}>
          <div className='container_Form'>
            <h1 className="h1_ec2">Ec2</h1>
            <label htmlFor="ami_Sel" className='ami_Sel'>Resource Name</label>

            <input
              value={ec2.resource_name}
              onChange={e => setEc2(prevState => ({
                ...prevState,
                resource_name: e.target.value
              }))}
              type="text" className='input_Name' />


            <label htmlFor="ami_Sel" className='ami_Sel'>Name</label>

            <input
              value={ec2.tag_name}
              onChange={e => setEc2(prevState => ({
                ...prevState,
                tag_name: e.target.value
              }))}
              type="text" className='input_Name' />

            <label htmlFor="ami_Sel" className='ami_Sel'>Ami</label>

            <select value={ec2.ami} className='sel' name="Ami" id="ami_Sel"
              onChange={e => setEc2(prevState => ({
                ...prevState,
                ami: e.target.value
              }))}>

              <option className='opt' value="ami-04505e74c0741db8d">Ubuntu</option>
              <option className='opt' value="ami-07d02ee1eeb0c996c">Debian</option>
              <option className='opt' value="ami-0f9a92942448ac56f">Windows Server 2019</option>
              <option className='opt' value="ami-0745142a642f5af3a">Windows Server 2012</option>
            </select>


            <label htmlFor="ami_Sel" className='ami_Sel'>Type</label>
            <select value={ec2.type} className='sel' name="Ami" id="ami_Sel" onChange={e => setEc2(prevState => ({
              ...prevState,
              type: e.target.value

            }))}>
              <option className='opt' value="t2.nano">t2.Nano</option>
              <option className='opt' value="t2.micro">t2.Micro</option>
              <option className='opt' value="t2.small">t2.Small</option>
              <option className='opt' value="t2.medium">t2.Medium</option>
            </select>


            <label htmlFor="ami_Sel" className='ami_Sel'>Count</label>
            <select value={ec2.count} className='sel' name="Ami" id="ami_Sel" onChange={e => setEc2(prevState => ({
              ...prevState,
              count: e.target.value

            }))}>
              <option className='opt' value="1">1</option>
              <option className='opt' value="2">2</option>
              <option className='opt' value="3">3</option>
            </select>

            <label className="ami_Sel fontSize">Deletar Memoria apos a destruição?</label>
            <label className="switch">
              <input
                type="checkbox"

                value={TandF}

                onChange={e => setTandF(e.target.checked )}
                

              />
              <span className="slider round"></span>



            </label>



            {
              loading === true && <button type='submit' disabled className="btn_FormD disable" >Create</button>
            }

            {
              loading === false && <button type='submit' className="btn_Form " >Create</button>
            }

          </div>

        </form>

        
      
    </div>
  );
}


export default FormsEc2;
