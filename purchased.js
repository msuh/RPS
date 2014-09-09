// ITEMS --> the js map variable containing purchase items
var ITEM_NAME = [];
var ITEM_ID = [];

//Jquery 
$(document).ready(function(){
	getItemList("");
	//populate page with items
	displayItems();

	$(document).on('click', '#input_playButton', function(evt) {
		localStorage.CURRENT_ID = $(evt['target']['parentElement']["parentElement"]).attr('id');
		window.location = 'game.html';
	});

	setAutocompelte();

    $("#input_search").keypress(function(evt){
    	if(evt.keyCode == 13){
    		var str = $('#input_search').val();
    		$('#input_search').val("");
    		getItemList(str);
    		displayItems();
    		$('#input_search').autocomplete('close');
    	}
    });

});


function generateItemHTML(id){
	var img='<img class="img_purchaseItem" src="'+ITEMS[id]['img']+'"/>',
		name='<p class="p_itemName p_label">'+ITEMS[id]['name']+'</p>',
		vendor = '<p class="p_vendor p_label">'+ITEMS[id]['vendor']+'</p>',
		rule = '<p class="p_itemRule p_label">'+ruleListIntoStr(ITEMS[id]['rule'])+'</p>',
		price = '<p class="p_itemPrice p_label">'+ITEMS[id]['price']+' vs FREE </p>',
		chance = '<p class="p_itemChance">'+ITEMS[id]['chance']+' Chance</p>';
	return '<li id="'+id+'" class="li_element">'
	   			+img+
	   			'<div class="div_itemInfo">'
	   			+vendor+name+rule+price+
	   			// '</div><input id="input_playButton" type="button" value="PLAY"/></li>';
	   			'</div><div class="div_playButton"><img id="input_playButton" src="icons/rockItNow.png" />'+chance+'</div></li>'
	   			+"<img class='img_divider' src='icons/grayLine.png' />";
	   			// '</div><a href="game.html"><input id="input_playButton" type="button" value="PLAY"/></a></li>';
}

function getItemList(str){
	ITEM_NAME = [];
	ITEM_ID = [];

	for(i in ITEMS){
		if(ITEMS[i]['name'].toLowerCase().indexOf(str)!== -1){
			ITEM_NAME.push(ITEMS[i]['name']);
			ITEM_ID.push(i);		
		}
	}
}

function displayItems(){
	console.log("entered displayItems");
	$('#ol_purchase').empty();
	for(i in ITEM_ID){
		$('#ol_purchase').append(generateItemHTML(ITEM_ID[i]));
	}

}

function setAutocompelte(){
	$( "#input_search" ).autocomplete({
      source: ITEM_NAME
    });
}

//parses the rule list into readable string to display for users
function ruleListIntoStr(list){
	return "Win "+list[0]+" out of "+list[1]+" rounds";
}
