import { useEffect, useState } from 'react'
import './App.css'
import './services/video'
import * as faceapi from "face-api.js";
import { getFace } from './services/video';
import { api, faces, objs, save } from './services/fake';


function App() {
  const [cpf, setCpf] = useState('');

  const submitFaceDetection = (cpf: string) => {
    return  async(face: faceapi.WithFaceDescriptor<any>) => {
      // console.log({cpf, face});
      // console.log(new Float32Array(face.descriptor))
      // save(face)
      const res = await api.get('/faces')
      console.log(res.data.map(d => new Float32Array(Object.values(d))))
      // console.log(res.data.map(d => new Float32Array(d.descriptor)))
      
      if(res.data.length > 0) {
        const faceMatcher = new faceapi.FaceMatcher(res.data.map(d => new Float32Array(Object.values(d))))
        const bestMatch = faceMatcher.findBestMatch(face.descriptor)
        console.log(bestMatch.toString())
      }

      
      // await api.post('/save-face', {face: new Float32Array(face.descriptor)})
      // faces.push(face)
      // console.log(faces)
      // console.log(bestMatch.toString())
    }
  }
  
  // useEffect(() => getFace(() => {}), [])
  const submitCpf = () => {
    getFace(submitFaceDetection(cpf))
  }
  
  return (

    <>
      Olá mundo!
      <div >
        <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} ></input>
        <button onClick={submitCpf}>Setar Cpf</button>
      </div>
      {/* <img id="myImg" src="images/example.png" /> */}
      <video id="video" autoPlay muted />
      <canvas id="myCanvas" />
    </>
  )
}

export default App
