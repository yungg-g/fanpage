let now = new Date();
const currentMonth = now.toLocaleString('en-US', { month: 'long' }); // 예: "March"

const renderCalender = () => {
  const viewYear = now.getFullYear();
  const viewMonth = now.getMonth();

  //document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;
  document.querySelector('.yeartxt').textContent = `- ${viewYear} -`;
  document.querySelector('.monthtxt').textContent = `${currentMonth}`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  dates.forEach((date, i) => {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1
                      ? 'this'
                      : 'other';
    dates[i] = `<div class="date"><span class=${condition}>${date}</span></div>`;
  });

  document.querySelector('.dates').innerHTML = dates.join('');

  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
};

renderCalender();


$(document).ready(function(){
    //스크롤시 header.on 클래스 on/off
    /*$(window).scroll(function(){        
        if($(this).scrollTop() > 0){
            $("#header").addClass("on");
        }else{$("#header").removeClass("on");}
    });*/

    //탑버튼 클릭시 위로 올라가기
    $("#work>div:not(.workbox), #personal>div:not(.perbox)").click(function(){
        $('#popupBox').css("display", "block");
        var $div = $('#myDiv');
        var bg = $(this).css('background-image'); // 예: url("[https://example.com/img](https://example.com/img).jpg")
        if (bg && bg !== 'none') {
            var url = bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            console.log('배경 이미지 URL:', url);
            $("#popImg").attr("src", url);
        } else {
            console.log('배경 이미지가 설정되어 있지 않음');
        }

        return false;
    });

    $("#popupBox>.x_Btn").click(function(
        ){$('#popupBox').css("display", "none");
        return false;
    });

    /*
    // 카피라이트 날짜
    const thisYear = document.querySelector('.this-year')
    thisYear.textContent = new Date().getFullYear() //20nn
     */
});
