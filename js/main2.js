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
	talkedToScientist         = false;
	acceptedScientist = false;
//Curses
var dyslexia = false,
	dyslexiaCured = false,
	ugliness = false;


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
		if(talkedToBear == true){
			return "";
		}
		return "Hé! tu aurais pas vu mon enfant? Il est petit et c'est un enfant.";
	};
	rooms[11].npcText = function(){
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
	rooms[4].playerText = function(){return new Array("Toute cette eau qui coule te donne encore plus envie d'aller aux toilettes!");};
	rooms[5].playerText = function(){return new Array("Glups");};
	rooms[6].playerText = function(){
		if(hasBear==true){
			return new array("Tiens! Ton nounours!");
		}
		return new Array("Heu, non. Mais si je le trouve, je te le ramène!");
	};
	//Floor 2
	rooms[7].playerText = function(){return new array("Par où je vais...");};
	rooms[8].playerText = function(){return new array("Vite vite viite!");};
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
		return new Array ("Je suis Saleau! Le magicien salaud! Abracadabra! Tu es maintenant moche comme un poux!");
	};
	// Floor 4
	rooms[10].playerText = function(){
		if(talkedToKid == true){
			return new Array ("Ouai, suis moi");
		}
		return new Array ("Heu, non, désolé.");
	};
	rooms[11].playerText = function(){
		if(talkedToMagician_dyslexia == true){
			if(dyslexia == true){
				return new Array ("Tu te crois malin?");
			}
			else{
				return new Array ("Tu crains! Ne t'approche plus de moi.");
			}
		}
		return new Array ("?!");
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
			return new Array ("Je ne suis pas sûr que ça dure aussi longtemps...");
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
				return new Array ("Au revoir!");
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
	$('#gauge .value').style('width',poopometer+'%')
}
/* END SETTING ROOM EFFECT ON ENTERING */




function exitRoom(){
	//unset the room image
	$('#room').removeClass('room-'+room);
	//unset the character image
	$('#npcImage').removeClass('npc-'+room);
	//unset the character text
	$('#npcText').text("");
	//unset the player texts
	$('#playerText').empty();
	//Disable navigation arrows
	$('#room .arrow').removeClass('active');
}
function loadRoom(){
	//Load the room image
	$('#room').addClass('room-'+room);
	//load the character image
	$('#npcImage').addClass('npc-'+room);
	//load the character text
	var npcText = rooms[room].npcText();
	$('#npcText').text(npcText);
	//Load the player texts
	var playerTexts = ["Answer1", "Answer2"];
	var playerTexts = rooms[room].playerText();
	for(var i=0; i<playerTexts.length; i++){
		var answer = $('<div id="answer-'+i+'" class="textBubble">' + playerTexts[i] + '</div>');
		answer.appendTo($('#playerText'));
	}
	//Enable navigation arrows
	if(rooms[room].upRoom!=null)  {$('#room #up').addClass('active'); }
	if(rooms[room].downRoom!=null) {$('#room #down').addClass('active'); }
	if(rooms[room].rightRoom!=null){$('#room #right').addClass('active'); }
	if(rooms[room].leftRoom!=null) {$('#room #left').addClass('active'); }

	console.log("Going to room "+room+" ( "+rooms[room].roomName+" )");
}
$('#room .arrow').click(function(){
	exitRoom();
	switch($(this).attr('id')){
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
	loadRoom();
})

exitRoom();
loadRoom();
adPoop();

/*exitRoom();
room = 13;
loadRoom();*/