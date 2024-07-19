$(document).ready(function() {
    $(".finish").hide();
    $.getJSON('fruits.json', function(data) {
        var fruitList = $('.cards');
        var cardElements = [];

        $.each(data, function(index, fruit) {
            for (var i = 0; i < 2; i++) {
                var cardContainer = $('<div class="card"></div>');
                var fruitFront = $('<div class="front"></div>');
                var fruitBack = $('<div class="back"></div>');
                var fruitImage = $('<img>').attr('src', fruit.image);
                var fruitName = $('<h3></h3>').text(fruit.name);

                fruitBack.append(fruitImage).append(fruitName);
                cardContainer.append(fruitFront).append(fruitBack);
                cardContainer.attr('data-name', fruit.name);

                cardElements.push(cardContainer);
            }
        });

        // Diziyi karıştır
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        
        shuffle(cardElements);
        console.log(cardElements.length);
        $.each(cardElements, function(index, card) {
            fruitList.append(card);
        });

        var click1 = false;
        var clickedCard1, clickedCard2;
        var count = 0;
        var click2 = false;
        var firstCard, secondCard;

        $(".card").click(function () { 
            if (!click1 && !click2) {
                clickedCard1 = $(this).data("name");
                console.log(clickedCard1);
                $(this).find(".front").hide();
                $(this).find(".back").show();
                $(this).addClass("disabled");
                firstCard = $(this);
                click1 = true;
            }
            else if (click1 && !click2) {
                clickedCard2 = $(this).data("name");
                console.log(clickedCard2);
                $(this).find(".front").hide();
                $(this).find(".back").show();
                $(this).addClass("disabled");
                secondCard = $(this);
                click2 = true;
        
                if (clickedCard1 == clickedCard2) {
                    count++;
                    console.log("Match found! Total matches: " + count);
                    firstCard.addClass("active");
                    secondCard.addClass("active");
                    if (count * 2 == cardElements.length) {
                        $(".finish").show();
                    }
                } else {
                    console.log("No match");
                    setTimeout(function() {
                        firstCard.find(".front").show();
                        firstCard.find(".back").hide();
                        secondCard.find(".front").show();
                        secondCard.find(".back").hide();
                        firstCard.removeClass("disabled");
                        secondCard.removeClass("disabled");
                    }, 1000);
                }
                click1 = false;
                click2 = false;
            }
        });
    });

    $(".restart").click(function (e) { 
        location.reload(); 
    });
});
