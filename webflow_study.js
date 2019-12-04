var currentCardId = "NA";

attachCardSnapshotListener = function(thisObj)
{
	var db = firebase.firestore();

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    console.log('update_learning_content got user: ' + user.uid)
	    
	    var query = db
	    	.collection('cards')
	    	.where('user', '==', user.uid)
	    	.orderBy('spacingLastDue')
	    	.limit(1);

			query.onSnapshot(function(snapshot) {
				if (!snapshot.size) {
					console.log('snapshot empty')
					return;
				}
				snapshot.forEach(function(doc) {
					console.log(doc.id, ' -> ', doc.data());
					currentCardId = doc.id;

					$("#clozedContent").html(doc.get('contentClozed'));
					$("#nativeTranslation").html(doc.get('contentNativeTranslation'));
					$("#preNote").html(doc.get('notePre'));
					$("#postNote").html(doc.get('notePost'));
					$("#originalContent").html(doc.get('contentOriginal'));
				});
			});
		} else {
			console.log('no auth user')
		}
	});
};

$("#showAnswerButton").click
(
	function()
	{
		console.log("showAnswerButton click");
		$("#clozedContent").hide();
		$("#originalContent").show();

		$("#postNote").show();

		$("#showAnswerDiv").hide();
		$("#setIntervalGrid").show();
	}
)

$("#buttonAgain").click
(
	function()
	{
		console.log("buttonAgain click.");
	}
)

$("#buttonGood").click
(
	function()
	{
		console.log("buttonGood click.");
	}
)

$("#buttonBest").click
(
	function()
	{
		console.log("buttonBest click.");
	}
)

function setLearningDifficulty(difficulty) {
	console.log('About to set card w/ id', currentCardId, ' to difficulty ' difficulty);
}

// active_tf: true
// clozeNum: 1
// contentClozed: "政府的[decision]引起了很多不同的指責。"
// contentNativeTranslation: "The government's decision gave rise to a lot of criticism."
// contentOriginal: "政府的決定引起了很多不同的指責。"
// note: "yGhZnyAQ3SEvGKAxniX0"
// notePost: "This is a sample post-note, but mod for card 1."
// notePre: "This is a sample pre-note for card 1"
// spacingDue: uo {seconds: 1575223340, nanoseconds: 372809000}
// spacingLastDue: uo {seconds: 1575216140, nanoseconds: 372809000}
// spacingLastInterval: 50
// spacingLastMultiplier: 2
// user: "S4BpEFgxflezIHhuzUH19819mg93"
// __proto__: Object

$(this).ready
(
	function() {
		attachCardSnapshotListener($(this));
		console.log('Done.')
	}
)
