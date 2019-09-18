$.getJSON("/articles", function (data) {    
    data.forEach(Element => {
        $('#articles').append(
            `<div class="article"><h2>${Element.title}</h2><a href="${Element.link}" target="_blank">The original article</a><p>${Element.paragraph}</p></div>`
        );
    });
});