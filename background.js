
// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    
    console.log('inputChanged: ' + text);
    
    // First suggest line
    chrome.omnibox.setDefaultSuggestion({
            description: 'Character count: ' + String(text.length)
    });
    
    // Other suggest lines
    suggest([
      //{content: "Tweet this: " + text, description: "Make a tweet"},
      {content: text + " ", description: "Post with Twitter"},
      //{content: "Fb: " + text, description: "Make a Facebook post"}

    ]);
  });

// This event is fired with the user accepts the input in the omnibox.






chrome.omnibox.onInputEntered.addListener(
	function(text) {

  //   <script type="text/javascript" src="chrome_ex_oauthsimple.js"></script>
  // <script type="text/javascript" src="chrome_ex_oauth.js"></script>
  // <script type="text/javascript" src="onload.js"></script>

var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key': 'anonymous',
  'consumer_secret': 'anonymous',
  'scope': 'https://docs.google.com/feeds/',
  'app_name': 'My Google Docs Extension'
});

	  	
	    console.log('inputEntered: ' + text);
	
		// var ar = text.split(":");
		// var type = ar[0];
		// var text = ar[1];
		// alert('The type of the tweet: ' + type + "\n" + 'The tweet: ' + post);
	
	    var no_of_char=0;
	    no_of_char=text.length;
	    
	    if (Notification.permission !== "granted")
	    Notification.requestPermission();
	    
	    if (no_of_char>140) {
	    // Notifications:
			// alert('im in the if');
			     var notification = new Notification('Character limit exceeded', {
			    icon: 'twittericon.png',
			    body: "Hey there! You've been notified!",
			     });
			   notification.onclick = function () {
			   window.open("http://twitter.com/");
			   }
		     }


         
      // Send to Twitter
    oauth.authorize(function() {
  // ... Ready to fetch private data ...
});

function callback(resp, xhr) {
  // ... Process text response ...
};

function onAuthorized() {
  var url = 'https://docs.google.com/feeds/default/private/full';
  var request = {
    'method': 'GET',
    'parameters': {'alt': 'json'}
  };

  // Send: GET https://docs.google.com/feeds/default/private/full?alt=json
  oauth.sendSignedRequest(url, callback, request);
};

oauth.authorize(onAuthorized);









	}
);
