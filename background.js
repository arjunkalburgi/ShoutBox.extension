

function resetDefaultSuggestion() {
	
	chrome.omnibox.setDefaultSuggestion({
		description: " Type your tweet"
	});
} resetDefaultSuggestion();
