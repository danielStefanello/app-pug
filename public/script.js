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

  $.post('http://localhost:3000/comments', sendData, (data) => {
    // console.log(data);
  }).done(() => $('#loader').toggleClass('invisible'));

  comment.val('');
  rate.val(0);
});

function renderItem(comment, rate) {
  var listItem = $('<li>')
    .addClass('list-group-item')
    .addClass('d-flex')
    .addClass('justify-content-between')
    .addClass('align-items-center');
  var colComment = $('<span>').addClass('col-11').text(comment);
  var colRate = $('<span>')
    .addClass('ml-3')
    .addClass('mr-0')
    .addClass('justify-content-between')
    .text(rate);
  var icon = $('<img>')
    .addClass('ml-1')
    .attr('src', '/bootstrap/icons/star-fill.svg');

  listItem.append(colComment);
  listItem.append(colRate);
  listItem.append(icon);

  return listItem;
}

function updateHeader(rate) {
  var count = $('#count').text();
  var average = $('#average').text();

  average = Math.round((average * count + +rate) / ++count);

  // console.log(count);
  // console.log(average);

  $('#count').text(count);
  $('#average').text(average);
}
