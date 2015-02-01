
// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	
	// console.log('inputChanged: ' + text);
	
	// First suggest line
	chrome.omnibox.setDefaultSuggestion({
		description: 'Character count: ' + String(text.length)
	});
	
	// Other suggest lines
	suggest([
		//{content: "Tweet this: " + text, description: "Make a tweet"},
		// {content: text + " ", description: "Post with Twitter"},
		//{content: "Fb: " + text, description: "Make a Facebook post"}
		
	]);
});

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(function(text) {

    // console.log('inputEntered: ' + text);

	// Initialise variable for the number of characters
    var no_of_char=0;
    no_of_char=text.length;
    
    if (Notification.permission !== "granted")
    Notification.requestPermission();
    
    // If the tweet goes over 140 characters send a notification
    if (no_of_char>140) {
		var notification = new Notification('Character limit exceeded', {
			icon: 'twittericon.png',
			body: "Hey there! You've been notified!",
		});
		notification.onclick = function () {
			window.open("http://twitter.com/");
		}
	}
	
	// getting keys and tokens for user's app
	ck = localStorage.getItem("ckey");
	cs = localStorage.getItem("csec");
	tk = localStorage.getItem("tkey");
	ts = localStorage.getItem("tsec");
	
	// Sending information to server
	console.log("before xml");
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","http://localhost:3000/post-status?message=" +  encodeURIComponent(text),true);
	xmlhttp.send();
});

