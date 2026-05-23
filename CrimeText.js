
//GLOBAL VARIABLES & APP DATA

// Array of 10 personality test questions
var questions = [
  "If a rule at school doesn't make logical sense to me, I usually don't feel bad about ignoring it.",
  "Once something is put onto the internet, it should be free for absolutely anyone to use or download.",
  "If I buy a video game or a streaming subscription, my friends should be allowed to use my login whenever they want.",
  "If I am excited about a song or a funny video, I want to share it with the people around me right away.",
  "I am really forgetful and constantly find random pens, pencils, or small items in my backpack that aren't mine.",
  "If a store or a school event puts out a bowl of items labeled 'FREE,' you should take as much as your hands can hold.",
  "Taking something small from a massive, billionaire-owned company doesn't actually hurt anyone.",
  "I get extremely frustrated when I have to wait in a slow line or follow a slow process when I know a faster way.",
  "I love leaving my mark on things, like covering my notebooks, laptop, or bedroom walls in doodles and stickers.",
  "I get a little thrill or a rush of excitement when I successfully sneak an outside snack into a movie theater."
];

// Profile descriptions for each character
var description = [
  "Subject exhibits anomalously high levels of societal compliance. You respect authority to a fault and actually take the time to read the 'terms and conditions' before clicking agree. Hidden Behaviors: You probably apologize to automatic doors when they open for you, and you definitely walk your shopping cart back to the exact corral every single time. You are either a literal saint, or you completely lied on this test just to look good.",
  "Subject operates entirely within the ethical gray zones of minor convenience. You don't actively want to harm society, but your moral compass completely takes a nap if a minor rule gets in the way of saving 30 seconds. Hidden Behaviors: You are the primary reason cheap school pens and pencils constantly go missing. Your 'crimes' include keeping a borrowed eraser for three months, stuffing an extra handful of free restaurant mints into your pocket, and using an old family streaming password without asking.",
  "Subject actively rejects artificial boundaries and structural instructions. You view municipal guidelines (like crosswalks, fences, and queues) as friendly design suggestions rather than laws. Hidden Behaviors: You are highly likely to jaywalk across a busy intersection while looking a law enforcement officer directly in the eye. You believe that if a movie or game is online for free, paying a corporation for it is a total scam. You have definitely eaten food or opened a bag of chips in a grocery store aisle before paying for it.",
  "Absolute lawlessness. Subject scores maximum points across every behavioral risk factor tested. You possess zero corporate loyalty, an extreme impatience for standard processes, and an alarming appetite for rule-breaking adrenaline. Hidden Behaviors: You do not care about the social contract. You are the exact type of person who blasts TikTok videos or music directly from your phone speaker in a quiet, crowded room without headphones. You actively enjoy the thrill of sneaking giant outside snacks into movie theaters."
];

// Asset and text lists matching the character indexes
var images = ["SOCI.png", "POO-A.png", "UCPM.png", "SLVN.png"];
var crimerate = ["0%-25%", "27.5%–57.5%", "60%–85%", "87.5%–100%"];
var threatlevel = ["Low Risk", "Moderate Risk", "High Risk", "Maximum Risk"];
var characters = ["SOCI", "POO-A", "UCPM", "SVLN"];
var nameexpanded = ["Socially Compliant Individual", "Petty Offense Operator", "Uncontained Public Menace", "The Ultimate Supervillain"];

// Text labels for the 0-4 slider position status
var stat = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

// State tracking variables
var playerscores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Tracks answer value for each question
var totalscore = 0;                                // Combined total score
var Qcount = 1;                                    // Keeps track of current question number

//HOME PAGE ONEVENT

// Click to start the quiz
onEvent("Htestbutton", "click", function() {
  setScreen("questionpage");
  newquestion();
  playSound("sound://category_app/app_button_click_1.mp3", false);
});

// Click to view all the characters page
onEvent("Hcharacterbutton", "click", function() {
  setScreen("allresultspage");
  setProperty("Acharacterselect", "index", 0);
  setText("Acharacterdescription", nameexpanded[0] + "\n\n" + "Threat Level:" + threatlevel[0] + "\n\n" + "Commit Crime Rate:" + crimerate[0] + "\n\n" + description[0]);
  setImageURL("Acharacterimg", images[0]);
  playSound("sound://category_app/app_button_click_1.mp3", false);
});

//QUIZ PAGE ONEVENT

// Save slider data and advance to the next question
onEvent("Qnextbutton", "click", function() {
  playerscores[Qcount - 1] = getNumber("slider");
  Qcount = Qcount + 1;
  newquestion();
  playSound("sound://category_app/app_button_click_1.mp3", false);
});

// Save slider data and return to the previous question
onEvent("Qbackbutton", "click", function() {
  playerscores[Qcount - 1] = getNumber("slider");
  Qcount = Qcount - 1;
  newquestion();
  playSound("sound://category_app/app_button_click_1.mp3", false);
});

// Dynamically update text label when moving the slider
onEvent("slider", "input", function() {
  setText("Qstatus", stat[(getNumber("slider"))]);
  playSound("sound://category_app/perfect_app_button_3.mp3", false);
});

// Submit final quiz scores to view results
onEvent("Qresultsbutton", "click", function() {
  setScreen("testresultpage");
  getresults();
  playSound("sound://category_app/app_button_click_1.mp3", false);
});

//TEST RESULTS PAGE EVENT LISTENERS

// Return to home screen and wipe previous answers clean
onEvent("Tbackbutton", "click", function() {
  setScreen("homepage");
  resettest();
  playSound("sound://category_app/app_button_click_1.mp3", false);
});

// 5. ALL RESULTS INDEX PAGE EVENT LISTENERS

// Exit index back to home screen
onEvent("Abackbutton", "click", function() {
  setScreen("homepage");
  playSound("sound://category_app/app_button_click_1.mp3", false);
});

// Dropdown selector to view different character descriptions
onEvent("Acharacterselect", "change", function() {
  playSound("sound://category_app/app_button_click_1.mp3", false);
  var character;
  
  if (getText("Acharacterselect") == "SOCI") {
    character = 0;
  } else if ((getText("Acharacterselect") == "POO-A")) {
    character = 1;
  } else if ((getText("Acharacterselect") == "UCPM")) {
    character = 2;
  } else {
    character = 3;
  }
  
  setText("Acharacterdescription", nameexpanded[character] + "\n\n" + "Threat Level:" + threatlevel[character] + "\n\n" + "Commit Crime Rate:" + crimerate[character] + "\n\n" + description[character]);
  setImageURL("Acharacterimg", images[character]);
});

//CORE APP LAB FUNCTIONS

// Updates elements on screen to match current question states
function newquestion() {
  setText("Qquestionnum", "QUESTION " + Qcount);
  setText("Qquestion", questions[Qcount - 1]);
  setProperty("slider", "value", playerscores[Qcount - 1]);
  setText("Qstatus", stat[(playerscores[Qcount - 1])]);
  
  // Conditionally manage back button visibility
  if (Qcount == 1) {
    hideElement("Qbackbutton");
  } else {
    showElement("Qbackbutton");
  }
  
  // Toggles context buttons between next question or view final results
  if (Qcount == questions.length) {
    hideElement("Qnextbutton");
    showElement("Qresultsbutton");
  } else {
    showElement("Qnextbutton");
    hideElement("Qresultsbutton");
  }
}

// Calculates scores and populates user outcome profiles
function getresults() {
  var character = 0;
  
  // Loops through array to add individual values into final total score
  for (var i = 0; i < playerscores.length; i++) {
    totalscore = totalscore + playerscores[i];
  }
  
  // Core conditional bracket to determine personality type assignment
  if (totalscore >= 35) {
    character = 3;
  } else if ((totalscore >= 24)) {
    character = 2;
  } else if (totalscore >= 11) {
    character = 1;
  } else {
    character = 0;
  }
  
  // Renders the calculations onto target display outputs
  setImageURL("Timage", images[character]);
  setText("Tresult", characters[character]);
  setText("Tcrimerate", "Threat Level:" + threatlevel[character]);
  setText("Tcrimelevel", "Commit Crime Rate:" + crimerate[character]);
  setText("Tdescription", nameexpanded[character] + "\n\n" + description[character]);
}

// Empties accumulated score metrics for a fresh playback
function resettest() {
  Qcount = 1;
  totalscore = 0;
  playerscores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
