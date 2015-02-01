


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


         alert('actually?');
      // Send to Twitter

      var url = 'https://api.twitter.com/1.1/statuses/update.json';
      var request = {'method': 'POST', 'parameters': {'status': text}};
      function callback(response, xhr) {
        var result = JSON.parse(response);
            if (result.errors !== undefined) {
                notify('icon.png', 'Oops! There was an error.',
                    result.errors[0].message);
            } else {
                notify(result.user.profile_image_url_https, result.user.name,
                    result.text);
            }
        }
        alert('it is heree');
        var oauth = ChromeExOAuth.initBackgroundPage({
          'request_url': 'https://api.twitter.com/oauth/request_token',
          'authorize_url': 'https://api.twitter.com/oauth/authorize',
          'access_url': 'https://api.twitter.com/oauth/access_token',
          'consumer_key': 'JeSDrMy0zMDh7Pmt3xWSLy0hh',
          'consumer_secret': 'Hfky1qT3IITyANQrA4cOtiUCHujseMV389eKHwLqf7mIuoWRLf',
          'scope': 'https://api.twitter.com/1.1/statuses/update.json',
          'app_name': 'ShoutBox.extension'
        });
        alert('IT IS HER');
        oauth.sendSignedRequest(url, callback, request);
        alert("IT IS HERE 2");
      // var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(text);
      // window.open(twtLink,'_blank');
      
	    
	    	
	}
);
