prediciton_1="";
prediciton_2="";
Webcam.set({
width: 350,
height: 300,
image_format:'png',
png_quality: 90
});

camera= document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version',ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);

function modelLoaded()
{
    console.log('modelLoaded');

}


function check()
{
    img= document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results)
{
    if (error)
    {console.error(error);}
    else
    {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML= results[0].label;
        document.getElementById("result_gesture_name2").innerHTML= results[1].label;
        prediciton_1= results[0].label;
        prediciton_2= results[1].label;
        speak();
        if (results[0].label=="Ok")
        {
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if (results[0].label=="Good Job")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if (results[0].label=="Congratulations")
        {
            document.getElementById("update_emoji").innerHTML="&#128079;";
        }
        if (results[1].label=="Ok")
        {
            document.getElementById("update_emoji2").innerHTML="&#128076;";
        }
        if (results[1].label=="Good Job")
        {
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
        if (results[1].label=="Congratulations")
        {
            document.getElementById("update_emoji2").innerHTML="&#128079;";
        }
    }
}
function speak()
{
    var synth= window.speachSynthesis;
    speak_data_1="The first prediction is"+prediciton_1;
    speak_data_2="The second prediction is"+prediciton_2;
    var utterThis= new speachSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

