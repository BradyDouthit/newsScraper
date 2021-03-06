$.getJSON("/articles", function (data) {
    data.forEach(Element => {
        $('#articles').prepend(
            `<div class="article${Element._id} article">
                <h2>${Element.title}</h2>
                <h4 id="summary-h4">Click a summary to view the full article</h4>
                <a id="p-link" href="${Element.link}" target="_blank"
                <p>${Element.paragraph}</p>
                </a>
                <hr>
                <input data-id="${Element._id}" class="comment-field" type="text" id="comment${Element._id}" placeholder="Wow! Very cool!">
                <button data-id="${Element._id}" id="comment-button">Add a comment</button>
                <button data-id="${Element._id}" id="view-comment-button">View Existing Comments</button>
                <button data-id="${Element._id}" id="hide-button">Hide Comments</button>
                <div class="comments-holder" id="comments-holder${Element._id}"></div
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
        .then(function (data) {
            //console.log(data)
            $.get('/articles/' + thisId, function (articles) {

                console.log(articles.comment[articles.comment.length - 1])

                let newCommentObj = articles.comment[articles.comment.length - 1]

                $('#comments-holder' + thisId).append(`
                    <div class="comments" id="comment-ID${newCommentObj._id}">
                        <button data-id="${newCommentObj._id}" class="delete-button" id="delete-ID${newCommentObj._id}">X</button>
                        <button data-id="${newCommentObj.id}" class="edit-button" id="edit-ID${newCommentObj._id}">Edit</button>
                        <div data-id="${newCommentObj._id}" id="${newCommentObj._id}" class="comment-body">
                        ${newCommentObj.body}
                        </div>
                    </div>
                `)
                location.reload();
            });
        });
});

$(document).on('click', '#view-comment-button', function (event) {
    event.preventDefault();

    let thisId = $(this).attr("data-id");

    $('#comments-holder' + thisId).empty();

    //console.log(thisId)
    $.get('/articles/' + thisId, function (articles) {
        console.log(articles)
        articles.comment.forEach(Element => {
            $('#comments-holder' + thisId).append(`
            <div class="comments" id="comment-ID${Element._id}">
                <button data-id="${Element._id}" class="delete-button" id="delete-ID${Element._id}">X</button>
                <button data-id="${Element._id}" class="edit-button" id="edit-ID${Element._id}">Edit</button>
                <div data-id="${Element._id}" id="${Element._id}" class="comment-body">
                    ${Element.body}
                </div>
            </div>
            `)
        });
    });
});

$(document).on('click', '#hide-button', function (event) {
    event.preventDefault();

    let thisId = $(this).attr("data-id");

    $('#comments-holder' + thisId).empty();
})

$(document).on('click', '.delete-button', function (event) {
    event.preventDefault();

    let thisId = $(this).attr("data-id");

    console.log(thisId);

    $.ajax({
        method: "DELETE",
        url: '/articles/' + thisId,
    })
    setTimeout(function() {
        location.reload();
    }, 500)
})

$(document).on('click', '.edit-button', function (event) {
    event.preventDefault();

    let thisId = $(this).attr("data-id");
    console.log(thisId)
    $("#" + thisId).append(`
        <input type="text" placeholder="Enter modification here" data-id="${thisId}" class="edit-comment-input" id="updated${thisId}">
        <button data-id="${thisId}" id="${thisId}" class="edit-comment-submit-button">Submit</button>
    `)
    
});

$(document).on('click', '.edit-comment-submit-button', function (event) {
    event.preventDefault();

    let thisId = $(this).attr("data-id");
    //console.log(thisId)
    let updatedComment = $('#updated' + thisId).val().trim();
    console.log(updatedComment);
    $.get('/articles/' + thisId, function (articles) {
        console.log(articles)
        });
    $.ajax({
        method: "PUT",
        url: '/articles/' + thisId,
        data: {"body": updatedComment}
    }).then(function(data) {
        console.log(data)
    })
    
})