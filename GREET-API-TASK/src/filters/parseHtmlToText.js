export function parseTextToHtml(value) {
    const parser = new DOMParser().parseFromString(value, 'text/html');

    return parser.body.firstChild.textContent
}

