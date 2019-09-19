$.getJSON("/articles", function (data) {
    data.forEach(Element => {
        $('#articles').append(
            `<div class="article">
                <h2>${Element.title}</h2>
                <h4 id="summary-h4">Click a summary to view the full article</h4>
                <a id="p-link" href="${Element.link}" target="_blank"
                <p>${Element.paragraph}</p>
                </a>
                <input data-id="${Element._id}" type="text" id="comment" placeholder="Wow! Very cool!">
                <button data-id="${Element._id}" id="comment-button">ADD A COMMENT</button>
            </div>`
        );
    });
});

$(document).on('click', '#comment-button', function (event) {
    event.preventDefault();

    let thisId = $(this).attr("data-id");
    let comment = $('#comment').val();

    console.log(thisId)
    $.ajax({
        method: "POST",
        url: '/articles/' + thisId,
        data: {
            comment: comment
        }
    })
    .then(function(data) {

        console.log(data)
        
    })

})