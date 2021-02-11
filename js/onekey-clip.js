$(function() {
    // ref: https://github.com/zenorocha/codecopy/blob/master/src/scripts/main.js
    var snippets = document.querySelectorAll('figure.highlight');
    var htmlCopyButton = `
    <span id="code-lang-title"></span>
    <button class="codecopy-btn tooltipped tooltipped-sw" aria-label="Copy to clipboard">
      <span class="far fa-copy" aria-hidden="true"></span>
    clip to copy
    </button>`;

    snippets.forEach(snippet => {
        var parent = snippet.parentNode;
        var wrapper = document.createElement('div');

        parent.replaceChild(wrapper, snippet);
        wrapper.appendChild(snippet);

        wrapper.classList.add('code-highlight');
        wrapper.firstChild.insertAdjacentHTML('beforebegin', htmlCopyButton);

        var lang = (snippet.classList[1] || 'code').toUpperCase();
        wrapper.setAttribute('data-lang', lang);
        // document.getElementById('code-lang-title').html(lang);
    });


    // Add copy to clipboard functionality and user feedback
    var clipboard = new ClipboardJS('.codecopy-btn', {
        target: function(trigger) {
            var copytext = trigger.nextSibling.querySelector('.code');
            return copytext;
        }
    });

    clipboard.on('success', e => {
        e.trigger.setAttribute('aria-label', 'Copied!');
        e.clearSelection();
    });

    // Replace tooltip message when mouse leaves button
    // and prevent page refresh after click button
    var btns = document.querySelectorAll('.codecopy-btn');

    btns.forEach(btn => {
        btn.addEventListener('mouseleave', e => {
            e.target.setAttribute('aria-label', 'Copy to clipboard');
            e.target.blur();
        });

        btn.addEventListener('click', e => {
            e.preventDefault();
        });
    });
});
