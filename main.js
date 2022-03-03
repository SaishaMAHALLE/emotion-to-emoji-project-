Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");


function take_snapshot(){

    Webcam.snap(function(data_uri){

        document.getElementById("captured_img").innerHTML='<img id="result" src="'+data_uri+'"/>';
    });
}

console.log("the version is : ", ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KlQNG2yc9/model.json', modelloaded);

function modelloaded() {
    console.log("model is loaded");
}

prediction = "";


function speak() {
    var synth=window.speechSynthesis;
    speak_data = "The prediction is "+prediction;
    var UtterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(UtterThis);
    
}

function Captured_picture() {
    img = document.getElementById("result");
    classifier.classify(img, gotResult);

}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion1").innerHTML=results[0].label;
        prediction_1=results[0].label;
        speak();

        if(results[0].label == "Great"){
            document.getElementById("emoji1").innerHTML="&#128077;";
        }
        if(results[0].label == "Amazing"){
            document.getElementById("emoji1").innerHTML="&#128076";
        }
        if(results[0].label == "Victory"){
            document.getElementById("emoji1").innerHTML="&#9996";
        }
    }
}