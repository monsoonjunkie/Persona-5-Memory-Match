$(document).ready(start_app);

function start_app(){
    player_portrait();
    make_card_space(duplicate_array);
    $('.card_space').on('click', '.card', card_clicked);
    current_player_turn();
    $('#music_button').on('click', toggle_music);
    $('#reset_button').on('click', reset);
    $('.start').click(startIntro);
    $('.close').click(closeHelp);
   
}

var finisher_array = [ 'videos/crow.mp4', 'videos/fox.mp4', 'videos/joker.mp4', 'videos/mona.mp4', 'videos/noir.mp4',
                        'videos/panther.mp4', 'videos/queen.mp4', 'videos/skull.mp4']

var image_card_array = [ 'images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.jpg', 'images/6.jpg',
                        'images/7.jpg', 'images/8.jpg', 'images/9.png'];
                                          
var portrait_array = ['images/joker.png', 'images/crow.png', 'images/fox.png','images/noir.png', 
                        'images/panther.png', 'images/skull.png', 'images/mona.png', 'images/queen.png'];
var portrait_crit = ['images/crow_crit', 'images/fox_crit', 'images/joker_crit', 'images/mona_crit', 'images/noir_crit',
                        'images/panther_crit', 'images/queen_crit', 'images/skull_crit']
var player1Info = null;
var player2Info = null;
var music_playing = false;               
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var number_of_buttons_clicked = 0;
var second_card_clicked_hide;
var first_card_clicked_hide;
var portrait_1 = null;
var portrait_2 = null;
var card_can_be_clicked = true;
var card = $('<div>');
var critical_win = null;
var duplicate_array = image_card_array.concat(image_card_array);
var image_counter = 0;
var current_player = portrait_1;
var player_one_match = 0;
var player_two_match = 0;
var score = 0;
var player_turn = false;


function startIntro(){
    $('.title_page').removeClass('visible').addClass('hidden');
    $('.how_to').removeClass('hidden').addClass('visible');
    var musicSession = sessionStorage.getItem('music_status');
    if (musicSession == 'true' || musicSession == null){
        toggle_music();
    }
}
function closeHelp(){
    $('.how_to').removeClass('visible').addClass('hidden');
    $('.game').removeClass('hidden').addClass('visible');
}
function reset(){
    portrait_1 = null;
    portrait_2 = null;
    player_portrait();
    image_counter = 0;
    current_player = portrait_1;
    player_one_match = 0;
    player_two_match = 0;
    score = 0;
    player_turn = false;
    match_counter = 0;
    current_player_turn();
    $('.counter_1').text(player_one_match);
    $('.counter_2').text(player_two_match);
    $('.card_space').empty();
    make_card_space(duplicate_array);
    

}

function win(portrait){
    
    if(portrait === 'images/joker.png' ){
        return {critical: 'images/joker_crit.png', finisher: 'images/joker.gif', name: 'Joker'}
    }
    if(portrait === 'images/fox.png' ){
        return {critical: 'images/fox_crit.png', finisher: 'images/fox.gif', name: 'Fox'}
    }
    if(portrait=== 'images/panther.png' ){
        return {critical: 'images/panther_crit.png', finisher: 'images/panther.gif', name: 'Panther'}
    }
    if(portrait=== 'images/crow.png' ){
        return {critical: 'images/crow_crit.png', finisher: 'images/crow.gif', name: 'Crow'}
    }
    if(portrait=== 'images/mona.png' ){
        return {critical: 'images/mona_crit.png', finisher: 'images/mona.gif', name: 'Mona'}
    }
    if(portrait=== 'images/queen.png' ){
        return {critical: 'images/queen_crit.png', finisher: 'images/queen.gif', name: 'Queen'}
    }
    if(portrait=== 'images/skull.png' ){
        return {critical: 'images/skull_crit.png', finisher: 'images/skull.gif', name: 'Skull'}
    }
    if(portrait=== 'images/noir.png' ){
        return {critical: 'images/noir_crit.png', finisher: 'images/noir.gif', name: 'Noir'}
    }
    return;
   }

function make_card_space(array){
    
    var new_array = shuffle(array);
    
    for(var i = 0; i < 3; i++ ){
        var card_row = $('<div>').addClass('card_row');
        $('.card_space').append(card_row);

        for(var j = 0; j < 6; j++){
    
            var card_boundary = $('<div>').addClass('card_boundary');
            var card_div = $('<div>').addClass('card');
            var image_elem_back = $('<img>').addClass('card_back').attr('src', 'images/tarot_back.png');
            var image_elem_front = $('<img>').addClass('card_front').attr('src', new_array[image_counter]);
            card_row.append(card_boundary);
            card_boundary.append(card_div);;
            card_div.append(image_elem_front, image_elem_back);
            image_counter++;
        }
    }
}


function toggle_music(){
    var correct_sound = document.getElementById('background_music');
    correct_sound.volume = 0.75;
    
    function music_pause(){
        correct_sound.loop = true;
        correct_sound.pause();
        $('#music_button').text('Music Paused')
    } 
    function music_play(){
        correct_sound.loop = true;
        correct_sound.play();
        $('#music_button').text('Music ON')
    }
    if(music_playing === false){
        music_play();
        music_playing = true;
    }else{
        music_pause();
        music_playing = false;
    }
    sessionStorage.setItem('music_status', music_playing);
}

function player_portrait() {
    shuffle(portrait_array);
    $('.portrait_image_1').attr('src', portrait_array[0]);
    $('.portrait_image_2').attr('src', portrait_array[1]);
    portrait_1 = $('.portrait_image_1').attr('src');
    portrait_2 = $('.portrait_image_2').attr('src');
    player1Info = win(portrait_1);
    player2Info = win(portrait_2);
    $('.finisher').attr('src', player1Info.finisher);
    $('.finisher2').attr('src', player2Info.finisher);
}
    
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function card_clicked(){
    if( match_counter === total_possible_matches){
        return;
    }
    if($(this).hasClass('card_back_flip')){
        return;
    }
    if(!card_can_be_clicked){
        return;
    }

    if(first_card_clicked === null){
      
        first_card_clicked = $(this);
        
        first_card_clicked_hide = first_card_clicked.addClass('card_back_flip');
        
        number_of_buttons_clicked++;

        return; 
    }
        second_card_clicked = $(this);
        second_card_clicked_hide = second_card_clicked.addClass('card_back_flip');
        second_card_clicked.
        number_of_buttons_clicked++;
        card_can_be_clicked = false;
        
     
    if(first_card_clicked.children('.card_front').attr('src') === second_card_clicked.children('.card_front').attr('src')){
        matchMusic();
        if(player_turn === false){
            player_one_match = player_one_match + 1;
   
            $('.counter_1').text(player_one_match);
            
        } else {
            player_two_match = player_two_match + 1;
     
            $('.counter_2').text(player_two_match);
           
        }

        match_counter++;
        
        $("#my_modal").fadeIn(500);
        first_card_clicked = null;
        second_card_clicked = null;
        card_can_be_clicked = true;
        setTimeout(function(){
            $("#my_modal").fadeOut(1000); 
        }, 1000);
      
        if( match_counter === total_possible_matches){
            
            if(player_one_match === player_two_match){
                $(".finisher").attr('src', 'images/tie.gif')
                $("#modal_ending").fadeIn(200);
                
                setTimeout(function(){
                    $("#modal_ending").fadeOut(3800);
                    $('.current_player').text('We have a Tie!'); 
                }, 1000);
                return;
            }
            
            if ( player_one_match < player_two_match){
                
                setTimeout(function(){$("#modal_ending2").fadeIn(200)},2000);
                
                setTimeout(function(){
                    $("#modal_ending2").fadeOut(4000);
                    $('.current_player').text(player2Info.name +' Wins!'); 
                }, 2000);
                return;


            }else{
                setTimeout(function(){$("#modal_ending").fadeIn(200)},2000);
                
                setTimeout(function(){
                    $("#modal_ending").fadeOut(4000);
                    $('.current_player').text(player1Info.name +' Wins!'); 
                }, 2000);
                return;

            }
        
        }
        
    } else{ setTimeout(function(){
            first_card_clicked.removeClass('card_back_flip');
            second_card_clicked.removeClass('card_back_flip');
            first_card_clicked = null;
            second_card_clicked = null;
            number_of_buttons_clicked = 0;
            card_can_be_clicked = true;}, 1250)
            
        }
    setTimeout(current_player_turn, 2000);
}
function current_player_turn(){
    var player2turn = win(portrait_1);
    var player1turn = win(portrait_2);
    if(player_turn === false){
        $('.critical').attr('src', player1turn.critical);
        $('.current_player').text(player1turn.name);
        $('.portrait_image_1').removeClass('portrait_image_turn');
        $('.portrait_image_2').addClass('portrait_image_turn');
        
        
        player_turn = true;

    } else{
        $('.critical').attr('src', player2turn.critical);
        $('.current_player').text(player2turn.name);
        $('.portrait_image_2').removeClass('portrait_image_turn');
        $('.portrait_image_1').addClass('portrait_image_turn');
        player_turn = false;
    }
}

function matchMusic(){
    var statUpMusic = document.getElementById('match_music');
    statUpMusic.play();
}


   