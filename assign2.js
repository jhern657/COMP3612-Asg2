
/*
 To get a specific play, add play's id property (in plays.json) via query string,
   e.g., url = url + '?name=hamlet';

 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=macbeth

 NOTE: Only a few plays have text available. If the filename property of the play is empty,
 then there is no play text available.
*/


/* note: you may get a CORS error if you test this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/


// var api = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';

const plays = JSON.parse(content);

document.addEventListener("DOMContentLoaded", function () {

  header();

  sortOptions(plays);

  // creates the available plays section 
  playListTitle(); // creates h3 and ul
  plays.forEach(playListSection);

  // displays play details when clicked
  playDetails(plays);

})

/* ------------      creates icon and block detail popup for header       ------------- */
function header() {

  var header = document.querySelector('header');

  var h1 = document.createElement('h1');
  h1.textContent = "Assign 2 - Shakespeare Play Viewer";
  h1.style.display = 'inline-block';
  h1.style.position = 'absolute';
  h1.style.paddingLeft = '15px';
  h1.style.paddingTop = '5px';

  var image = document.createElement('img');
  image.setAttribute('src', 'images/script.png');
  image.style.height = '60px';
  image.style.display = 'inline-block';


  var button = document.createElement('button');
  button.setAttribute('id', 'Credits');
  var label = document.createElement('label');
  label.setAttribute("id", "Credits");
  label.style.backgroundColor = 'white';
  label.style.width = '140px';
  label.style.height = '50px';

  image.appendChild(button);

  header.appendChild(image);
  header.appendChild(label);
  header.appendChild(h1);

  image.addEventListener('mouseover', () => {

    label.style.display = 'inline-block';
    label.innerHTML = `Janel Hernandez COMP 3612-001`;

  })

  image.addEventListener('mouseout', () => {
    setTimeout(() => {
      label.style.display = 'none';
    }, 5000);
  })

}

/* --------------    create unordered list for available plays     ------------- */
function playListTitle() {
  const playList = document.querySelector("#playList");

  var h3 = document.createElement('h3');
  h3.textContent = "Available Plays";

  var ul = document.createElement('ul');
  ul.setAttribute('id', "list");

  playList.appendChild(h3);
  playList.appendChild(ul);

  var ul = document.querySelector('ul');
  ul.style.scroll = "overflow-y";

}

/* -------------- populate available plays, add icon if script available  ------------ */
function playListSection(plays) {
  // list all plays available
  var ul = document.querySelector('ul');
  ul.style.scroll = "overflow-y";

  // set data-id and play title.
  var li = document.createElement('li');
  li.setAttribute('data-id', plays.id);
  li.style.color = 'black';
  li.innerHTML = plays.title;

  var item = document.querySelectorAll('ul li');
  for (let i of item) {
    i.addEventListener('click', toggleColor);
  }

  if (plays.filename != "") {
    var img = document.createElement('img');
    img.setAttribute("src", 'images/icon.jpg');
    li.appendChild(img);
    ul.appendChild(li);
  }
  else {
    ul.appendChild(li);
  }


}

function toggleColor(e) {
  e.target.classList.toggle('selected');
}

//create radio input option for Name, Date - sort by chosen radio input
function sortOptions(plays) {

  var playList = document.querySelector('#playList');

  var p = document.createElement('p');
  var label = document.createElement('label');
  label.textContent = "Sort By: ";

  // creates the name radio input
  var nameInput = document.createElement('input');
  nameInput.setAttribute('type', "radio");
  nameInput.setAttribute('name', "sort");
  var nameLabel = document.createElement('label');
  nameLabel.textContent = "Name";

  //creates the data radio input
  var dateInput = document.createElement('input');
  dateInput.setAttribute('type', "radio");
  dateInput.setAttribute('name', "sort");
  var dateLabel = document.createElement('label');
  dateLabel.textContent = "Date";

  // select a play hint
  var selectPlay = document.createElement('h1');
  selectPlay.innerHTML = "Select a play to see details";
  playHere.appendChild(selectPlay);

  nameInput.addEventListener("click", () => {

    var list = document.getElementById("list");
    list.innerHTML = "";

    const name = plays.sort((a, b) => a.title < b.title ? -1 : 1);

    name.forEach(playListSection);
    playDetails(plays);

  })

  dateInput.addEventListener("click", () => {
    var list = document.getElementById("list");
    list.innerHTML = "";

    const date = plays.sort((a, b) => a.likelyDate < b.likelyDate ? -1 : 1);

    date.forEach(playListSection);

    playDetails(plays);
  })

  // places label inside p element
  p.appendChild(label);
  p.appendChild(nameInput);
  p.appendChild(nameLabel);
  p.appendChild(dateInput);
  p.appendChild(dateLabel);

  playList.appendChild(p);

}

/* ------------    create and populate default play details      ------------- */
function playDetails(plays) {
  var playHere = document.querySelector('#playHere');

  var getItems = document.querySelectorAll("[data-id]");

  for (let items of getItems) {

    // create elements needed for each play
    var interface = document.querySelector('#interface');
    interface.innerHTML = "";

    var h2 = document.createElement('h2');
    var synopsis = document.createElement('p');

    var playH2 = document.createElement('h2');
    var date = document.createElement('p');
    var genre = document.createElement('p');
    var wikiLink = document.createElement('a');
    var gutenbergLink = document.createElement('a');
    var shakespeareLink = document.createElement('a');
    var description = document.createElement('p');

    var aside = document.querySelector('aside');

    var viewPlayButton = document.createElement('button');
    viewPlayButton.style.display = 'none';

    // if a list item is clicked it will show details about the play 
    items.addEventListener("click", (e) => {

      //clears the text content 
      interface.innerHTML = "";
      playHere.innerHTML = "";
      viewPlayButton.style.display = 'none';


      //display play details
      h2.innerHTML = items.innerHTML;
      playH2.innerHTML = items.innerHTML;

      for (let p of plays) {

        var getID = items.getAttribute('data-id');

        if (getID == p.id) {
          showPlayScript(viewPlayButton, p);

          if (p.filename != '') {
            viewPlayButton.setAttribute('id', 'viewPlay');
            viewPlayButton.textContent = "View Play Text";
            viewPlayButton.style.fontSize = '16px';
            viewPlayButton.style.display = 'block';
            aside.appendChild(viewPlayButton);
          }
          else {
            viewPlayButton.style.display = 'none';

          }

          // populate basic play details
          synopsis.innerHTML = p.synopsis;
          date.innerHTML = `Date of Composition: ${p.likelyDate}`;
          genre.innerHTML = `Genre: ${p.genre}`;
          wikiLink.setAttribute('href', p.wiki);
          wikiLink.style.paddingRight = '10px';
          wikiLink.innerHTML = `Wikipedia Link`;

          gutenbergLink.setAttribute('href', p.gutenberg);
          gutenbergLink.innerHTML = `Gutenberg Link`;
          gutenbergLink.style.padding = '10px';
          shakespeareLink.setAttribute('href', p.shakespeareOrg);
          shakespeareLink.style.padding = '10px';
          shakespeareLink.innerHTML = `Shakespeare Link`;

          description.innerHTML = `${p.desc}`;
        }

      }
      interface.appendChild(h2);
      interface.appendChild(synopsis);

      // appends play infomoation to playHere section
      playHere.appendChild(playH2);
      playHere.appendChild(date);
      playHere.appendChild(genre);
      playHere.appendChild(wikiLink);
      playHere.appendChild(gutenbergLink);
      playHere.appendChild(shakespeareLink);
      playHere.appendChild(description);


    }) // end of item.addEventListener

  }//for item loop
}

/* ------------  shows the default screen for when view play button is clicked    ------------- */
function showPlayScript(viewPlayButton, play) {

  var interface = document.querySelector("#interface");
  var playHere = document.querySelector('#playHere');


  // create interface elements for when play has an available script
  var h2 = document.createElement('h2');
  var actList = document.createElement('select');
  var sceneList = document.createElement('select');
  var playerFieldset = document.createElement('fieldset');

  //populate interface elements 
  actList.setAttribute("id", "actList");
  sceneList.setAttribute("id", "sceneList");

  //create playerlist selection
  var playerList = document.createElement('select');
  var option = document.createElement('option');
  playerList.setAttribute("id", "playerList");
  option.setAttribute('value', 0); // show the whole script
  option.textContent = "All Players";

  //search item textfield
  var text = document.createElement('input');
  text.setAttribute('input', 'text');
  text.setAttribute('id', 'txtHighlight');
  text.setAttribute('placeholder', "Enter a search term");

  //create filter button 
  var filterButton = document.createElement('button');
  filterButton.setAttribute('id', 'btnHighlight');
  filterButton.textContent = "Filter";

  playerList.appendChild(option);
  playerFieldset.appendChild(playerList);
  playerFieldset.appendChild(text);
  playerFieldset.appendChild(filterButton);


  // if play is available show script
  viewPlayButton.addEventListener("click", () => {

    viewPlayButton.innerHTML = "close";

    viewPlayButton.addEventListener('click', () => {
      var aside = document.querySelector('aside');
      playHere.innerHTML = "";
 
      var selectPlay = document.createElement('h1');
      selectPlay.innerHTML = "Select a play to see details";
      playHere.appendChild(selectPlay);
    })

    var api = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';
    console.log(`${play.id} has been chosen`);
    api = api + `?name=${play.id}`;

    console.log(`whole api = ${api}`);
    interface.innerHTML = "";
    playHere.innerHTML = "";

    // gets all api data 
    // showLoading();
    fetch(api)
      .then(response => response.json())
      .then(data => {
        // hideLoading();
        createPlayHereDetails(data);

        //populate player options
        for (let i = 1; i < data.persona.length; i++) {

          var playerList = document.querySelector('#playerList');
          var playerOptions = document.createElement('option');
          playerOptions.setAttribute('value', i);

          // playerOptions.innerHTML = persona.player;
          playerOptions.innerHTML = data.persona[i].player;

          playerList.appendChild(playerOptions);
        }

        var filterButton = document.querySelector('#btnHighlight');
        filterButton.addEventListener('click', () => {

          var txtHighlight = document.querySelector("input").value;

          // set search data
          if (playerList.selectedIndex == 0) {
            //show all players
            var playerSelected = "All Players";
            console.log(`playerSelected = ${playerSelected}`);
          }
          else {

            var playerSelected = data.persona[playerList.selectedIndex].player;
            console.log(`playerSelected = ${playerSelected}`);
          }

          // console.log(`search term = ${txtHighlight}`);

        })//filterbutton addeventlistener
  
      })

    interface.appendChild(h2);
    interface.appendChild(actList);
    interface.appendChild(sceneList);

    interface.appendChild(playerFieldset);
  })
}

function defaultScene(data){
  var h3 = document.createElement('h3');
  var sceneDiv = document.createElement('div');
  sceneDiv.setAttribute('id', 'sceneHere');
  var h4 = document.createElement('h4');

  h3.innerHTML = data.acts[0].name; // set act name to default: act1 
  h4.innerHTML = data.acts[0].scenes[0].name; // set scene name to default here: scene 1
  for (let l = 0; l < data.acts[0].scenes[0].speeches.length; l++) {
    var speechDiv = document.createElement('div');
    speechDiv.setAttribute('class', 'speech');

    var speechSpan = document.createElement('span');
    speechSpan.innerHTML = data.acts[0].scenes[0].speeches[l].speaker; 

    var p = document.createElement('p');
    p.innerHTML = data.acts[0].scenes[0].speeches[l].lines;

    speechDiv.appendChild(speechSpan);
    speechDiv.appendChild(p);
    sceneDiv.appendChild(speechDiv);
  }
}


/* -------------   create and populate playHere, actHere, sceneHere    ------------- */
function createPlayHereDetails(data) {

  var interfaceH2 = document.querySelector("#interface h2");
  var playHere = document.querySelector('#playHere');
  var actHere = document.querySelector('#actHere');
  var sceneList = document.querySelector('#sceneList');

  playHere.innerHTML = "";

  var playHereH2 = document.createElement('h2');
  var article = document.createElement('article');
  article.setAttribute('id', 'actHere');
  var h3 = document.createElement('h3');
  var sceneDiv = document.createElement('div');
  sceneDiv.setAttribute('id', 'sceneHere');
  var h4 = document.createElement('h4');
  var pTitle = document.createElement('p');
  pTitle.setAttribute('class', 'title');
  var pDirection = document.createElement('p');
  pDirection.setAttribute('class', 'direction');

  interfaceH2.innerHTML = data.short;
  playHereH2.innerHTML = data.title;

  // default values
  defaultScene(data);
  

  // populates the speech and speaker data for playHere 
  for (var i = 0; i < data.acts.length; i++) {

    var getActOptions = document.querySelector("#actList");
    var actOptions = document.createElement('option');

    actOptions.setAttribute('value', i);

    console.log(actOptions);

    actOptions.innerHTML = data.acts[i].name;

    getActOptions.appendChild(actOptions);

    // create addeventlistener to actoptions
    getActOptions.addEventListener("click", (e) => {
      sceneList.innerHTML = "";

      h3.innerHTML = data.acts[getActOptions.selectedIndex].name;
      var act = getActOptions.options[getActOptions.selectedIndex].text;

      for (let j = 0; j < data.acts[getActOptions.selectedIndex].scenes.length; j++) {

        var sceneOption = document.createElement('option');
        sceneOption.setAttribute('value', j);
        sceneOption.innerHTML = data.acts[getActOptions.selectedIndex].scenes[j].name;

        sceneList.appendChild(sceneOption);

        // populate speeches for seleted act and scene
        sceneList.addEventListener('click', (e) => {

          h4.innerHTML = data.acts[getActOptions.selectedIndex].scenes[sceneList.selectedIndex].name;

          sceneHere.innerHTML = "";
          for (let k = 0; k < data.acts[getActOptions.selectedIndex].scenes[sceneList.selectedIndex].speeches.length; k++) {
            var speechDiv = document.createElement('div');
            speechDiv.setAttribute('class', 'speech');

            var speechSpan = document.createElement('span');
            speechSpan.innerHTML = data.acts[getActOptions.selectedIndex].scenes[sceneList.selectedIndex].speeches[k].speaker;

            var p = document.createElement('p');
            p.innerHTML = data.acts[getActOptions.selectedIndex].scenes[sceneList.selectedIndex].speeches[k].lines;

            speechDiv.appendChild(speechSpan);
            speechDiv.appendChild(p);
            sceneDiv.appendChild(speechDiv);
          }

        })

      }

    })// getactoptions addeventlistner

  }// first for loop

  playHere.appendChild(playHereH2);

  article.appendChild(h3);
  article.appendChild(h4);

  sceneDiv.appendChild(pTitle);
  sceneDiv.appendChild(pDirection);
  // sceneDiv.appendChild(speechDiv);
  article.appendChild(sceneDiv);

  playHere.appendChild(article);

  var filterButton = document.querySelector('#btnHighlight');

  filterButton.addEventListener('click', () => {
    var speechHere = document.querySelector('#sceneHere');

    var speech = document.querySelectorAll('.speech span');
    var speechP = document.querySelectorAll('.speech p');
    var divSpeech = document.querySelector('div .speech');

    var txtHighlight = document.querySelector("input").value;
    // txtHighlight = `/${txtHighlight}/`; // for RegExp

    for(let lines of speechP){
      console.log(lines.innerHTML);
 
      if(txtHighlight == lines.innerHTML){
    
        lines.style.backgroundColor = 'yellow';
        lines.style.fontWeight = 'bold';
      }

    }

    if (playerList.selectedIndex == 0) {
      //show all players
      var playerSelected = "All Players";
 
    }
    else {

      var playerSelected = data.persona[playerList.selectedIndex].player;
      for (let s of speech) {
        if (s.innerHTML != playerSelected) {
          s.style.display = 'none';
        }
    
      }

      // for (let line of speechP) {
      // speaker.style.display = 'block';
      // // speechP.setAttribute('display', 'block');
      // // line.style.display = 'block';
      // // speaker.style.display = 'block';
      // // line.style.display = 'block';

      // if (speaker.innerHTML != playerSelected) {
      //   // console.log(`${speaker.innerHTML} == playerSelected`);
      //   speaker.style.display = 'none';

      //   // speechP.setAttribute('display', 'none');
      //   // line.style.display = 'none';
      // }

      // for (let line of speechP) {
      //   line.style.display = 'block';

      //   if (speaker.innerHTML != playerSelected) {
      //     line.style.display = 'none';
      //   }
      // }

    }//else closure

  })//filterbutton addeventlistener


}
