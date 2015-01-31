function resetDefaultSuggestion() {
	
	chrome.omnibox.setDefaultSuggestion({
		description: " Type your tweet"
	});
} resetDefaultSuggestion();

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    suggest([
      //{content: "Tweet this: " + text, description: "Make a tweet"},
      {content: "Tw: " + text, description: "Make a tweet"},
      {content: "Fb: " + text, description: "Make a Facebook post"}
    ]);
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
	// function(text) {
	// 	console.log('inputEntered: ' + text);
	// 	alert('You just typed "' + text + '"');
	// }
	function(text) {
		var ar = text.split(":");
		var type = ar[0];
		var post = ar[1];
		alert('The type of the tweet: ' + type + "\n" + 'The tweet: ' + post);
	}
);
