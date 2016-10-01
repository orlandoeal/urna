 
		var gChapas = {
			'0': {img: './imgs/nulo.jpg', nome: 'Nulo'},
			'1': {img: './imgs/chapa1.png', nome: 'CARINA VITRAL'},
			'2': {img: './imgs/chapa2.png', nome: 'DÉBORA CAMILO'},
			'3': {img: './imgs/chapa3.png', nome: 'EDGAR BOTURÃO'},
			'4': {img: './imgs/chapa4.png', nome: 'PROFESSOR GENIVAL BEZERRA'},
			'5': {img: './imgs/chapa5.png', nome: 'HELIO HALLITE'},
			'6': {img: './imgs/chapa6.png', nome: 'MARCELO DEL BOSCO'},
			'7': {img: './imgs/chapa7.png', nome: 'PAULO ALEXANDRE BARBOSA'},
			'8': {img: './imgs/chapa8.png', nome: 'PAULO SCHIFF'},
			'9': {img: './imgs/nulo.jpg', nome: 'Nulo'},
			'42': {img: './imgs/branco.jpg', nome: 'Branco'}, 
		}
		var gVoto = -1; // branco
		
		function escolhe(id) {
			var aInfo = gChapas[id];
			
			$('#picture-party').attr('src', aInfo.img);
			$('#picture-party').show();			
			$('#nome').html(aInfo.nome);
			$('#chapa').html(id);
			
			gVoto = id;
		}
		
		function getDadosVotacao() {
			var votos = JSON.parse(localStorage.getItem("votos"));
			
			if(!votos) {
				localStorage.setItem("votos", {});
				votos = {};
			}
			
			return votos;
		}
		
		function confirma() {
			if(gVoto < 0) {
                alert('Escolha uma partido!');
                return;
            }
            
            avisoFim();
			
			var votos = getDadosVotacao();

			if(!votos[gVoto]) {
				votos[gVoto] = 0;
			}
			
			votos[gVoto] += 1;
			localStorage.setItem("votos", JSON.stringify(votos));
		}
		
		function corrige() {
			resetChapa();
		}
		
		function branco() {
			escolhe(42);
		}
		
		function resetChapa() {
			gVoto = 0;
			$('#nome').empty();
			$('#chapa').empty();
			$('#picture-party').hide();
		}
		
		function tocaSomFinal() {
			document.getElementById('som').play();
			
			try {
				var som = new Media('/android_asset/www/som.mp3', function onSuccess() {}, function onError(error) { $('#admin-bar').html('ERRO: ' + error.message); });
				som.play();
			} catch(e) {}
			
		}
		
		function avisoFim() {
			$('#wrapper').hide();
			$('#fim').show();
			
			tocaSomFinal();
			
			setTimeout(function() {
				resetChapa();
				$('#fim').hide();
				$('#wrapper').show();
			}, 5000);
		}
		
		function admiMostra() {
			$('#admin').show();
			adminResultados();
		}
		
		function adminReset() {
			if(confirm('Apagar todos os votos?')) {
				localStorage.setItem("votos", JSON.stringify({}));
				admiMostra();
			}
		}
		
		function adminResultados() {
			var votos = getDadosVotacao();
			var dados = '';
			
			for(var chapa in votos) {
				dados += 'Chapa ' + chapa + ' ('+gChapas[chapa].nome+'): ' + votos[chapa] + ' votos. <br/>';
			}
			$('#resultados').html(dados);
		}
		
		function adminVolta() {
			$('#admin').hide();
		}
		
		function suportaLocalStorage() {
		  try {
			return 'localStorage' in window && window['localStorage'] !== null;
		  } catch (e) {
			return false;
		  }
		}
		
		if(!suportaLocalStorage()) {
			$('#admin-bar').html('ERRO: local storage!');
		}
        
        $('#tabela td').click(function(e) {
            escolhe($(this).data('num'));
        });
