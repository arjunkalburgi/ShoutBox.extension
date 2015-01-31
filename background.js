// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    suggest([
     // {content: "Tweet:" + text  , description: "Tweet this"},
      
    ]);
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);

    var no_of_char=0;
    no_of_char=text.length;
    
    if (Notification.permission !== "granted")
    Notification.requestPermission();

  var notification = new Notification('Character limit exceeded', {
    icon: 'twittericon.png',
    body: "Hey there! You've been notified!",
  });
   
    if (no_of_char>140) {
      alert('im in the if');
      notification.show();
    }

    alert('You just typed "' + text + '" and it has ' + no_of_char+'characters');
  }
  );
