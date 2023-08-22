import * as faceapi from "face-api.js";

export const getFace = (callBack: Function) => {
    var notSended = true
    setTimeout(async () =>{
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ])
        const video = document.getElementById('video');
        if(!video) return;
        console.log(video);
        (navigator as any).getUserMedia(
            {video: {}},
            stream => (video as HTMLVideoElement).srcObject = stream,
            err => console.log(err)
        )
    
        video.addEventListener('play', () => {
            const interval = setInterval(async () => {
                const detections = await faceapi.detectSingleFace(
                    (video as any),
                    new faceapi.TinyFaceDetectorOptions()
                    )
                    .withFaceLandmarks()
                    .withFaceExpressions()
                    .withFaceDescriptor()
                if(detections && notSended){
                    notSended = false
                    console.log(detections)
                    clearInterval(interval)
                    callBack(detections)
                }
            }, 100)
        })
      }, 100)
}