$('#sender').click(() => {
  $('#loader').toggleClass('invisible');
  var comment = $('#inComment');
  var rate = $('#inRate');
  $('#ulComments').append($(renderItem(comment.val(), rate.val())));

  updateHeader(rate.val());

  var sendData = {
    comment: comment.val(),
    rate: Number(rate.val()),
  };

  $.post('http://localhost:3000/comments', sendData, (data) => {}).done(() => {
    setTimeout(() => {
      $('#loader').toggleClass('invisible');
    }, 500);
  });

  comment.val('');
  rate.val(0);
});

function renderItem(comment, rate) {
  var listItem = $('<li>')
    .addClass('mb-2')
    .addClass('list-group-item')
    .addClass('d-flex')
    .addClass('justify-content-between')
    .addClass('align-items-center')
    .attr('data-cy', 'content-commentary');
  var colComment = $('<span>')
    .addClass('col-11')
    .attr('data-cy', 'comment-text')
    .text(comment);
  var colRate = $('<span>')
    .addClass('align-middle')
    .attr('data-cy', 'comment-rate')
    .text(rate);
  var icon = $('<img>')
    .addClass('mb-1')
    .addClass('ml-2')
    .attr('src', '/assets/red-star.svg');

  listItem.append(colComment);
  listItem.append(colRate);
  listItem.append(icon);

  return listItem;
}

function updateHeader(rate) {
  var count = $('#count').text();
  var average = $('#average').text();

  average = ((average * count + +rate) / ++count).toFixed(1);

  var bg = Math.round((average / 5) * 100);

  $('#progressBarBackground').width(bg);

  $('#count').text(count);
  $('#average').text(average);
}
