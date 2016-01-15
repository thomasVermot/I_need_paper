<?php
	header('Content-Type: application/json');
	$res = "";
	$res = array('character' => '', 'player' => '')
	if(isset($_POST['room'])){
		switch($_POST['room']){

			//Fountain
			case 'fountain' : 
				$res['character']="Toute cette eau qui coule te donne encore plus envie d'aller aux toilettes!";
				$res['player']="glups!";
				break;

			//Kid
			case 'kid' : 
				$res['character']="Hé monsieur! T'aurais pas vu mon nounours?"
				$res['player']="Non. Mais si je le trouve, je te le ramène.";
				// If we have given him his bear
				if(isset($_POST['finished']) && $_POST['finished']){
					$res['character']="Merci d'avoir retrouvé mon nounours monsieur!";
					$res['player']="De rien petit!";
				}

			//Board
			case 'board' : 
				$res['character']="Ce tableau magnifique mais un brin suggestif te rappelle à quel point un homme est bien sur son trône.";
				$res['player']="Serre les fesses! Serre les fesses! Serre les fesses!";
				break;

			//Witcher -> ugly
			case 'witcher-ugly' : 
				$res['character']="Je suis Saleau! Le magicien salaud! Abracadabra! Tu es maintenant moche comme un poux!";
				$res['player']="Salaud!";
				if(isset($_POST['finished'] && $_POST['finished'] && isset($_POST['ugly'])){
					if( $_POST['ugly']  ){
						$res['character']="J'adore faire le mal!";
						$res['player']="C'est la beauté intérieur qui compte!";
					}
					else{
						$res['character']="Rhoo! Tu as trouvé un remède contre mon sort de laideur... T'es vraiment pas drôle!";
						$res['player']="...";
					}
				}
				break;

			//BEAR
			case 'bear': 
				$res['character']="Hé! tu aurais pas vu mon enfant? Il est petit et c'est un enfant.";
				if(isset($_POST['kidSeen'] && $_POST['kidSeen']){
					$res['player']="Ouai! Suis moi!";
				}else{
					$res['player']="Heu, non, désolé.";
				}
				break;

			case 'witcher-dyslexic': 
				$res['character']="C'est encore moi! Saleau! Le magicien salaud! Et tu es maintenant dyslexique!";
				$res['player']="?!";
					if(isset($_POST['finished'] && $_POST['finished'] && isset($_POST['dyslexic'])){
						if( $_POST['dyslexic']  ){
							$res['character']="Oh comme il a l'air stupide! C'est super drole!";
							$res['player']="Tu te crois malin?";
						}
						else{
							$res['character']="Rhoo! Tu as trouvé un remède contre mon sort de dyslexie... T'es vraiment pas drôle!";
							$res['player']="";
						}
					}
				break;

			//Bodybuilder
			case 'bodybuilder': 
				$res['character']="Tu trouves pas qu'on voit pas assez mes muscles? Il me faudrait de l'huilde pour le corps.";
				$res['player']="Je vais te chercher ça!";
				if(isset($_POST['finished']) && $_POST['finished']){
					$res['character']="Je m'éblouis tellement je suis musclé!";
					$res['player']="";
				}
				break;

			//Barbarian
			case "'barbarian": 
				$res['character']="Mon manche est tout sale! Il faudrait que je l'astique. Tu aurais du sopalin?";
				if(isset($_POST['finished']) && $_POST['finished']){
					$res['character']="Merci! Mon manche est tout reluisant maintenant!";
					$res['player']="Content que ça te plaise!";
				}
				break;

			//doctor
			case 'doctor': 
				$res['character']="J'ai fini la solution constipante! Tu voudrais l'essayer?";
				$res['player']=array("yes" = "Volontier, ça ne me fera pas de mal dans cette situation!",
					"no" => "Non, merci.");
				if(isset($_POST['finished']) && $_POST['finished']){
					$res['character']="Si mes calculs sont exactes, tu ne devrais plus avoir besoin d'aller aux toilettes pendant environ 2 ans.";
					$res['player']="Je suis pas sur que ça dure aussi longtemps.";
				}
				break;

			//Pig
			case 'pig': 
				$res['character']="J'adore le boudin! J'adorerai en fabriquer. Tu connais la recette?";
				$res['player']="Je ne sais pas. Mais je ne sais pas si ça va te plaire.";
				if(isset($_POST['finished']) && $_POST['finished']){
					$res['character']="...";
					$res['player']="Heu... Bon apétit...";
				}
				break;

			//Scientist
			case 'scientist': 
				$res['character']="Ma théorie est presque finie! Plus qu'une expérience et à moi le prix nobel! Tirez mon doigt!";
				$res['player']=array("yes" = "D'accord!",
					"no" => "Heu, je préfère pas.");

				if(isset($_POST['finished']) && $_POST['finished'] && isset($_POST['accepted']) ){
						if( $_POST['accepted']  ){
							$res['character']="Merci! Vous avez fait avancer la science";
							$res['player']="J'ai trop envie d'aller aux toilettes maintenant!";
						}
						else{
							$res['character']="Encore un imbécile qui ne comprends rien à la science!";
							$res['player']="Au revoir";
						}
				}
				break;

			//Toilet Paper
			case 'toiletPaper': 
				$res['character']="Vous avez trouvé du papier toilette!";
				$res['player']="Enfin! Vite! Il faut que j'ailles aux toilettes!";
				break;


		}
	}

	$conversation = '{ ';
	$conversation.= '"character":'.$res['character'];

	$conversation.=' }';

	echo json_encode($res);