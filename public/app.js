$.getJSON("/articles", function (data) {
    data.forEach(Element => {
        $('#articles').prepend(
            `<div class="article">
                <h2>${Element.title}</h2>
                <h4 id="summary-h4">Click a summary to view the full article</h4>
                <a id="p-link" href="${Element.link}" target="_blank"
                <p>${Element.paragraph}</p>
                </a>
                <input data-id="${Element._id}" class="comment-field" type="text" id="comment${Element._id}" placeholder="Wow! Very cool!">
                <button data-id="${Element._id}" id="comment-button">Add a comment</button>
            </div>`
        );
    });
});

$(document).on('click', '#comment-button', function (event) {
    event.preventDefault();

    let thisId = $(this).attr("data-id");
    let comment = $('#comment' + thisId).val();

    console.log(thisId)
    $.ajax({
        method: "POST",
        url: '/articles/' + thisId,
        data: {
            comment: comment
        }
    })
    .then(function(data) {
        $.get('/articles/' + thisId, function(articles) {
            console.log(articles)
            articles.comment.forEach(Element => {
                $('#comments-div').append(`
                <div class="comments">${Element.body}</div>
                `)
            })
        })
        
    })

})