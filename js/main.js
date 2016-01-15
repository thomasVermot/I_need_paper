/* GLOBAL VARS */
var poopometer = 65;
var room = 1;
//Inventory
var hasPaper   = false,
	hasBear    = false,
	hasOil     = false,
	hasPudding = false,
	hasTissue  = false;
//ActivatedRooms
var talkedToKid               = false,
	talkedToBear              = false,
	talkedToMagician_ugly     = false,
	talkedToMagician_dyslexia = false,
	talkedToDoctor            = false,
	talkedToBodyBuilder       = false,
	talkedToBarbarian         = false,
	talkedToScientist         = false,
	talkedToPig               = false,
	acceptedScientist = false;
//Curses
var dyslexia = false,
	dyslexiaCured = false,
	ugliness = false,
	uglinessCured=false;


function Room(roomName, up,right,down,left ){
	this.leftRoom   = left;
	this.rightRoom = right;
	this.downRoom  = down;
	this.upRoom    = up;
	this.roomName = roomName;
}

/* CREATING THE ROOMS */
	var rooms = new Array;
	//Floor 0            ROOMNAME         , up  ,right, down, left
	rooms[1] = new Room("toilets"         , null, 2   , null, null);
	rooms[2] = new Room("coridor"         , 5   , 3   , null, 1   );
	rooms[3] = new Room("bathroom"        , null, null, null, 2   );
	//Floor 1            ROOMNAME         , up  ,right, down, left
	rooms[4] = new Room("fountain"        , null, 5   , null, null);
	rooms[5] = new Room("coridor"         , 7   , 6   , 2   , 4   );
	rooms[6] = new Room("kid"             , null, null, null, 5   );
	//Floor 2            ROOMNAME         , up  ,right, down, left
	rooms[7] = new Room("Coridor"         , null, 8   , 5   , null);
	rooms[8] = new Room("board"           , 9   , null, null, 7   );
	//Floor 3            ROOMNAME         , up  ,right, down, left
	rooms[9] = new Room("witcher-ugly"    , 11  , null, 8   , null);
	//Floor 4            ROOMNAME         , up  ,right, down, left
	rooms[10]= new Room("witcher-dyslexia", 14  , 11  , null, null);
	rooms[11]= new Room("bear"            , null, 12  , 9   , 10  );
	rooms[12]= new Room("bodyBuilder"     , 15  , 13  , null, 11  );
	rooms[13]= new Room("barbarian"       , null, null, null, 12  );
	//Floor 5            ROOMNAME         , up  ,right, down, left
	rooms[14]= new Room("doctor"          , null, null, 10  , null);
	rooms[15]= new Room("pig"             , 16  , null, 12  , null);
	//Floor 6            ROOMNAME         , up  ,right, down, left
	rooms[16]= new Room("scientist"       , 17  , null, 15  , null);
	//Floor 7            ROOMNAME         , up  ,right, down, left
	rooms[17]= new Room("toiletPaper"     , null, null, 16  , null);
/* END CREATING THE ROOMS */

/* SETTING THE ROOMS CONVERSATIONS FOR NPCs */
	//Floor 0
	rooms[1].npcText = function(){return "";};
	rooms[2].npcText = function(){return "";};
	rooms[3].npcText = function(){return "";};
	// Floor 1
	rooms[4].npcText = function(){return "Toute cette eau qui coule te donne encore plus envie d'aller aux toilettes!";};
	rooms[5].npcText = function(){return "";};
	rooms[6].npcText = function(){
		if(hasBear==true){
			return "Merci d'avoir retrouvé mon nounours monsieur!";
		}
		return "Hé monsieur! T'aurais pas vu mon nounours?";
	};
	//Floor 2
	rooms[7].npcText = function(){return "";};
	rooms[8].npcText = function(){return "Ce tableau magnifique mais un brin suggestif te rappelle à quel point un homme est bien sur son trône.";};
	// Floor 3
	rooms[9].npcText = function(){
		if(talkedToMagician_ugly == true){
			if(ugliness == true){
				return "J'adore faire le mal!";
			}
			else{
				return "Rhoo! Tu as trouvé un remède contre mon sort de laideur... T'es vraiment pas drôle!";
			}
		}
		return "Je suis Saleau! Le magicien salaud! Abracadabra! Tu es maintenant moche comme un poux!";
	};
	// Floor 4
	rooms[10].npcText = function(){

		if(talkedToMagician_dyslexia == true){
			if(dyslexia == true){
				return "Oh comme il a l'air stupide! C'est super drole!";
			}
			else{
				return "Rhoo! Tu as trouvé un remède contre mon sort de dyslexie... T'es vraiment pas drôle!";
			}
		}
		return "C'est encore moi! Saleau! Le magicien salaud! Et tu es maintenant dyslexique!";
	};
	rooms[11].npcText = function(){
		if(talkedToBear == true){
			return "";
		}
		return "Hé! tu aurais pas vu mon enfant? Il est petit et c'est un enfant.";
	};
	rooms[12].npcText = function(){
		if(hasOil == true){
			return "Je m'éblouis tellement je suis musclé!";
		}
		return "Tu trouves pas qu'on voit pas assez mes muscles? Il me faudrait de l'huilde pour le corps.";
	};
	rooms[13].npcText = function(){
		if(hasTissue == true){
			return "Merci! Mon manche est tout reluisant maintenant!";
		}
		return "Mon manche est tout sale! Il faudrait que je l'astique. Tu aurais du sopalin?";
	};
	//Floor 5
	rooms[14].npcText = function(){
		if(talkedToDoctor == true){
			return "Si mes calculs sont exactes, tu ne devrais plus avoir besoin d'aller aux toilettes pendant environ 2 ans.";
		}
		return "J'ai fini la solution constipante! Tu voudrais l'essayer?";
	};
	rooms[15].npcText = function(){
		if(hasPudding){
			return "...";
		}
		return "J'adore le boudin! J'adorerai en fabriquer. Tu connais la recette?";
	};
	// Floor 6
	rooms[16].npcText = function(){
		if(talkedToScientist==true){
			if(acceptedScientist == true){
				return "Merci! Vous avez fait avancer la science";
			}
			else{
				return "Encore un imbécile qui ne comprends rien à la science!";
			}
		}
		return "Ma théorie est presque finie! Plus qu'une expérience et à moi le prix nobel! Tirez mon doigt!";
	};
	// Floor 7
	rooms[17].npcText = function(){ return "Vous avez trouvé du papier toilette!"; };
/* END SETTING THE ROOMS CONVERSATIONS FOR NPCs */

/* SETTING THE ROOMS CONVERSATIONS FOR THE PLAYER */
	//Floor 0
	rooms[1].playerText = function(){return new Array("J'ai trop envie d'aller aux toilettes, mais y a plus de papier!");};
	rooms[2].playerText = function(){return new Array("Par où je pourrais trouver du papier toilette?");};
	rooms[3].playerText = function(){return new Array("Il n'y en a pas ici...");};
	// Floor 1
	rooms[4].playerText = function(){return new Array("Il ne faut pas que je traine!");};
	rooms[5].playerText = function(){return new Array("Glups");};
	rooms[6].playerText = function(){
		if(hasBear==true){
			if(hasOil){
				return new Array("Salut Petit!");
			}
			return new Array("Tiens! Ton nounours!");
		}
		return new Array("Heu, non. Mais si je le trouve, je te le ramène!");
	};
	//Floor 2
	rooms[7].playerText = function(){return new Array("Par où je vais...");};
	rooms[8].playerText = function(){return new Array("Vite vite viite!");};
	// Floor 3
	rooms[9].playerText = function(){
		if(talkedToMagician_ugly == true){
			if(ugliness == true){
				return new Array ("C'est la beauté intérieure qui compte");
			}
			else{
				return new Array ("...");
			}
		}
		return new Array ("Salaud!");
	};
	// Floor 4
	rooms[10].playerText = function(){
		if(talkedToKid == true){
			return new Array ("Ouai, suis moi");
		}
		return new Array ("Heu, non, désolé.");
	};
	rooms[11].playerText = function(){
		text =  new Array ();
		text[0]="?!";
		if(talkedToMagician_dyslexia == true){
			if(dyslexia == true){
				text[0]="Tu te crois malin?";
			}
			else{
				text[0]="Tu crains! Ne t'approche plus de moi.";
			}
		}
		return text;
	};
	rooms[12].playerText = function(){
		if(hasOil == true){
			return new Array ("Tiens, ton huile pour le corps!");
		}
		return new Array ("Je vais te chercher ça.");
	};
	rooms[13].playerText = function(){
		if(hasTissue == true){
			return new Array ("Content que ça te plaise!");
		}
		return new Array ("Si j'en trouve, je te le ramène!");
	};
	//Floor 5
	rooms[14].playerText = function(){
		if(talkedToDoctor == true){
			return new Array ("Je ne suis pas sûr que ça dure aussi longtemps... Par contre ça a l'air de soigner la dyslexie!");
		}
		return new Array (
			"Volontier! J'en ai bien besoin actuellement!",
			"Non, je ne préfère pas..."
		);
	};
	rooms[15].playerText = function(){
		if(hasPudding){
			return new Array ("Heu... Bon apétit.");
		}
		return new Array ("Je ne sais pas. Mais je doute que ça te plaise...");
	};
	// Floor 6
	rooms[16].playerText = function(){
		if(talkedToScientist==true){
			if(acceptedScientist == true){
				return new Array ("J'ai trop envie d'aller aux toilettes maintenant!");
			}
			else{
				return new Array ("Okay. Tirez mon doigt.","Au revoir!");
			}
		}
		return new Array (
			"D'accord!",
			"Heu, je ne préfère pas."
		);
	};
	// Floor 7
	rooms[17].playerText = function(){ return new Array ("Enfin! Il faut vite que j'aille aux toilettes!"); };
/* END SETTING THE ROOMS CONVERSATIONS FOR THE PLAYER */

/* SETTING ROOM EFFECT ON ENTERING */
	//1,4,8 
	function adPoop(){
		poopometer+=5;
		$('#poopometer .value').css('width',poopometer+'%')
	}
	function removePoop(){
		poopometer-=5;
		$('#poopometer .value').css('width',poopometer+'%')
	}
	function activateObject(name){$('#'+name).removeClass('inactive').addClass('active');}
	function enableNavigation(){
		if(rooms[room].upRoom!=null)   {$('#room #up').addClass('active'); }
		if(rooms[room].downRoom!=null) {$('#room #down').addClass('active'); }
		if(rooms[room].rightRoom!=null){$('#room #right').addClass('active'); }
		if(rooms[room].leftRoom!=null) {$('#room #left').addClass('active'); }
	}
	function disactiveConversation(){
		//Unset the npc text
		$('#npcText').text("");
		//unset the player texts
		$('#playerText').empty();
	}
	function activeConcersation(){
		//load the character text
		var npcText = rooms[room].npcText();
		$('#npcText').text(npcText);
		//Load the player texts
		var playerTexts = ["Answer1", "Answer2"];
		var playerTexts = rooms[room].playerText();
		for(var i=0; i<playerTexts.length; i++){
			var answer = $('<div class="answer '+i+' textBubble" answerNum="'+i+'">' + playerTexts[i] + '</div>');
			answer.appendTo($('#playerText'));
		}

	}
	function win(object){
		alert("Félicitations! Vous avez gagné!");
		if(object=='tissue'){
			alert("Mais vous avez les fesses iritées. Le sopalin ça gratte!");
		}
	}
	function lose(){alert("Vous vous êtes fait dessus. ça arrive aux meilleurs d'entre nous. Et là c'est à vous que c'est arrivé.");}

	function activateRoom(){
		switch(room){
			case 1: 
				enableNavigation();
				if(hasPaper){
					win('paper');
				}
				else if(hasTissue){
					win('tissue');
				}
				break;
			case 2: enableNavigation();break;
			case 3: enableNavigation();break;
			case 4: enableNavigation();adPoop();break;
			case 5: enableNavigation();break;
			case 7: enableNavigation();adPoop();break;
			case 8: enableNavigation();adPoop();break;
			case 17: hasPaper=true;activateObject('paper');break;
		}
	}
	function activateAnswerEffect(answer){
		switch(room){
			case 6: // Give the bear and the kid gives oil
				console.log('    You talk to the Kid');
				talkedToKid=true;
				if(hasBear){
					hasOil=true;
					activateObject('oil');
					console.log('    You obtain Body Oil!');
				}
				break;
			case 9: // Witcher makes you ugly
			    console.log('    You talk to the Witcher');
				talkedToMagician_ugly=true;
				if(ugliness==false){

			    	console.log('    You become ugly!');
					ugliness=true;
				}
				break;
			case 10: // witcher makes you dyslexic
			    console.log('    You talk to the Witcher');
				talkedToMagician_dyslexia=true;
				if(dyslexia==false && dyslexiaCured==false){
			    	console.log('    You become Dyslexic');
					dyslexia=true;
				}
				break;
			case 11: // if you know the kid, the bear will follow you
			    console.log('    You talk to the bear');
				talkedToBear=true;
				if(talkedToKid){
			    	console.log('    He follows you');
					hasBear=true;
					activateObject('bear');
				}
				break;
			case 12: // Give oil to the bodybuilder and he gives you pudding recipe
			    console.log('    You talk to the Bodybuilder');
				talkedToBodyBuilder=true;
				if(hasOil){
			    	console.log('    You obtain the pudding recipe');
					hasPudding=true;
					activateObject('pudding');
				}
				break;
			case 13: //give tissue to the barbarian and he'll cure all your curses
			    console.log('    You talk to the barbarian');
				talkedToBarbarian=true;
				if(hasTissue){
			    	console.log('    You are cured from all your curses');
					if(dyslexia){
						dyslexia = false;
						dyslexiaCured = true;
					}
					if(ugliness){
						ugliness = false;
						uglinessCured = true;
					}
				}
				break;
			case 14: // If you drink the doctor's potion, the poopometer goes down and you are not dyslexic anymore
			    console.log('    You talk to the doctor!');
				talkedToDoctor=true;
				if(answer==0){
			    	console.log('    Your need to poop is less urgent... Oh! And you are not dyslexic anymore!');
					removePoop();
					if(dyslexia){
						dyslexia=false;
						dyslexiaCured=true;
					}
				}
				break;
			case 15: // Give the pudding recipe to the pig and he'll drop tissue
			    console.log('    You talk to the pig');
				talkedToPig=true;
				if(hasPudding){
			    	console.log('    You find tissue');
					hasTissue=true;
					activateObject('tissue');
				}
				break;
			case 16: // Pull the scientist finger and you will need to poop a bit more
			    console.log('    You talk to the scientist');
				talkedToScientist=true;
				if(answer==0){
			    	console.log('    You need to poop more than ever!');
					adPoop();
					acceptedScientist=true;
				}
				break;

		}
		disactiveConversation();
		enableNavigation();
	}
/* END SETTING ROOM EFFECT ON ENTERING */

/* GOING IN A DIRECTION */
function updateRoom(direction){
	switch(direction){
		case 'up':
			if(rooms[room].upRoom!=null){
				room = rooms[room].upRoom;
			}
			break;
		case 'down':
			if(rooms[room].downRoom!=null){
				room = rooms[room].downRoom;
			}
			break;
		case 'right':
			if(rooms[room].rightRoom!=null){
				room = rooms[room].rightRoom;
			}
			break;
		case 'left':
			if(rooms[room].leftRoom!=null){
				room = rooms[room].leftRoom;
			}
			break;
	}
}
function exitRoom(){
	//unset the room image
	$('#room').removeClass('room-'+room);
	//unset the character image
	$('#npcImage').removeClass('npc-'+room);
	//unset the text
	disactiveConversation();
	//Disable navigation arrows
	$('#room .arrow').removeClass('active');
}
function loadRoom(){
	//Load the room image
	$('#room').addClass('room-'+room);
	//load the character image
	$('#npcImage').addClass('npc-'+room);
	//Enable navigation arrows
	console.log("Going to room "+room+" ( "+rooms[room].roomName+" )");
	activateRoom();
	//load the texts
	activeConcersation();

	//Setting effects on answers
	$('#playerText .answer').click(function(){
		activateAnswerEffect($(this).attr('answerNum'))
	})


	//enableNavigation();
}
$('#room .arrow').click(function(){
	exitRoom();
	updateRoom($(this).attr('id'));
	loadRoom();
})

exitRoom();
loadRoom();
adPoop();

/*exitRoom();
room = 13;
loadRoom();*/