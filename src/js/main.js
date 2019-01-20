//start up server http-server C:\Projects\chooseyourown\src
import data from './data.js';
const imgpath = '../img';

//grab the main game container
var game = document.getElementById('game');

drawScene(getScenesFromData(),"001");

function drawScene(scenes, sceneId){
   game.innerHTML = '';
   var scene = scenes.filter(x=> x.id == sceneId)[0];
   
   //set background
   //game.style.backgroundImage = `url(${imgpath}/${scene.background})`;

   //set back image
   const back_image = document.createElement('img');
   back_image.classList.add('back-image');
   console.log(scene.backimage);
   back_image.src = `${imgpath}/${scene.backimage}`;
   game.appendChild(back_image);


   //set up the dialog box
   const dialog_box = document.createElement('div');
   dialog_box.classList.add('dialog-box');

   //inner dialog box
   const inner_dialog_box = document.createElement('div');
   inner_dialog_box.classList.add('inner-dialog-box');
   
   //dialog box options
   const action_options_dialog_box = document.createElement('div');
   action_options_dialog_box.classList.add('action-options-dialog-box');

   //dialog box text container
   const dialog_text = document.createElement('div');
   //Animate the text as it appears on the screen
   typerwriterAnim(dialog_text, scene.dialog[0]);
   inner_dialog_box.appendChild(dialog_text);
   
   //if there is more than one line of dialog
   //add a dialog advance button else show button options 
   if(scene.dialog.length > 1){
      const advance_text = document.createElement('div');
      advance_text.classList.add('advance-text');
      advance_text.innerHTML = ">";
      advance_text.dataset.dialogid = 1;
      inner_dialog_box.appendChild(advance_text);
      
      //advance text button click functionality 
      advance_text.addEventListener('click', (e) => {
         var dialogId = advance_text.dataset.dialogid++;
         typerwriterAnim(dialog_text, scene.dialog[dialogId]);
         if(scene.dialog.length == (dialogId + 1)){
            inner_dialog_box.removeChild(advance_text)
            addOptions(scene, action_options_dialog_box);
         }
      })
      
   }else{
      addOptions(scene, action_options_dialog_box);
   }

   dialog_box.appendChild(inner_dialog_box);
   dialog_box.appendChild(action_options_dialog_box);

   game.appendChild(dialog_box);

}
function addOptions(scene, actionOptionBox){
   //add option buttons based on paths
   scene.paths.forEach((path) => {
         const pathButton = document.createElement('div');
         pathButton.classList.add('button')
         pathButton.dataset.sceneid = path;
         pathButton.innerHTML = data.scenes.filter(x => x.id == path)[0].name;
         pathButton.addEventListener('click', (e) => {
            console.log(path);
            drawScene(getScenesFromData(), path);
         })
         actionOptionBox.appendChild(pathButton);
      })
}
function getScenesFromData(){
   return data.scenes;
}
function typerwriterAnim(copy, copystring)
{
    copy.innerHTML = '';
    for (var i = 0; i < copystring.length; i++) {
        addChar(copystring.charAt(i), (i + 1) * 100, copy)
      }
}
function addChar(char, timeout, copy){
    //interpret # as a command to insert <br> tag
    if(char === "#"){
        char = '<br>'
    }
    setTimeout(() => {
        copy.innerHTML += char
    }, timeout); 
}


