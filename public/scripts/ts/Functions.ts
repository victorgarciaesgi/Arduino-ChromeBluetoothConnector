
function displayPopup(element, event){
  event.stopPropagation();
  var popupName = element.attr("popup");
  var state = $("#" + popupName).attr('state');

  if (state == 'false') {
    $('.popup-box').hide().attr('state','false');
    var width = element.outerWidth();
    var height = element.outerHeight();
    var position = {
      left: Math.round(element.offset().left),
      top: Math.round(element.offset().top - $(window).scrollTop())
    }
    var popupWidth = $("#" + popupName).width();
    var outputLeft = position.left + width / 2 - popupWidth / 2;
    var outputTop = position.top + height + 10;
    var windowWidth = $(window).width();

    if((outputLeft + popupWidth) > (windowWidth - 10)){
      outputLeft = windowWidth - popupWidth - 10;
    }
    else if((outputLeft < 10) ){
      outputLeft = 10;
    }

    var left = position.left - outputLeft + (width/2);
    $("#" + popupName).find('#pin').css({left: left})

    $("#" + popupName).css({
      left: outputLeft,
      top: outputTop,
      display: 'flex'
    }).attr('state','true')
  }
  else{
    $("#" + popupName).attr('state','false').hide();
  }
}

function loremIpsum(maxSize) {
	var loremIpsumWordBank = new Array("lorem","ipsum","dolor","sit","amet,","consectetur","adipisicing","elit,","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua.","enim","ad","minim","veniam,","quis","nostrud","exercitation","ullamco","laboris","nisi","ut","aliquip","ex","ea","commodo","consequat.","duis","aute","irure","dolor","in","reprehenderit","in","voluptate","velit","esse","cillum","dolore","eu","fugiat","nulla","pariatur.","excepteur","sint","occaecat","cupidatat","non","proident,","sunt","in","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum.","sed","ut","perspiciatis,","unde","omnis","iste","natus","error","sit","voluptatem","accusantium","doloremque","laudantium,","totam","rem","aperiam","eaque","ipsa,","quae","ab","illo","inventore","veritatis","et","quasi","architecto","beatae","vitae","dicta","sunt,","explicabo.","nemo","enim","ipsam","voluptatem,","quia","voluptas","sit,","aspernatur","aut","odit","aut","fugit,","sed","quia","consequuntur","magni","dolores","eos,","qui","ratione","voluptatem","sequi","nesciunt,","neque","porro","quisquam","est,","qui","dolorem","ipsum,","quia","dolor","sit,","amet,","consectetur,","adipisci","velit,","sed","quia","non","numquam","eius","modi","tempora","incidunt,","ut","labore","et","dolore","magnam","aliquam","quaerat","voluptatem.","ut","enim","ad","minima","veniam,","quis","nostrum","exercitationem","ullam","corporis","suscipit","laboriosam,","nisi","ut","aliquid","ex","ea","commodi","consequatur?","quis","autem","vel","eum","iure","reprehenderit,","qui","in","ea","voluptate","velit","esse,","quam","nihil","molestiae","consequatur,","vel","illum,","qui","dolorem","eum","fugiat,","quo","voluptas","nulla","pariatur?","at","vero","eos","et","accusamus","et","iusto","odio","dignissimos","ducimus,","qui","blanditiis","praesentium","voluptatum","deleniti","atque","corrupti,","quos","dolores","et","quas","molestias","excepturi","sint,","obcaecati","cupiditate","non","provident,","similique","sunt","in","culpa,","qui","officia","deserunt","mollitia","animi,","id","est","laborum","et","dolorum","fuga.","harum","quidem","rerum","facilis","est","et","expedita","distinctio.","Nam","libero","tempore,","cum","soluta","nobis","est","eligendi","optio,","cumque","nihil","impedit,","quo","minus","id,","quod","maxime","placeat,","facere","possimus,","omnis","voluptas","assumenda","est,","omnis","dolor","repellendus.","temporibus","autem","quibusdam","aut","officiis","debitis","aut","rerum","necessitatibus","saepe","eveniet,","ut","et","voluptates","repudiandae","sint","molestiae","non","recusandae.","itaque","earum","rerum","hic","tenetur","a","sapiente","delectus,","aut","reiciendis","voluptatibus","maiores","alias","consequatur","aut","perferendis","doloribus","asperiores","repellat");
	var minWordCount = 2;
	var maxWordCount = maxSize;

	var randy = Math.floor(Math.random()*(maxWordCount - minWordCount)) + minWordCount;
	var ret = "";
	for(i = 0; i < randy; i++) {
		var newTxt = loremIpsumWordBank[Math.floor(Math.random() * (loremIpsumWordBank.length - 1))];
		if (ret.substring(ret.length-1,ret.length) == "." || ret.substring(ret.length-1,ret.length) == "?") {
			newTxt = newTxt.substring(0,1).toUpperCase() + newTxt.substring(1, newTxt.length);
		}
		ret += " " + newTxt;
	}
  return ret.substring(0,ret.length-1);
}


function randomNumber(min, max){
  return Math.floor(Math.random()*(max-min+1)+min)
}


function mergeBooks(array){
  var final_array = [];
  $.each(array, function(index, o) {
      var good = true;
      $.each(final_array, function(index2, f) {
        if(f.idMedia == o.idMedia){
          good = false;
        }
      });
      if (good) {
        final_array.push(o);
      }
  });
  return final_array;
}

function stateSalon(start, end){
  start = new Date(start);
  end = new Date(end);
  var today = Date.now();
  if (start > today){
    return 'notyet'
  }
  else if(start < today && end > today){
    return 'open';
  }
  else if(end < today){
    return 'ended';
  }
}
